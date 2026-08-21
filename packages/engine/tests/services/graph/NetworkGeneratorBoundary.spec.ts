import { describe, it, expect } from 'vitest';
import { packReactantKey, unpackReactantKey } from '../../../src/services/graph/NetworkGenerator.ts';

describe('NetworkGenerator Key Packing Boundary Tests', () => {
  it('correctly packs and unpacks small molecule indices', () => {
    const key = packReactantKey(0, 5);
    const unpacked = unpackReactantKey(key);
    expect(unpacked).toEqual({ r: 0, molIdx: 5 });
  });

  it('correctly packs and unpacks molecule indices at and beyond the 16-bit boundary (65,536)', () => {
    // 65536 is 2^16. Bitwise << 16 would collide with r = 1, m = 0.
    const keyA = packReactantKey(0, 65536);
    const keyB = packReactantKey(1, 0);
    expect(keyA).not.toEqual(keyB);

    const unpackedA = unpackReactantKey(keyA);
    expect(unpackedA).toEqual({ r: 0, molIdx: 65536 });

    const unpackedB = unpackReactantKey(keyB);
    expect(unpackedB).toEqual({ r: 1, molIdx: 0 });
  });

  it('handles large molecule indices (e.g., 100,000 and 1,000,000) without collision', () => {
    const key1 = packReactantKey(2, 100000);
    const key2 = packReactantKey(2, 100001);
    expect(key1).not.toEqual(key2);

    expect(unpackReactantKey(key1)).toEqual({ r: 2, molIdx: 100000 });
    expect(unpackReactantKey(key2)).toEqual({ r: 2, molIdx: 100001 });
  });
});
