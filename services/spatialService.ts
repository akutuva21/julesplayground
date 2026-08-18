/**
 * spatialService.ts — App-level service for managing spatial simulation.
 *
 * Wraps the SpatialSimulation web worker. Can be used by React components.
 * Pattern: services/bnglService.ts
 */

import type { SpatialSimulationConfig, SpatialSnapshot, SpatialSimulationResult, CompartmentGeometry } from '@bngplayground/engine';
import type { SpatialWorkerRequest, SpatialWorkerResponse } from './spatialWorker';

export type SpatialSimulationState = 'idle' | 'initializing' | 'running' | 'complete' | 'error';

export interface SpatialServiceCallbacks {
  onStateChange?: (state: SpatialSimulationState) => void;
  onInitialized?: (data: { geometries: CompartmentGeometry[]; speciesNames: Record<number, string> }) => void;
  onSnapshot?: (snapshot: SpatialSnapshot) => void;
  onProgress?: (step: number, totalSteps: number, time: number) => void;
  onComplete?: (result: SpatialSimulationResult) => void;
  onError?: (message: string) => void;
}

class SpatialService {
  private worker: Worker | null = null;
  private callbacks: SpatialServiceCallbacks = {};
  private state: SpatialSimulationState = 'idle';

  /**
   * Initialize the spatial simulation with a BNGL model.
   */
  async init(
    bnglText: string,
    config: Partial<SpatialSimulationConfig>,
    callbacks: SpatialServiceCallbacks
  ): Promise<void> {
    this.callbacks = callbacks;

    // Terminate any existing worker first
    this.terminate();
    
    // Set state AFTER terminate (to override terminate's 'idle' state)
    this.setState('initializing');

    try {
      // Create new worker
      this.worker = new Worker(
        new URL('./spatialWorker.ts', import.meta.url),
        { type: 'module' }
      );

      this.worker.onmessage = (event: MessageEvent<SpatialWorkerResponse>) => {
        const data = event.data ?? { type: 'error', message: 'Empty or undefined worker response' };
        this.handleWorkerMessage(data);
      };

      this.worker.onerror = (error) => {
        this.setState('error');
        this.callbacks.onError?.(error.message);
      };

      this.worker.onmessageerror = (event) => {
        console.error('[SpatialService] Worker failed to deserialize message:', event.data);
        this.setState('error');
        this.callbacks.onError?.('SpatialService worker failed to deserialize message');
      };

      // Send init message
      const request: SpatialWorkerRequest = {
        type: 'init',
        bnglText,
        config,
      };
      this.worker.postMessage(request);
    } catch (err: any) {
      console.error('[SpatialService] Failed to initialize spatial simulation worker:', err);
      this.terminate();
      this.setState('error');
      const errMsg = err?.message ?? 'Failed to initialize spatial worker';
      this.callbacks.onError?.(errMsg);
    }
  }

  /**
   * Start the simulation.
   */
  run(): void {
    if (!this.worker) {
      console.warn('SpatialService: No worker available');
      return;
    }
    if (this.state === 'idle') {
      console.warn('SpatialService: Not initialized, call init() first');
      return;
    }
    if (this.state !== 'initializing' && this.state !== 'running') {
      console.warn('SpatialService: Cannot run, state is', this.state);
      return;
    }
    this.setState('running');
    const request: SpatialWorkerRequest = { type: 'run' };
    try {
      this.worker.postMessage(request);
    } catch (err: any) {
      console.error('[SpatialService] Failed to post run message:', err);
      this.terminate();
      this.setState('error');
      this.callbacks.onError?.(err?.message ?? 'Failed to run spatial simulation');
    }
  }

  /**
   * Cancel a running simulation.
   */
  cancel(): void {
    if (this.worker) {
      const request: SpatialWorkerRequest = { type: 'cancel' };
      try {
        this.worker.postMessage(request);
      } catch (err: any) {
        console.warn('[SpatialService] Failed to post cancel message:', err);
      }
    }
    this.setState('idle');
  }

  /**
   * Terminate the worker and clean up.
   */
  terminate(): void {
    if (this.worker) {
      const request: SpatialWorkerRequest = { type: 'destroy' };
      try {
        this.worker.postMessage(request);
      } catch (err: any) {
        console.warn('[SpatialService] Failed to post destroy message:', err);
      }
      try {
        this.worker.terminate();
      } catch (err: any) {
        console.warn('[SpatialService] Failed to terminate worker:', err);
      }
      this.worker = null;
    }
    this.setState('idle');
  }

  getState(): SpatialSimulationState {
    return this.state;
  }

  private setState(state: SpatialSimulationState): void {
    this.state = state;
    this.callbacks.onStateChange?.(state);
  }

  private handleWorkerMessage(msg: SpatialWorkerResponse): void {
    switch (msg.type) {
      case 'initialized':
        this.callbacks.onInitialized?.({ geometries: msg.geometries, speciesNames: msg.speciesNames });
        this.run();
        break;

      case 'snapshot':
        this.callbacks.onSnapshot?.(msg.snapshot);
        break;

      case 'progress':
        this.callbacks.onProgress?.(msg.step, msg.totalSteps, msg.time);
        break;

      case 'complete':
        this.setState('complete');
        this.callbacks.onComplete?.(msg.result);
        break;

      case 'error':
        this.setState('error');
        this.callbacks.onError?.(msg.message);
        break;
    }
  }
}

/** Singleton instance */
export const spatialService = new SpatialService();
