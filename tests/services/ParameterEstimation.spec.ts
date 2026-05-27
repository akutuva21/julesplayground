
import { describe, it, expect } from 'vitest';
import { safeLog, clamp, deriveBounds, priorToLogNormal } from '../../src/services/ParameterEstimation';

describe('ParameterEstimation Math Helpers', () => {

    describe('safeLog', () => {
        it('should compute log for positive numbers', () => {
            expect(safeLog(Math.E)).toBeCloseTo(1);
            expect(safeLog(1)).toBeCloseTo(0);
        });
        it('should handle zero by clamping to 1e-12', () => {
            const minLog = Math.log(1e-12);
            expect(safeLog(0)).toBeCloseTo(minLog);
        });
        it('should handle negative numbers by clamping', () => {
            const minLog = Math.log(1e-12);
            expect(safeLog(-5)).toBeCloseTo(minLog);
        });
    });

    describe('clamp', () => {
        it('should return value within bounds', () => {
            expect(clamp(5, 0, 10)).toBe(5);
        });
        it('should clamp low', () => {
            expect(clamp(-5, 0, 10)).toBe(0);
        });
        it('should clamp high', () => {
            expect(clamp(15, 0, 10)).toBe(10);
        });
    });

    describe('deriveBounds', () => {
        it('should derive default bounds from mean if not specified', () => {
            // Test default behavior with minimal inputs
            // Logic check: min = max(prior.min ?? mean*0.1, 1e-12)
            // If we pass 0 for min, it sees 0. 0 is falsy but ?? checks for null/undefined.
            // Actually prior logic takes prior?.min. If we pass 0, prior.min is 0.
            // Math.max(0, 1e-12) = 1e-12.

            const p = { mean: 10, std: 1, min: undefined as any, max: undefined as any };
            const b = deriveBounds(p);
            // Default min: 10 * 0.1 = 1.
            // Default max: 10 * 10 = 100.
            expect(b.logMin).toBeCloseTo(Math.log(1));
            expect(b.logMax).toBeCloseTo(Math.log(100));
        });

        it('should use explicit bounds', () => {
            const p = { mean: 10, std: 1, min: 5, max: 20 };
            const b = deriveBounds(p);
            expect(b.logMin).toBeCloseTo(Math.log(5));
            expect(b.logMax).toBeCloseTo(Math.log(20));
        });

        it('should clamp bounds to safe ranges', () => {
            const p = { mean: 1e-50, std: 1, min: 1e-50, max: 1e50 };
            const b = deriveBounds(p);
            // -30 to 30 is the hard clamp, but safeLog(1e-12) is ~-27.63
            // So it's effectively clamped by the epsilon floor
            expect(b.logMin).toBeCloseTo(Math.log(1e-12));
            // log(1e50) is very large (~115). Should clamp to 30
            expect(b.logMax).toBe(30);
        });
    });

    describe('priorToLogNormal', () => {
        it('should convert mean/std to mu/sigma for log-space', () => {
            const mean = 10;
            const std = 10; // CV = 1
            const res = priorToLogNormal({ mean, std, min: 0, max: 0 });

            // sigmaLog = sqrt(log(1 + 1^2)) = sqrt(log(2)) ~= 0.83
            // muLog = log(10) - 0.5 * sigmaLog^2 = log(10) - 0.5 * log(2) = log(10) - log(sqrt(2)) = log(10/1.414)

            const expectedSigma = Math.sqrt(Math.log(2));
            const expectedMu = Math.log(10) - 0.5 * Math.log(2);

            expect(res.sigmaLog).toBeCloseTo(expectedSigma);
            expect(res.muLog).toBeCloseTo(expectedMu);
        });

        it('should clamp sigma to avoid explosive sampling', () => {
            const mean = 10;
            const std = 1000; // Large CV
            const res = priorToLogNormal({ mean, std, min: 0, max: 0 });
            // Clamped to 1.0 max
            expect(res.sigmaLog).toBe(1.0);
        });
    });
});
