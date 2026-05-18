/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SemanticSearchInput } from '../../components/SemanticSearchInput';
import type { SearchResult } from '@/services/semanticSearch';

// Mock services/semanticSearch directly
vi.mock('@/services/semanticSearch', () => {
  return {
    semanticSearch: vi.fn(),
    preloadEmbeddingModel: vi.fn(),
  };
});

import { semanticSearch } from '@/services/semanticSearch';

describe('SemanticSearchInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockOnResults = vi.fn();
  const mockOnSearchStart = vi.fn();
  const mockOnSearchEnd = vi.fn();

  const defaultProps = {
    onResults: mockOnResults,
    onSearchStart: mockOnSearchStart,
    onSearchEnd: mockOnSearchEnd,
  };

  it('renders correctly with default placeholder', () => {
    render(<SemanticSearchInput {...defaultProps} />);
    // The placeholder value might be overridden by the parent component using it in the application,
    // but the default value in SemanticSearchInput is 'Search models (e.g., "calcium signaling" or "MAPK cascade")...'
    // In our test, since we don't pass `placeholder` as a prop, it should use the default.
    expect(screen.getByPlaceholderText('Search models (e.g., "calcium signaling" or "MAPK cascade")...')).toBeInTheDocument();

    // The component might show "Loading AI..." initially due to Firefox check/preload logic
    const aiSearchBadge = screen.queryByText('AI Search') || screen.queryByText('Loading AI...');
    expect(aiSearchBadge).toBeInTheDocument();
  });

  it('renders correctly with provided placeholder', () => {
    render(<SemanticSearchInput {...defaultProps} placeholder="Describe a model (e.g. 'MAPK cascade with scaffold')..." />);
    expect(screen.getByPlaceholderText("Describe a model (e.g. 'MAPK cascade with scaffold')...")).toBeInTheDocument();
  });

  it('handles typing and debounced search', async () => {
    const mockResults: SearchResult[] = [
      { id: '1', filename: 'model.bngl', path: '/models/model.bngl', category: 'test', preview: 'preview', score: 0.9 }
    ];
    (semanticSearch as any).mockResolvedValue(mockResults);

    render(<SemanticSearchInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'MAPK' } });

    await waitFor(() => {
      expect(mockOnSearchStart).toHaveBeenCalled();
      expect(semanticSearch).toHaveBeenCalledWith('MAPK', 20);
      expect(mockOnResults).toHaveBeenCalledWith(mockResults);
      expect(mockOnSearchEnd).toHaveBeenCalled();
    });
  });

  it('shows error message if semanticSearch fails', async () => {
    // Suppress console.error output during the test run
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    (semanticSearch as any).mockRejectedValueOnce(new Error('Search failed'));

    render(<SemanticSearchInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'error' } });

    await waitFor(() => {
      expect(screen.getByText('Search unavailable. Try a keyword search instead.')).toBeInTheDocument();
      expect(mockOnResults).toHaveBeenCalledWith([]);
    });

    consoleSpy.mockRestore();
  });

  it('clears input and results when clear button is clicked', async () => {
    const mockResults: SearchResult[] = [
      { id: '1', filename: 'model.bngl', path: '/models/model.bngl', category: 'test', preview: 'preview', score: 0.9 }
    ];
    (semanticSearch as any).mockResolvedValue(mockResults);

    render(<SemanticSearchInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'MAPK' } });

    // Wait for debounce so we don't bleed into next test
    await waitFor(() => {
        expect(mockOnSearchStart).toHaveBeenCalled();
    });

    const clearButton = screen.getByTitle('Clear search');
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
    expect(mockOnResults).toHaveBeenCalledWith([]);
  });

  it('submits immediately on Enter key press', async () => {
    const mockResults: SearchResult[] = [
      { id: '1', filename: 'model.bngl', path: '/models/model.bngl', category: 'test', preview: 'preview', score: 0.9 }
    ];
    (semanticSearch as any).mockResolvedValue(mockResults);

    render(<SemanticSearchInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'MAPK' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(semanticSearch).toHaveBeenCalledWith('MAPK', 20);
    await waitFor(() => {
      expect(mockOnResults).toHaveBeenCalledWith(mockResults);
    });
  });
});
