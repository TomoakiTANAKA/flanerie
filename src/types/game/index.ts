export enum GameState {
  Loading = 'loading',
  Exploring = 'exploring',
  Conversing = 'conversing',
  Paused = 'paused',
  Menu = 'menu'
}

export interface GameConfig {
  graphics: {
    shadows: boolean;
    antialiasing: boolean;
    resolution: number;
  };
  controls: {
    sensitivity: number;
    invertY: boolean;
    keyBindings: KeyBindings;
  };
  content: {
    theme: HistoricalTheme;
    language: string;
  };
}

export interface KeyBindings {
  moveForward: string;
  moveBackward: string;
  moveLeft: string;
  moveRight: string;
  interact: string;
  pause: string;
}

export enum HistoricalTheme {
  EdoTokyo = 'edo_tokyo',
  MedievalEurope = 'medieval_europe',
  MeijiJapan = 'meiji_japan',
  Modern = 'modern'
}

export type GameEventType = 
  | 'state_changed'
  | 'object_selected'
  | 'object_deselected'
  | 'conversation_started'
  | 'conversation_ended'
  | 'knowledge_gained'
  | 'location_discovered';

export interface GameEvent {
  type: GameEventType;
  timestamp: number;
  data: any;
}

export interface GameProgress {
  knowledgePoints: number;
  locationsVisited: string[];
  conversationsCompleted: string[];
  achievementsUnlocked: string[];
}