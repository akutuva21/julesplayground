import type { CompactSimulationResult, SimulationResults } from '../types';

export type SimulationResultPayload = SimulationResults | CompactSimulationResult;

export function toCompactSimulationResult(results: SimulationResults): CompactSimulationResult | null {
  if (results.data.length === 0 || results.headers.length === 0 || results.dataBySuffix) return null;
  const columnCount = results.headers.length;
  const values = new Float64Array(results.data.length * columnCount);
  let offset = 0;
  for (const row of results.data) {
    for (const header of results.headers) {
      const value = row[header];
      values[offset++] = typeof value === 'number' ? value : Number(value ?? Number.NaN);
    }
  }
  const { data: _data, ...metadata } = results;
  return {
    transport: 'float64-matrix',
    headers: results.headers,
    rowCount: results.data.length,
    columnCount,
    values: values.buffer,
    metadata,
  };
}

export function materializeSimulationResult(payload: SimulationResultPayload): SimulationResults {
  if (!('transport' in payload)) return payload;
  if (payload.transport !== 'float64-matrix') throw new Error('Unsupported simulation result transport');
  if (payload.values.byteLength !== payload.rowCount * payload.columnCount * Float64Array.BYTES_PER_ELEMENT) {
    throw new Error('Compact simulation result has invalid matrix dimensions');
  }
  const values = new Float64Array(payload.values);
  const data: Record<string, number>[] = new Array(payload.rowCount);
  let offset = 0;
  for (let rowIndex = 0; rowIndex < payload.rowCount; rowIndex++) {
    const row: Record<string, number> = {};
    for (let columnIndex = 0; columnIndex < payload.columnCount; columnIndex++) {
      row[payload.headers[columnIndex]] = values[offset++];
    }
    data[rowIndex] = row;
  }
  return { ...payload.metadata, headers: payload.headers, data };
}
