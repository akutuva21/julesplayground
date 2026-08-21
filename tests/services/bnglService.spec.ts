import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { WorkerRequest } from '../../types';

class MockWorker {
  static messages: WorkerRequest[] = [];
  static instances: MockWorker[] = [];
  private messageListeners: Array<(event: MessageEvent) => void> = [];
  private errorListeners: Array<(event: ErrorEvent) => void> = [];
  public terminated = false;

  constructor() {
    MockWorker.instances.push(this);
  }

  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (type === 'message') this.messageListeners.push(listener);
    if (type === 'error') this.errorListeners.push(listener as unknown as (event: ErrorEvent) => void);
  }

  removeEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (type === 'message') {
      this.messageListeners = this.messageListeners.filter((l) => l !== listener);
    }
    if (type === 'error') {
      this.errorListeners = this.errorListeners.filter((l) => l !== (listener as unknown as (event: ErrorEvent) => void));
    }
  }

  postMessage(request: WorkerRequest) {
    if (this.terminated) {
      throw new Error('Worker is terminated');
    }
    MockWorker.messages.push(request);
  }

  triggerMessage(data: any) {
    for (const listener of this.messageListeners) {
      listener({ data } as MessageEvent);
    }
  }

  triggerError(error: any) {
    for (const listener of this.errorListeners) {
      listener(error);
    }
  }

  terminate() {
    this.terminated = true;
  }
}

describe('bnglService - error handling, timeout, and termination', () => {
  beforeEach(() => {
    vi.resetModules();
    MockWorker.messages = [];
    MockWorker.instances = [];
    vi.stubGlobal('Worker', MockWorker);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('rejects pending requests when worker responds with worker_internal_error for a request ID', async () => {
    const { bnglService } = await import('../../services/bnglService');
    const worker = MockWorker.instances[0];

    const parsePromise = bnglService.parse('begin model\nend model');
    const request = MockWorker.messages.find((m) => m.type === 'parse')!;
    expect(request).toBeDefined();

    worker.triggerMessage({
      id: request.id,
      type: 'worker_internal_error',
      payload: { message: 'Unknown worker message type: invalid' },
    });

    await expect(parsePromise).rejects.toThrow('Unknown worker message type: invalid');
  });

  it('handles postMessage synchronous failure gracefully', async () => {
    const { bnglService } = await import('../../services/bnglService');
    const worker = MockWorker.instances[0];

    vi.spyOn(worker, 'postMessage').mockImplementation(() => {
      throw new Error('DataCloneError: Failed to execute postMessage');
    });

    await expect(bnglService.parse('begin model\nend model')).rejects.toThrow('DataCloneError');
  });

  it('times out and sends cancel message when worker does not respond within timeoutMs', async () => {
    const { bnglService } = await import('../../services/bnglService');

    const parsePromise = bnglService.parse('begin model\nend model', { timeoutMs: 50 });

    await expect(parsePromise).rejects.toThrow('timed out after 50 ms');
    expect(MockWorker.messages.some((m) => m.type === 'cancel')).toBe(true);
  });

  it('rejects all pending requests when service is terminated', async () => {
    const { bnglService } = await import('../../services/bnglService');

    const parsePromise = bnglService.parse('begin model\nend model');

    bnglService.terminate('Custom termination reason');

    await expect(parsePromise).rejects.toThrow('Custom termination reason');
  });
});
