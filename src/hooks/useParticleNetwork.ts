import {
  useEffect, useMemo, useRef,
} from 'react';
import 'canvas-particle-network';
import type { TOptions } from 'canvas-particle-network';

const defaultOptions: TOptions = {
  particleColor: '#91FF35',
  background: '#000',
  interactive: false,
  speed: 'medium',
  density: 'high',
};

export const useParticleNetwork = (options?: Partial<TOptions>) => {
  const particleNetworkOptions = useMemo(() => {
    if (options) {
      return {
        ...defaultOptions,
        ...options,
      };
    }
    return defaultOptions;
  }, [options]);
  const particleCanvasRef = useRef(null);

  useEffect(() => {
    // @ts-expect-error wrong type inferring for canvas-particle-network.d.ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const particleNetwork = new window.ParticleNetwork(
      particleCanvasRef.current,
      particleNetworkOptions,
    );
  }, [particleNetworkOptions]);

  return {
    particleCanvasRef,
  };
};
