import { TOptionable } from 'types';

declare module 'canvas-particle-network' {
  type TSpeed = TOptionable<'fast' | 'medium' | 'slow' | 'none'>;
  type TDensity = TOptionable<'high' | 'low'>;
  type TCanvas = HTMLElement;
  type TOptions = {
    /**
     * Color of the particles. Must be a valid hexadecimal code.
     * Default: #ffffff
     */
    particleColor?: string;
    /**
     * Specifies a background color or image to the canvas. Must be a valid image URL (e.g. img/demo-bg.jpg) or hexadecimal code.
     * Default: #1a252f
     */
    background?: string;
    /**
     * Allow users to click on the canvas to create a new particle. Its velocity will depend on the specified speed (see below).
     * Default: true
     */
    interactive?: boolean;
    /**
     * Velocity of the particles. Must be one of the following:
     *  none
     *  slow
     *  medium
     *  fast
     * Default: medium
     */
    speed?: TSpeed;
    /**
     * Density of the particles. Actual amount depends on the canvas size, and is calculate by dividing the total canvas size by the density. The following values are accepted:
          low (or 20000)
          medium (or 10000)
          high (or 5000)
          Any number
       Please note that the higher the density, the more computationally intensive / slower each animation step becomes!
     * Default: medium (alias for 10000)
     */
    density: TDensity | string;
  };
  class ParticleNetwork {
    constructor(canvas: TCanvas, options: TOptions): ParticleNetwork;

    public init(): void;
    public update(): void;
    public setVelocity(speed: TSpeed): number;
    public setDensity(density: TDensity | string): number;
    public setStyles(div, styles): void;
  }
}

declare global {
  interface Window {
    ParticleNetwork: ParticleNetwork;
  }
}
