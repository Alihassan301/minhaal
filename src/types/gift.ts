export type FlowerKind = 'rose' | 'sunflower' | 'blossom' | 'peony';

export interface Memory {
  src: string;
  alt: string;
  caption: string;
  note: string;
}

export interface WishFlower {
  label: string;
  kind: FlowerKind;
}

export interface Chapter {
  id: string;
  label: string;
}

export interface GardenFlower {
  kind: FlowerKind;
  /** left position in % */
  x: number;
  /** top position in % */
  y: number;
  /** size in vmin */
  size: number;
  /** 0 = far, 1 = mid, 2 = near (parallax + blur) */
  depth: 0 | 1 | 2;
  rotate: number;
}

export interface GardenLeaf {
  x: number;
  y: number;
  size: number;
  rotate: number;
}