import * as THREE from 'three';

export enum NPCType {
  Resident = 'resident',
  Merchant = 'merchant',
  Craftsman = 'craftsman',
  Noble = 'noble',
  Priest = 'priest',
  Guard = 'guard',
  Child = 'child',
  Elder = 'elder'
}

export interface ConversationOption {
  text: string;
  nextNodeId: string;
  condition?: () => boolean;
}

export interface ConversationNode {
  id: string;
  text: string;
  speaker: string;
  options: ConversationOption[];
  effects?: GameEffect[];
}

export interface ConversationTree {
  id: string;
  nodes: ConversationNode[];
  currentNodeId: string;
}

export interface GameEffect {
  type: 'knowledge_gained' | 'item_received' | 'location_revealed';
  data: any;
}

export interface NPCInfo {
  name: string;
  age: number;
  occupation: string;
  personality: string;
  background: string;
  relations: string[];
}

export interface NPCConfig {
  type: NPCType;
  position: THREE.Vector3;
  info: NPCInfo;
  conversations: ConversationTree;
}

export interface NPC {
  id: string;
  name: string;
  type: NPCType;
  position: THREE.Vector3;
  avatar: THREE.Mesh;
  info: NPCInfo;
  conversations: ConversationTree;
  isInteractable: boolean;
  isSelected: boolean;
}

export interface NPCManagerConfig {
  defaultMaterial: THREE.Material;
  selectedMaterial: THREE.Material;
  hoveredMaterial: THREE.Material;
}