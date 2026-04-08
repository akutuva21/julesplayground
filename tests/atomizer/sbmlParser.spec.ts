import { describe, it, expect } from 'vitest';
import { extractGOTerms } from '../../src/lib/atomizer/parser/sbmlParser';

describe('extractGOTerms', () => {
  it('extracts a standard GO term from identifiers.org URL', () => {
    const resources = ['http://identifiers.org/go/GO:0005623'];
    expect(extractGOTerms(resources)).toEqual(['GO:0005623']);
  });

  it('extracts multiple GO terms', () => {
    const resources = [
      'http://identifiers.org/go/GO:0005623',
      'http://identifiers.org/go/GO:0005886'
    ];
    expect(extractGOTerms(resources)).toEqual(['GO:0005623', 'GO:0005886']);
  });

  it('extracts GO terms with URN colon separators', () => {
    const resources = ['urn:miriam:go:GO:0005886'];
    expect(extractGOTerms(resources)).toEqual(['GO:0005886']);
  });

  it('handles case insensitivity', () => {
    const resources = [
      'http://identifiers.org/go/go:0005623',
      'urn:miriam:go:GO/0005886'
    ];
    expect(extractGOTerms(resources)).toEqual(['GO:0005623', 'GO:0005886']);
  });

  it('returns empty array for empty input', () => {
    const resources: string[] = [];
    expect(extractGOTerms(resources)).toEqual([]);
  });

  it('returns empty array when no GO terms match', () => {
    const resources = [
      'http://identifiers.org/uniprot/P12345',
      'https://example.com/not-a-go-term',
      'random string'
    ];
    expect(extractGOTerms(resources)).toEqual([]);
  });

  it('extracts only matching GO terms from a mixed list', () => {
    const resources = [
      'http://identifiers.org/go/GO:0005623',
      'http://identifiers.org/uniprot/P12345',
      'urn:miriam:go:GO:0005886',
      'invalid-resource'
    ];
    expect(extractGOTerms(resources)).toEqual(['GO:0005623', 'GO:0005886']);
  });
});
