import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { vi, describe, it, expect } from 'vitest';

// Mock ExampleGalleryModal and SemanticSearchInput to avoid pulling in heavy services during unit tests
let exampleOnSelect: any = null;
vi.mock('../../components/ExampleGalleryModal', () => ({
  ExampleGalleryModal: (props: any) => {
    exampleOnSelect = props.onSelect;
    return React.createElement('div', { 'data-testid': 'example-gallery' });
  }
}));
vi.mock('../../components/SemanticSearchInput', () => ({
  SemanticSearchInput: (props: any) => {
    return React.createElement('div', { 'data-testid': 'semantic-search' });
  }
}));


import { EditorPanel } from '../../components/EditorPanel';

const baseProps = {
  code: 'begin model\nend model',
  onCodeChange: vi.fn(),
  onParse: vi.fn(),
  onSimulate: vi.fn(),
  isSimulating: false,
  modelExists: true,
  model: null,
  validationWarnings: [],
  editorMarkers: [],
  loadedModelName: null,
  onModelNameChange: vi.fn(),
  onModelIdChange: vi.fn(),
};

describe('EditorPanel', () => {
  it('calls onExportSBML when Export SBML button clicked', () => {
    const onExportSBML = vi.fn();
    render(<EditorPanel {...baseProps} onExportSBML={onExportSBML} onExportBNGL={() => {}} /> as any);

    const exportBtn = screen.getByRole('button', { name: /^Export$/i });
    expect(exportBtn).toBeInTheDocument();
    fireEvent.click(exportBtn);
    const exportSbmlItem = screen.getByRole('menuitem', { name: /Export SBML/i });
    fireEvent.click(exportSbmlItem);
    expect(onExportSBML).toHaveBeenCalled();
  });

  it('shows Load dropdown options', () => {
    render(<EditorPanel {...baseProps} /> as any);
    const loadBtn = screen.getAllByText(/Load/)[0];
    expect(loadBtn).toBeInTheDocument();
  });

  it('automatically parses when a model file is loaded', async () => {
    const onParse = vi.fn();
    render(<EditorPanel {...baseProps} onParse={onParse} /> as any);
    const input = screen.getByTestId('editor-load-input') as HTMLInputElement;

    // mock FileReader to fire onload immediately
    class MockReader {
      onload: any = null;
      readAsText(_file: any) {
        if (this.onload) this.onload({ target: { result: 'dummy' } });
      }
    }
    vi.stubGlobal('FileReader', MockReader as any);

    const file = new File(['foo'], 'test.bngl', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    await Promise.resolve(); // allow microtask
    expect(onParse).toHaveBeenCalled();
  });

  it('automatically parses when an example is selected', () => {
    const onParse = vi.fn();
    render(<EditorPanel {...baseProps} onParse={onParse} /> as any);
    // invoke the captured onSelect callback as if the gallery passed code
    exampleOnSelect?.('example code', 'ExampleName', 'ExampleID');
    expect(onParse).toHaveBeenCalled();
  });
});
