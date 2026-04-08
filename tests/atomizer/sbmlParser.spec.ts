import { describe, it, expect } from 'vitest';
import { extractUniProtIds } from '../../src/lib/atomizer/parser/sbmlParser';

describe('extractUniProtIds', () => {
  it('extracts a valid UniProt ID with a colon separator', () => {
    const resources = ['https://identifiers.org/uniprot:P12345'];
    expect(extractUniProtIds(resources)).toEqual(['P12345']);
  });

  it('extracts a valid UniProt ID with a slash separator', () => {
    const resources = ['https://identifiers.org/uniprot/Q8N4C6'];
    expect(extractUniProtIds(resources)).toEqual(['Q8N4C6']);
  });

  it('handles case-insensitivity in the uniprot prefix', () => {
    const resources = [
      'https://identifiers.org/UNIPROT:P11111',
      'https://identifiers.org/UniProt/P22222'
    ];
    expect(extractUniProtIds(resources)).toEqual(['P11111', 'P22222']);
  });

  it('extracts multiple IDs from a list of resources', () => {
    const resources = [
      'https://identifiers.org/uniprot:P12345',
      'https://identifiers.org/uniprot/Q8N4C6',
      'https://identifiers.org/uniprot:O95153'
    ];
    expect(extractUniProtIds(resources)).toEqual(['P12345', 'Q8N4C6', 'O95153']);
  });

  it('ignores resources that do not match the expected pattern', () => {
    const resources = [
      'https://identifiers.org/uniprot:P12345',
      'https://identifiers.org/go:0008150',
      'https://identifiers.org/pubmed:123456',
      'invalid-resource-string'
    ];
    expect(extractUniProtIds(resources)).toEqual(['P12345']);
  });

  it('returns an empty array when given an empty list of resources', () => {
    expect(extractUniProtIds([])).toEqual([]);
  });

  it('returns an empty array when no UniProt IDs are found', () => {
    const resources = [
      'https://identifiers.org/go:0008150',
      'https://identifiers.org/pubmed:123456'
    ];
    expect(extractUniProtIds(resources)).toEqual([]);
  });
});
