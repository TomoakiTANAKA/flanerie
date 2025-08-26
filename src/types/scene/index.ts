import * as THREE from 'three';

export interface SceneConfig {
  canvasId: string;
  width: number;
  height: number;
  backgroundColor: number;
  enableShadows: boolean;
}

export interface CameraConfig {
  fov: number;
  near: number;
  far: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
}

export interface LightingConfig {
  ambient: {
    color: number;
    intensity: number;
  };
  directional: {
    color: number;
    intensity: number;
    position: THREE.Vector3;
    castShadow: boolean;
  };
}

