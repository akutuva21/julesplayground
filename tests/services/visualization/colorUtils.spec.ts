import { describe, it, expect } from 'vitest';
import { luminance, foregroundForBackground } from '../../../services/visualization/colorUtils';

describe('colorUtils', () => {
  describe('luminance', () => {
    it('calculates correct luminance for white', () => {
      expect(luminance('#ffffff')).toBeCloseTo(1.0, 4);
    });

    it('calculates correct luminance for black', () => {
      expect(luminance('#000000')).toBeCloseTo(0.0, 4);
    });

    it('calculates correct luminance for middle gray', () => {
      expect(luminance('#808080')).toBeCloseTo(0.21586, 4);
    });

    it('calculates correct luminance for pure red', () => {
      expect(luminance('#ff0000')).toBeCloseTo(0.2126, 4);
    });

    it('calculates correct luminance for pure green', () => {
      expect(luminance('#00ff00')).toBeCloseTo(0.7152, 4);
    });

    it('calculates correct luminance for pure blue', () => {
      expect(luminance('#0000ff')).toBeCloseTo(0.0722, 4);
    });

    it('handles hex string without # prefix (indirect test if replace is working)', () => {
      // The function `luminance` removes '#' prefix, so providing it without '#' also works technically
      // Wait, luminance starts with: const c = hex.replace('#', '');
      expect(luminance('ffffff')).toBeCloseTo(1.0, 4);
    });
  });

  describe('foregroundForBackground', () => {
    it('returns dark text for bright background (white)', () => {
      expect(foregroundForBackground('#ffffff')).toBe('#0f172a');
    });

    it('returns white text for dark background (black)', () => {
      expect(foregroundForBackground('#000000')).toBe('#ffffff');
    });

    it('returns white text for pure red background', () => {
      expect(foregroundForBackground('#ff0000')).toBe('#ffffff');
    });

    it('returns dark text for pure green background', () => {
      expect(foregroundForBackground('#00ff00')).toBe('#0f172a');
    });

    it('returns white text for pure blue background', () => {
      expect(foregroundForBackground('#0000ff')).toBe('#ffffff');
    });

    it('handles the exact threshold if we can find it (or near threshold)', () => {
      // Threshold is 0.35.
      // Let's test a color just above and below 0.35 if we want, or just rely on standard colors.
      expect(foregroundForBackground('#a0a0a0')).toBe('#0f172a'); // luminance ~ 0.351
      expect(foregroundForBackground('#9f9f9f')).toBe('#ffffff'); // luminance ~ 0.347
    });
  });
});
