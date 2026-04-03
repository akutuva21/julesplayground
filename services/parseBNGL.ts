/**
 * Default BNGL parser entrypoint.
 *
 * Uses the ANTLR-based parser (BNG2.pl parity).
 */

import type { BNGLModel } from '../types.ts';
import { parseBNGLWithANTLR } from '@bngplayground/engine';

interface NetworkGenerationOptions {
  maxStoich?: Record<string, number>;
  maxAgg?: number;
  maxIter?: number;
  overwrite?: boolean;
}

// (Removed unused vulnerable regex)

const cleanLine = (line: string) => {
  if (typeof line !== 'string') return '';
  return line.replace(/#.*$/, '').trim();
};

const extractInlineComment = (line: string) => {
  if (typeof line !== 'string') return undefined;
  const m = line.match(/#(.*)$/);
  if (!m) return undefined;
  return m[1].trim();
};

const parseEntityList = (segment: string) => {
  const parts: string[] = [];
  let current = '';
  let depth = 0;
  for (let i = 0; i < segment.length; i++) {
    const ch = segment[i];
    if (ch === '(') {
      depth++;
      if (depth > 100) throw new Error('Parsing error: Maximum parenthesis depth exceeded');
    }
    else if (ch === ')') depth--;
    else if (ch === '+' && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
};

const splitProductsAndRates = (segment: string, parameters: Record<string, number>) => {
  // Improved splitting logic:
  // Tokenize respecting parentheses, then identify product vs rate tokens.
  // Products are molecule patterns (contain parentheses with component states, @, etc.)
  // Rates are numbers, parameters, or mathematical expressions.
  // 
  // Key insight: In BNGL, "+" between species is a separator (e.g., A() + B()),
  // but within rate expressions, operators like +, -, *, / are math operators.
  // We need to be careful not to merge molecule patterns into math expressions.

  const trimmed = segment.trim();
  if (!trimmed) {
    return { productChunk: '', rateChunk: '' };
  }

  // Helper: Check if a string looks like a molecule pattern
  const looksLikeMolecule = (s: string): boolean => {
    const cleaned = s.trim();
    if (!cleaned) return false;
    // Has parentheses with component syntax (commas, tildes, !, etc. inside)
    if (/\([^)]*[~,!][^)]*\)/.test(cleaned)) return true;
    // Has compartment
    if (/@/.test(cleaned)) return true;
    // Simple molecule with empty parens like A()
    if (/^[A-Za-z_][A-Za-z0-9_]*\(\s*\)$/.test(cleaned)) return true;
    // Molecule with dot notation (complex): A().B()
    if (/\)\s*\.\s*[A-Za-z_]/.test(cleaned)) return true;
    return false;
  };

  // First, tokenize respecting parentheses - group parenthesized expressions together
  const tokens: string[] = [];
  let current = '';
  let depth = 0;

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];

    if (ch === '(') {
      depth++;
      current += ch;
    } else if (ch === ')') {
      depth--;
      current += ch;
    } else if (/\s/.test(ch) && depth === 0) {
      // At top level, whitespace is a separator
      if (current.trim()) {
        tokens.push(current.trim());
        current = '';
      }
    } else {
      current += ch;
    }
  }
  if (current.trim()) {
    tokens.push(current.trim());
  }

  if (tokens.length === 0) {
    return { productChunk: '', rateChunk: '' };
  }

  // Now merge tokens that look like they're part of a math expression
  // But DON'T merge if either side looks like a molecule!
  // An expression may have been split like ["expr1", "*", "expr2"] or ["expr", "/", "expr"]
  const mergedTokens: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const isOperator = ['+', '-', '*', '/'].includes(token.trim());

    if (isOperator && mergedTokens.length > 0 && i + 1 < tokens.length) {
      const prev = mergedTokens[mergedTokens.length - 1];
      const next = tokens[i + 1];
      
      // Only merge if NEITHER prev nor next looks like a molecule
      // + between molecules is a separator, not math
      const prevIsMolecule = looksLikeMolecule(prev);
      const nextIsMolecule = looksLikeMolecule(next);
      
      if (!prevIsMolecule && !nextIsMolecule) {
        // Both look like rate expressions, merge them
        mergedTokens.pop();
        mergedTokens.push(`${prev} ${token} ${next}`);
        i++; // Skip next token as we've consumed it
      } else {
        // Don't merge - this is a species separator
        mergedTokens.push(token);
      }
    } else {
      mergedTokens.push(token);
    }
  }

  // Now identify the boundary between products and rates
  // Scan from the end to find where rates begin
  // Products are molecules (usually have parentheses with component syntax, or are "0")
  // Rates are numbers, params, or expressions

  let splitIndex = mergedTokens.length;

  for (let i = mergedTokens.length - 1; i >= 0; i--) {
    const token = mergedTokens[i];
    const cleaned = token.replace(/,$/, '').trim();

    // Skip isolated "+" tokens - they're species separators
    if (cleaned === '+') {
      continue;
    }

    // Check what this token looks like
    const isNumber = !Number.isNaN(parseFloat(cleaned));
    const isParam = Object.prototype.hasOwnProperty.call(parameters, cleaned);
    const isKeyword = /^(exclude_reactants|include_reactants|DeleteMolecules|MoveMolecules)/.test(cleaned);
    const isMolecule = looksLikeMolecule(cleaned);
    
    // Check for comma-separated rate pair like "kp2,km2" (bidirectional rule rates)
    const isCommaSeparatedRates = /^[A-Za-z_][A-Za-z0-9_]*,[A-Za-z_][A-Za-z0-9_]*$/.test(cleaned) ||
      /^[0-9.eE+-]+,[0-9.eE+-]+$/.test(cleaned);  // Also handle numeric pairs
    
    // Math expressions contain operators outside of parentheses (*, /, -, and + in math context)
    const hasMathOutsideParens = (() => {
      let d = 0;
      for (const ch of cleaned) {
        if (ch === '(') d++;
        else if (ch === ')') d--;
        else if (d === 0 && ['*', '/'].includes(ch)) return true;
      }
      return false;
    })();

    // Decide if this is part of rate or product
    if (isMolecule && !isKeyword) {
      // Found a product, stop scanning
      break;
    }

    if (isNumber || isParam || isKeyword || hasMathOutsideParens || isCommaSeparatedRates) {
      splitIndex = i;
    } else if (cleaned.match(/^[A-Za-z_][A-Za-z0-9_]*$/) && !isParam) {
      // Unknown identifier - could be an observable or undefined param
      // Treat as part of rate if it follows rate-like tokens
      splitIndex = i;
    } else {
      // Unknown token type - likely a product
      break;
    }
  }

  // Special case: if splitIndex is 0, everything looks like rate tokens.
  // But if the first token is "0" and there are other tokens, "0" is likely the product (degradation).
  if (splitIndex === 0 && mergedTokens.length > 1 && mergedTokens[0] === '0') {
    splitIndex = 1;
  }

  const productTokens = mergedTokens.slice(0, splitIndex);
  const rateChunkTokens = mergedTokens.slice(splitIndex);

  return {
    productChunk: productTokens.join(' '),
    rateChunk: rateChunkTokens.join(' ')
  };
};

export interface ParseBNGLOptions {
  checkCancelled?: () => void;
  debug?: boolean;
  modelName?: string;
}

export function parseBNGL(code: string, options: ParseBNGLOptions = {}): BNGLModel {
  if (options.checkCancelled) {
    options.checkCancelled();
  }

  const result = parseBNGLWithANTLR(code);
  if (!result.model) {
    const errorMsg = result.errors.map(e => `Line ${e.line}:${e.column}: ${e.message}`).join('\n');
    throw new Error(`BNGL parse error:\n${errorMsg}`);
  }

  if (!result.success && options.debug) {
    const errorMsg = result.errors.map(e => `Line ${e.line}:${e.column}: ${e.message}`).join('\n');
    console.warn(`[parseBNGL] ANTLR parse reported errors (best-effort model returned):\n${errorMsg}`);
  }

  if (!result.model.name && options.modelName) {
    result.model.name = options.modelName;
  }

  return result.model;
}
