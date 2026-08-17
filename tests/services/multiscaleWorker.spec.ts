import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { MultiscaleWorkerRequest, MultiscaleWorkerResponse } from '../../services/multiscaleWorker';

describe('multiscaleWorker message protocol', () => {
  let mockSelf: {
    onmessage: ((event: MessageEvent<MultiscaleWorkerRequest>) => void) | null;
    postMessage: ReturnType<typeof vi.fn>;
    location: { origin: string };
    addEventListener: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    vi.resetModules();
    mockSelf = {
      onmessage: null,
      postMessage: vi.fn(),
      location: { origin: 'http://localhost' },
      addEventListener: vi.fn(),
    };
    vi.stubGlobal('self', mockSelf);

    // Import worker module to bind self listeners
    await import('../../services/multiscaleWorker');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('binds worker event listeners on module load', () => {
    expect(mockSelf.onmessage).toBeDefined();
    expect(mockSelf.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
    expect(mockSelf.addEventListener).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
    expect(mockSelf.addEventListener).toHaveBeenCalledWith('messageerror', expect.any(Function));
  });

  it('rejects null or non-object message payloads', () => {
    if (!mockSelf.onmessage) throw new Error('self.onmessage is not registered');

    mockSelf.onmessage({ data: null, origin: 'http://localhost' } as any);

    expect(mockSelf.postMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'MultiscaleWorker received null, undefined, or non-object message',
    });
  });

  it('rejects messages coming from unexpected origins', () => {
    if (!mockSelf.onmessage) throw new Error('self.onmessage is not registered');

    mockSelf.onmessage({
      data: { type: 'run', config: {} },
      origin: 'http://malicious.com',
    } as any);

    expect(mockSelf.postMessage).not.toHaveBeenCalled();
  });

  it('emits initialized response on run requests', () => {
    if (!mockSelf.onmessage) throw new Error('self.onmessage is not registered');

    mockSelf.onmessage({
      data: { type: 'run', config: { time: { end: 0, dtIntra: 0.1, dtExtra: 0.1, dtDecision: 0.1, outputs: 1 } } as any },
      origin: 'http://localhost',
    } as any);

    expect(mockSelf.postMessage).toHaveBeenCalledWith({ type: 'initialized' });
  });

  it('emits error response for unrecognized message types', () => {
    if (!mockSelf.onmessage) throw new Error('self.onmessage is not registered');

    mockSelf.onmessage({
      data: { type: 'unknown_cmd' } as any,
      origin: 'http://localhost',
    } as any);

    expect(mockSelf.postMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'MultiscaleWorker received unrecognized message type: unknown_cmd',
    });
  });
});
