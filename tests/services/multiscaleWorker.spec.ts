import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { MultiscaleWorkerResponse } from '../../services/multiscaleWorker';

describe('multiscaleWorker message handling resilience', () => {
  let originalPostMessage: typeof globalThis.postMessage;
  let postedMessages: MultiscaleWorkerResponse[];

  beforeEach(() => {
    postedMessages = [];
    if (typeof (globalThis as any).self === 'undefined') {
      (globalThis as any).self = globalThis;
    }
    originalPostMessage = globalThis.postMessage;
    globalThis.postMessage = (msg: any) => {
      postedMessages.push(msg);
    };
  });

  afterEach(() => {
    globalThis.postMessage = originalPostMessage;
    vi.restoreAllMocks();
  });

  it('posts an error response when an unrecognized message type is received in multiscaleWorker', async () => {
    // Import multiscaleWorker to register onmessage listener
    await import('../../services/multiscaleWorker');

    // Simulate sending an unknown message type
    const event = new MessageEvent('message', {
      data: { type: 'unknown_type_test' },
    });

    if (globalThis.onmessage) {
      globalThis.onmessage(event as MessageEvent);
    }

    expect(postedMessages.length).toBeGreaterThan(0);
    const lastMsg = postedMessages[postedMessages.length - 1];
    expect(lastMsg.type).toBe('error');
    expect(lastMsg.message).toContain('MultiscaleWorker received unknown message type: unknown_type_test');
  });

  it('posts an error response when a null or non-object message is received', async () => {
    await import('../../services/multiscaleWorker');

    const event = new MessageEvent('message', {
      data: null,
    });

    if (globalThis.onmessage) {
      globalThis.onmessage(event as MessageEvent);
    }

    expect(postedMessages.length).toBeGreaterThan(0);
    const lastMsg = postedMessages[postedMessages.length - 1];
    expect(lastMsg.type).toBe('error');
    expect(lastMsg.message).toContain('MultiscaleWorker received null, undefined, or non-object message');
  });
});
