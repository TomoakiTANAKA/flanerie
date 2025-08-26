import * as THREE from 'three';

export enum BuildingType {
  House = 'house',
  Shop = 'shop',
  Temple = 'temple',
  Castle = 'castle',
  Market = 'market',
  Warehouse = 'warehouse',
  Workshop = 'workshop'
}

export enum HistoricalEra {
  EdoPeriod = 'edo_period',
  MeijiEra = 'meiji_era',
  MedievalEurope = 'medieval_europe',
  Modern = 'modern'
}

export interface BuildingInfo {
  name: string;
  description: string;
  historicalContext: string;
  era: HistoricalEra;
  inhabitants?: string[];
  function: string;
}

export interface BuildingConfig {
  type: BuildingType;
  position: THREE.Vector3;
  size: THREE.Vector3;
  rotation: number;
  color?: number;
  info: BuildingInfo;
}

export interface Building {
  id: string;
  type: BuildingType;
  position: THREE.Vector3;
  size: THREE.Vector3;
  rotation: number;
  info: BuildingInfo;
  mesh: THREE.Mesh;
  interactive: boolean;
  isSelected: boolean;
}

export interface BuildingManagerConfig {
  defaultMaterial: THREE.Material;
  selectedMaterial: THREE.Material;
  hoveredMaterial: THREE.Material;
}