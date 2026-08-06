import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WorkerPool } from './WorkerPool';

describe('WorkerPool', () => {
  let pool: WorkerPool;
  let mockWorkers: any[] = [];

  beforeEach(() => {
    mockWorkers = [];
    // Mock global Worker
    const mockWorker = class {
      onmessage: any = null;
      onerror: any = null;
      postMessage = vi.fn();
      terminate = vi.fn();

      constructor() {
        mockWorkers.push(this);
      }

      addEventListener = vi.fn((event, handler) => {
        if (event === 'message') {
           // Simulate READY immediately
           setTimeout(() => handler({ data: { type: 'READY' } }), 0);
        }
      });
      removeEventListener = vi.fn();
    };
    vi.stubGlobal('Worker', mockWorker);

    pool = new WorkerPool('dummy-worker.js', 2);
  });

  afterEach(() => {
    pool.terminate();
    vi.unstubAllGlobals();
  });

  describe('Error handling', () => {
    it('should reject promise when worker encounters an error', async () => {
      // Mock crypto for deterministic task IDs
      const mockUUID = 'test-uuid-123';
      vi.stubGlobal('crypto', { randomUUID: () => mockUUID });

      await pool.initialize();

      const submitPromise = pool.submit('RUN_SIMULATION', { dummy: 'data' });

      // Wait for task to be picked up
      await new Promise(resolve => setTimeout(resolve, 10));

      // Verify worker has the task
      expect(mockWorkers[0].postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ id: mockUUID })
      );

      // Additional check to satisfy observing public behavior
      expect(pool.getStats().busyWorkers).toBe(1);

      // Trigger error - note that ErrorEvent might not be defined in Node
      // so we construct a mock object that duck-types it.
      mockWorkers[0].onerror({ message: 'Test error' });

      // The promise should be rejected
      await expect(submitPromise).rejects.toThrow('Worker error: Test error');
    });

    it('should not throw if onerror is called without a current task', async () => {
      await pool.initialize();

      // Trigger error when no task is running
      expect(() => {
        mockWorkers[0].onerror({ message: 'Test error' });
      }).not.toThrow();

      // Ensure it resets busy state
      expect(pool.getStats().busyWorkers).toBe(0);
    });

    it('should handle worker RESULT with type ERROR', async () => {
      const mockUUID = 'test-uuid-456';
      vi.stubGlobal('crypto', { randomUUID: () => mockUUID });

      await pool.initialize();

      const submitPromise = pool.submit('RUN_SIMULATION', { dummy: 'data' });

      // Wait for task to be picked up
      await new Promise(resolve => setTimeout(resolve, 10));

      // Trigger error message from worker
      mockWorkers[0].onmessage({
        data: {
          id: mockUUID,
          type: 'ERROR',
          error: 'Result payload error'
        }
      });

      await expect(submitPromise).rejects.toThrow('Result payload error');
    });
  });

  describe('Queue and termination handling', () => {
    it('should process subsequent tasks in queue when a worker encounters an error', async () => {
      let taskCounter = 0;
      vi.stubGlobal('crypto', {
        randomUUID: () => `test-uuid-${taskCounter++}`
      });

      await pool.initialize();

      // Submit 3 tasks (pool size is 2, so the 3rd task will be queued)
      const submitPromise1 = pool.submit('RUN_SIMULATION', { task: 1 });
      const submitPromise2 = pool.submit('RUN_SIMULATION', { task: 2 });
      const submitPromise3 = pool.submit('RUN_SIMULATION', { task: 3 });

      // Catch the rejection of task 2 so it doesn't cause an unhandled rejection on terminate
      submitPromise2.catch(() => {});

      // Wait for tasks to be dispatched
      await new Promise(resolve => setTimeout(resolve, 10));

      // 3rd task should be in queue
      expect(pool.getStats().pendingTasks).toBe(1);
      expect(pool.getStats().busyWorkers).toBe(2);

      // Trigger error on first worker to fail the first task
      mockWorkers[0].onerror({ message: 'First worker error' });

      // Verify task 1 is rejected
      await expect(submitPromise1).rejects.toThrow('Worker error: First worker error');

      // Task 3 should have been shifted from queue and dispatched to Worker 0
      expect(pool.getStats().pendingTasks).toBe(0);
      expect(mockWorkers[0].postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ data: { task: 3 } })
      );

      // Now resolve task 3
      mockWorkers[0].onmessage({
        data: {
          id: 'test-uuid-2',
          type: 'RESULT',
          data: 'Success 3'
        }
      });

      await expect(submitPromise3).resolves.toBe('Success 3');
    });

    it('should reject all pending promises in pendingTaskMap when terminate is called', async () => {
      vi.stubGlobal('crypto', { randomUUID: () => 'test-uuid-term' });

      await pool.initialize();

      const submitPromise = pool.submit('RUN_SIMULATION', { dummy: 'data' });

      // Wait for task to be picked up
      await new Promise(resolve => setTimeout(resolve, 10));

      // Terminate the pool
      pool.terminate();

      // The promise should be rejected because the worker pool was terminated
      await expect(submitPromise).rejects.toThrow('Worker pool was terminated');
    });
  });
});
