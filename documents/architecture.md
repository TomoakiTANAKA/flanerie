# アーキテクチャ設計 (Architecture Design)

## システム全体構成

```
Flanerie Game Architecture
├── Frontend (Vite + TypeScript)
│   ├── Three.js 3D Engine
│   ├── DOM-based UI System
│   └── Event Management
└── Future Extensions
    ├── Google Maps API
    └── Backend Services
```

## コアモジュール設計

### 1. Scene Management Layer
**責任**: 3Dシーン全体の管理と調整

```typescript
SceneManager
├── scene: THREE.Scene
├── camera: THREE.PerspectiveCamera  
├── renderer: THREE.WebGLRenderer
├── controls: CameraController
└── update(): void
```

### 2. Camera Controller
**責任**: ユーザー入力によるカメラ操作

```typescript
CameraController
├── position: Vector3
├── target: Vector3
├── zoom: number
├── handleKeyboard(): void
├── handleMouse(): void
└── update(): void
```

### 3. Object Management
**責任**: ゲーム内オブジェクトの生成・管理

```typescript
ObjectManager
├── buildings: Building[]
├── npcs: NPC[]
├── terrain: Terrain
├── addBuilding(config): Building
├── addNPC(config): NPC
└── getClickedObject(ray): Object3D
```

### 4. Interaction System
**責任**: ユーザーとオブジェクトの相互作用

```typescript
InteractionManager
├── raycaster: THREE.Raycaster
├── selectedObject: Object3D | null
├── handleClick(event): void
├── handleHover(event): void
└── showInfo(object): void
```

### 5. UI Management
**責任**: ユーザーインターフェース管理

```typescript
UIManager
├── infoPanel: InfoPanel
├── conversationUI: ConversationUI
├── show(component): void
├── hide(component): void
└── update(): void
```

## データ構造設計

### Building Data Structure
```typescript
interface Building {
  id: string;
  type: BuildingType;
  position: Vector3;
  size: Vector3;
  rotation: number;
  info: {
    name: string;
    description: string;
    historicalContext: string;
    era: HistoricalEra;
  };
  mesh: THREE.Mesh;
  interactive: boolean;
}

enum BuildingType {
  House = 'house',
  Shop = 'shop',
  Temple = 'temple',
  Castle = 'castle',
  Market = 'market'
}
```

### NPC Data Structure
```typescript
interface NPC {
  id: string;
  name: string;
  type: NPCType;
  position: Vector3;
  avatar: THREE.Mesh;
  conversations: ConversationTree;
  isInteractable: boolean;
}

enum NPCType {
  Resident = 'resident',
  Merchant = 'merchant',
  Craftsman = 'craftsman',
  Noble = 'noble',
  Priest = 'priest'
}
```

### Conversation System
```typescript
interface ConversationTree {
  id: string;
  nodes: ConversationNode[];
  currentNodeId: string;
}

interface ConversationNode {
  id: string;
  text: string;
  speaker: string;
  options: ConversationOption[];
  effects?: GameEffect[];
}

interface ConversationOption {
  text: string;
  nextNodeId: string;
  condition?: () => boolean;
}
```

## イベントシステム設計

### Event-Driven Architecture
```typescript
// カスタムイベントシステム
class GameEventManager {
  private listeners: Map<string, Function[]>;
  
  on(event: string, callback: Function): void
  emit(event: string, data?: any): void
  off(event: string, callback: Function): void
}

// 主要イベント
enum GameEvents {
  OBJECT_SELECTED = 'object:selected',
  OBJECT_DESELECTED = 'object:deselected', 
  NPC_INTERACTION = 'npc:interaction',
  CONVERSATION_START = 'conversation:start',
  CONVERSATION_END = 'conversation:end',
  CAMERA_MOVED = 'camera:moved'
}
```

## レンダリングパイプライン

### Rendering Loop
```typescript
class RenderLoop {
  update(deltaTime: number): void {
    // 1. Update game logic
    this.updateGameObjects(deltaTime);
    
    // 2. Update camera
    this.cameraController.update(deltaTime);
    
    // 3. Update UI
    this.uiManager.update(deltaTime);
    
    // 4. Render scene
    this.renderer.render(this.scene, this.camera);
  }
}
```

### Performance Considerations
- **Object Pooling**: 頻繁に生成/削除されるオブジェクト用
- **LOD (Level of Detail)**: 距離に応じた描画品質調整
- **Frustum Culling**: カメラ外オブジェクトの描画スキップ
- **Batch Rendering**: 同類オブジェクトの一括描画

## 状態管理

### Game State Machine
```typescript
enum GameState {
  LOADING = 'loading',
  EXPLORING = 'exploring',
  CONVERSING = 'conversing',
  PAUSED = 'paused'
}

class GameStateManager {
  private currentState: GameState;
  private stateStack: GameState[];
  
  transition(newState: GameState): void
  pushState(state: GameState): void
  popState(): GameState
}
```

## 拡張性設計

### Plugin Architecture (将来的)
```typescript
interface GamePlugin {
  name: string;
  version: string;
  init(game: Game): void;
  update(deltaTime: number): void;
  destroy(): void;
}

class PluginManager {
  private plugins: Map<string, GamePlugin>;
  
  register(plugin: GamePlugin): void
  unregister(name: string): void
  getPlugin(name: string): GamePlugin
}
```

### Configuration System
```typescript
interface GameConfig {
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
```

## セキュリティ・パフォーマンス

### Performance Monitoring
- FPS監視
- メモリ使用量追跡
- 描画コール数監視
- Three.js Stats.js統合

### Error Handling
- グローバルエラーハンドラー
- Three.js特有のエラー処理
- ユーザーフレンドリーなエラーメッセージ
- 開発環境での詳細ログ出力