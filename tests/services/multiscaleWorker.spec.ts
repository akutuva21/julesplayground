import { describe, it, expect, vi } from 'vitest';
import type { MultiscaleWorkerResponse } from '../../services/multiscaleWorker';

describe('multiscaleWorker message handling resilience', () => {
  it('should send an explicit error response when receiving an unknown message type', async () => {
    const postMessageCallback: ((msg: MultiscaleWorkerResponse) => void) | null = null;

    const mockSelf = {
      location: { origin: 'http://localhost' },
      postMessage: vi.fn((msg: MultiscaleWorkerResponse) => {
        if (postMessageCallback) postMessageCallback(msg);
      }),
      addEventListener: vi.fn(),
      onmessage: null as any,
    };

    // Attach mock globals
    vi.stubGlobal('self', mockSelf);

    // Dynamically re-import or evaluate worker message logic
    // Since multiscaleWorker.ts assigns self.onmessage at top-level import:
    await import('../../services/multiscaleWorker');

    expect(mockSelf.onmessage).toBeTypeOf('function');

    // Simulate an unknown message type request
    const unknownMessage = { type: 'UNKNOWN_ACTION', payload: {} };
    mockSelf.onmessage({
      origin: 'http://localhost',
      data: unknownMessage,
    } as MessageEvent);

    expect(mockSelf.postMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'MultiscaleWorker received unknown message type: UNKNOWN_ACTION',
    });

    vi.unstubAllGlobals();
  });
});
