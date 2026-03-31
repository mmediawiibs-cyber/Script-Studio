export interface DOPBreakdown {
  shotSize: string;
  cameraAngle: string;
  cameraMovement: string;
}

export interface HookVariation {
  type: string;
  headline: string;
  visualAction: string;
}

export interface VideoPlan {
  dop: DOPBreakdown;
  hooks: HookVariation[];
}
