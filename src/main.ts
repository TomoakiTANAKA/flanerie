import './style.css'
import * as THREE from 'three'
import { SceneManager } from '@/scene/SceneManager.ts'
import { CameraController } from '@/scene/CameraController.ts'

class FlanerieGame {
  private sceneManager: SceneManager;
  private cameraController: CameraController;
  private clock = new THREE.Clock();
  
  constructor() {
    this.init();
  }
  
  private init(): void {
    this.setupHTML();
    this.setupScene();
    this.setupControls();
    this.addTestObjects();
    this.startGameLoop();
  }
  
  private setupHTML(): void {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <div id="game-container">
        <canvas id="game-canvas"></canvas>
        <div id="ui-overlay">
          <div id="info-panel" style="display: none;">
            <h3 id="info-title">Object Info</h3>
            <p id="info-description">Click on objects to see information</p>
          </div>
          <div id="controls-info">
            <p>WASD: Move | Mouse: Look around | Scroll: Zoom</p>
          </div>
        </div>
      </div>
    `;
  }
  
  private setupScene(): void {
    this.sceneManager = new SceneManager({
      canvasId: 'game-canvas',
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x87CEEB, // Sky blue
      enableShadows: true
    });
  }
  
  private setupControls(): void {
    this.cameraController = new CameraController(this.sceneManager.camera, {
      moveSpeed: 20,
      rotationSpeed: 0.005,
      zoomSpeed: 2,
      minZoom: 5,
      maxZoom: 50,
      smoothness: 0.1
    });
  }
  
  private addTestObjects(): void {
    // Add a simple ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.sceneManager.addObject(ground);
    
    // Add some test cubes (buildings)
    const buildingGeometry = new THREE.BoxGeometry(2, 4, 2);
    const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    
    for (let i = 0; i < 5; i++) {
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.set(
        (Math.random() - 0.5) * 20,
        2,
        (Math.random() - 0.5) * 20
      );
      building.castShadow = true;
      building.receiveShadow = true;
      this.sceneManager.addObject(building);
    }
  }
  
  private startGameLoop(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      const deltaTime = this.clock.getDelta();
      
      this.cameraController.update(deltaTime);
      this.sceneManager.render();
    };
    animate();
  }
}

// Initialize the game when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new FlanerieGame());
} else {
  new FlanerieGame();
}