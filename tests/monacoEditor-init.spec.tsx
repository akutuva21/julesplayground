// @vitest-environment jsdom

import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { MonacoEditor } from '../components/MonacoEditor';

function installFakeMonaco() {
  const model = {
    _value: '',
    getValue() {
      return this._value;
    },
    setValue(v: string) {
      this._value = v;
    },
  };

  const editorInstance = {
    getValue: () => model.getValue(),
    getModel: () => model,
    onDidChangeModelContent: () => ({ dispose: () => {} }),
    dispose: () => {},
    revealLineInCenter: () => {},
    setSelection: () => {},
  };

  const fakeMonaco: any = {
    MarkerSeverity: { Error: 8, Warning: 4, Info: 2 },
    editor: {
      defineTheme: () => {},
      setTheme: () => {},
      setModelLanguage: () => {},
      setModelMarkers: () => {},
      create: (_el: any, opts: any) => {
        // Record the value used to initialize the editor.
        (window as any).__monacoCreateValue = opts?.value;
        model.setValue(opts?.value ?? '');
        return editorInstance;
      },
    },
    languages: {
      getLanguages: () => [{ id: 'bngl' }],
      register: () => {},
      setMonarchTokensProvider: () => {},
      CompletionItemKind: { Snippet: 27 },
      CompletionItemInsertTextRule: { InsertAsSnippet: 4 },
      registerCompletionItemProvider: (() => {}) as any,
    },
  };

  // Allow the component to store a marker on the function.
  fakeMonaco.languages.registerCompletionItemProvider.__bngl_registered = false;

  (window as any).monaco = fakeMonaco;
}

describe('MonacoEditor init', () => {
  beforeEach(() => {
    installFakeMonaco();
    (window as any).__monacoCreateValue = undefined;
  });

  afterEach(() => {
    delete (window as any).monaco;
    delete (window as any).__monacoCreateValue;
  });

  it('uses the latest value when the editor is created (shared-link race regression)', async () => {
    const onChange = vi.fn();

    const { rerender } = render(
      <MonacoEditor value="FIRST" onChange={onChange} language="bngl" theme="light" />
    );

    // Simulate the shared-link load updating `value` before Monaco finishes initializing.
    rerender(<MonacoEditor value="SECOND" onChange={onChange} language="bngl" theme="light" />);

    // Flush microtasks so the `loadMonaco().then(...)` chain runs.
    await Promise.resolve();
    await Promise.resolve();

    expect((window as any).__monacoCreateValue).toBe('SECOND');
  });
});
