
import { describe, it, expect } from 'vitest';

import { parseExperimentalData } from '../../src/services/data/experimentalData';

describe('Experimental Data Parsing', () => {
    it('should parse valid CSV', () => {
        const input = `time, A, B
        0, 100, 0
        1, 90, 10`;
        const data = parseExperimentalData(input);
        expect(data).toHaveLength(2);
        expect(data[0].time).toBe(0);
        expect(data[0].values['A']).toBe(100);
        expect(data[1].time).toBe(1);
        expect(data[1].values['B']).toBe(10);
    });

    it('should handle missing header by auto-generating names', () => {
        const input = `0, 100\n1, 90`;
        const data = parseExperimentalData(input);
        expect(data[0].values['Observable1']).toBe(100);
    });

    it('should ignore empty lines and comments', () => {
        const input = `
        # This is a comment
        time, A
        
        0, 100
        # Another comment
        1, 50
        `;
        const data = parseExperimentalData(input);
        expect(data).toHaveLength(2);
        expect(data[0].time).toBe(0);
        expect(data[1].time).toBe(1);
    });

    it('should throws on invalid time', () => {
        const input = `time, A\nfoo, 100`;
        expect(() => parseExperimentalData(input)).toThrow(/Invalid time/);
    });

    it('should throws on invalid value', () => {
        const input = `time, A\n0, bar`;
        expect(() => parseExperimentalData(input)).toThrow(/Invalid value/);
    });

    // Property-like stress test
    it('should handle large sparse-ish data', () => {
        let csv = 'time, A, B, C\n';
        for (let i = 0; i < 100; i++) {
            csv += `${i}, ${Math.random()}, ${Math.random()}, ${Math.random()}\n`;
        }
        const data = parseExperimentalData(csv);
        expect(data).toHaveLength(100);
        expect(Object.keys(data[0].values)).toHaveLength(3);
    });
});
