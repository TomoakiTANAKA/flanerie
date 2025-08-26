export interface UIComponent {
  id: string;
  element: HTMLElement;
  isVisible: boolean;
  show(): void;
  hide(): void;
  update(data?: any): void;
  dispose(): void;
}

export interface InfoPanelData {
  title: string;
  description: string;
  details?: string[];
  imageUrl?: string;
}

export interface ConversationUIData {
  speakerName: string;
  text: string;
  options: ConversationOptionUI[];
  avatarUrl?: string;
}

export interface ConversationOptionUI {
  text: string;
  callback: () => void;
  disabled?: boolean;
}

export interface UIManagerConfig {
  infoPanelId: string;
  conversationUIId: string;
  controlsInfoId: string;
}

export type UIEventType = 'show' | 'hide' | 'update' | 'interact';

export interface UIEvent {
  type: UIEventType;
  component: string;
  data?: any;
}