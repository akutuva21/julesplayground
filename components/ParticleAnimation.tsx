import React, { useMemo } from 'react';

interface ParticleAnimationProps {
  type: 'nfsim' | 'ode' | 'ssa' | 'multiphase';
  className?: string;
}

const PARTICLE_COUNT = 20;

const getPalette = (type: ParticleAnimationProps['type']): string[] => {
  switch (type) {
    case 'nfsim':
      return ['#14b8a6', '#0ea5e9', '#22c55e'];
    case 'ssa':
      return ['#f97316', '#f59e0b', '#ef4444'];
    case 'multiphase':
      return ['#8b5cf6', '#0ea5e9', '#22c55e'];
    default:
      return ['#0ea5e9', '#14b8a6', '#64748b'];
  }
};

export const ParticleAnimation: React.FC<ParticleAnimationProps> = ({ type, className }) => {
  const palette = useMemo(() => getPalette(type), [type]);
  const particles = useMemo(() => {
    const randomValues = new Uint32Array(PARTICLE_COUNT * 5);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(randomValues);
    } else {
      // Fallback to Math.random() for environments without Web Crypto API (e.g. old SSR)
      // Since this is purely aesthetic animation noise, falling back is perfectly safe.
      for (let i = 0; i < randomValues.length; i++) {
        // eslint-disable-next-line react-hooks/purity
        randomValues[i] = Math.floor(Math.random() * 4294967296);
      }
    }
    const getRandom = (idx: number) => randomValues[idx] / 4294967296;

    return Array.from({ length: PARTICLE_COUNT }, (_, idx) => {
      const i = idx * 5;
      return {
        id: idx,
        top: getRandom(i) * 90 + 5,
        left: getRandom(i + 1) * 90 + 5,
        size: getRandom(i + 2) * 8 + 4,
        delay: getRandom(i + 3) * 1.5,
        duration: getRandom(i + 4) * 2 + 1.5
      };
    });
  }, [type]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {particles.map((particle, idx) => {
        const color = palette[idx % palette.length];
        return (
          <span
            key={particle.id}
            className="absolute rounded-full opacity-70"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: color,
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleAnimation;
