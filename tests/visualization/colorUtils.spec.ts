import { describe, it, expect } from 'vitest';
import {
  hashStringTo24Bit,
  toHexColor,
  colorFromName,
  brightenRgb,
  luminance,
  foregroundForBackground
} from '../../services/visualization/colorUtils';

describe('colorUtils', () => {
  describe('hashStringTo24Bit', () => {
    it('returns a consistent hash for the same string', () => {
      expect(hashStringTo24Bit('moleculeA')).toBe(hashStringTo24Bit('moleculeA'));
      expect(hashStringTo24Bit('siteB')).toBe(hashStringTo24Bit('siteB'));
    });

    it('returns different hashes for different strings', () => {
      expect(hashStringTo24Bit('moleculeA')).not.toBe(hashStringTo24Bit('moleculeB'));
    });
  });

  describe('toHexColor', () => {
    it('formats a number to a 6-digit hex color with a leading #', () => {
      expect(toHexColor(0xffffff)).toBe('#ffffff');
      expect(toHexColor(0x000000)).toBe('#000000');
      expect(toHexColor(0xff0000)).toBe('#ff0000');
    });

    it('pads with leading zeros', () => {
      expect(toHexColor(0x123)).toBe('#000123');
      expect(toHexColor(0x0)).toBe('#000000');
    });
  });

  describe('brightenRgb', () => {
    it('brightens an rgb color by a factor', () => {
      const darkColor = 0x101010;
      const brightened = brightenRgb(darkColor, 0.5);

      const r = (brightened >> 16) & 0xff;
      const g = (brightened >> 8) & 0xff;
      const b = brightened & 0xff;

      // Original is 16 (0x10). factor is 0.5. 16 + (255 - 16) * 0.5 = 16 + 119.5 = 135.5 -> 135 (0x87)
      expect(r).toBe(135);
      expect(g).toBe(135);
      expect(b).toBe(135);
    });

    it('caps brightness at 255', () => {
      const lightColor = 0xf0f0f0;
      const brightened = brightenRgb(lightColor, 1.0);
      expect(toHexColor(brightened)).toBe('#ffffff');
    });
  });

  describe('colorFromName', () => {
    it('generates a consistent hex color from a name', () => {
      expect(colorFromName('EGFR')).toBe(colorFromName('EGFR'));
      expect(colorFromName('ErbB2')).not.toBe(colorFromName('EGFR'));
    });

    it('returns a valid hex color starting with #', () => {
      const color = colorFromName('SomeMolecule');
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('luminance', () => {
    it('calculates correct luminance for basic colors', () => {
      expect(luminance('#000000')).toBeCloseTo(0, 4); // Black
      expect(luminance('#ffffff')).toBeCloseTo(1, 4); // White

      // Green is the brightest primary color
      const redLum = luminance('#ff0000');
      const greenLum = luminance('#00ff00');
      const blueLum = luminance('#0000ff');

      expect(greenLum).toBeGreaterThan(redLum);
      expect(redLum).toBeGreaterThan(blueLum);
      expect(blueLum).toBeGreaterThan(0);
    });

    it('handles hex values without #', () => {
      expect(luminance('ffffff')).toBeCloseTo(1, 4);
      expect(luminance('000000')).toBeCloseTo(0, 4);
    });
  });

  describe('foregroundForBackground', () => {
    it('returns dark text for light backgrounds', () => {
      expect(foregroundForBackground('#ffffff')).toBe('#0f172a'); // White
      expect(foregroundForBackground('#ffff00')).toBe('#0f172a'); // Yellow
      expect(foregroundForBackground('#00ff00')).toBe('#0f172a'); // Green
    });

    it('returns white text for dark backgrounds', () => {
      expect(foregroundForBackground('#000000')).toBe('#ffffff'); // Black
      expect(foregroundForBackground('#0000ff')).toBe('#ffffff'); // Blue
      expect(foregroundForBackground('#0f172a')).toBe('#ffffff'); // Dark slate
    });

    it('uses the threshold of 0.35 correctly', () => {
      // Just above 0.35
      const lightGray = '#a0a0a0';
      // luminance of #a0a0a0 is ~0.3515
      expect(foregroundForBackground(lightGray)).toBe('#0f172a');

      // Just below 0.35
      const midGray = '#999999';
      // luminance of #999999 is ~0.3185
      expect(foregroundForBackground(midGray)).toBe('#ffffff');
    });
  });
});
