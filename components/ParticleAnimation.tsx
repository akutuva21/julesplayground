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
    return Array.from({ length: PARTICLE_COUNT }, (_, idx) => ({
      id: idx,
      // Security Exception: Math.random() is fine for visual simulation noise. Not used for tokens/IDs.
      // eslint-disable-next-line security/detect-pseudoRandomBytes
      top: Math.random() * 90 + 5,
      // eslint-disable-next-line security/detect-pseudoRandomBytes
      left: Math.random() * 90 + 5,
      // eslint-disable-next-line security/detect-pseudoRandomBytes
      size: Math.random() * 8 + 4,
      // eslint-disable-next-line security/detect-pseudoRandomBytes
      delay: Math.random() * 1.5,
      // eslint-disable-next-line security/detect-pseudoRandomBytes
      duration: Math.random() * 2 + 1.5
    }));
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
