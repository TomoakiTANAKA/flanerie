import * as THREE from 'three';

export interface CameraControlConfig {
  moveSpeed: number;
  rotationSpeed: number;
  zoomSpeed: number;
  minZoom: number;
  maxZoom: number;
  smoothness: number;
}

export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private config: CameraControlConfig;
  private keys: { [key: string]: boolean } = {};
  private mouse = { x: 0, y: 0, isPressed: false };
  private target = new THREE.Vector3(0, 0, 0);
  private currentDistance = 20;
  private targetDistance = 20;
  private phi = Math.PI / 4; // Vertical angle
  private theta = 0; // Horizontal angle
  private targetPhi = Math.PI / 4;
  private targetTheta = 0;
  private isDragging = false;
  
  constructor(camera: THREE.PerspectiveCamera, config: Partial<CameraControlConfig> = {}) {
    this.camera = camera;
    this.config = {
      moveSpeed: 50,
      rotationSpeed: 0.005,
      zoomSpeed: 2,
      minZoom: 5,
      maxZoom: 100,
      smoothness: 0.1,
      ...config
    };
    
    this.setupEventListeners();
    this.updateCameraPosition();
  }
  
  private setupEventListeners(): void {
    // Keyboard events
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    
    // Mouse events
    window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    window.addEventListener('wheel', this.handleWheel.bind(this));
    
    // Prevent context menu on right click
    window.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  
  private handleKeyDown(event: KeyboardEvent): void {
    this.keys[event.code] = true;
  }
  
  private handleKeyUp(event: KeyboardEvent): void {
    this.keys[event.code] = false;
  }
  
  private handleMouseDown(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) { // Left or right mouse button
      this.isDragging = true;
      this.mouse.isPressed = true;
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    }
  }
  
  private handleMouseMove(event: MouseEvent): void {
    if (this.isDragging && this.mouse.isPressed) {
      const deltaX = event.clientX - this.mouse.x;
      const deltaY = event.clientY - this.mouse.y;
      
      this.targetTheta -= deltaX * this.config.rotationSpeed;
      this.targetPhi += deltaY * this.config.rotationSpeed;
      
      // Limit vertical rotation
      this.targetPhi = Math.max(0.1, Math.min(Math.PI - 0.1, this.targetPhi));
      
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    }
  }
  
  private handleMouseUp(): void {
    this.isDragging = false;
    this.mouse.isPressed = false;
  }
  
  private handleWheel(event: WheelEvent): void {
    event.preventDefault();
    
    const zoomDelta = event.deltaY > 0 ? this.config.zoomSpeed : -this.config.zoomSpeed;
    this.targetDistance = THREE.MathUtils.clamp(
      this.targetDistance + zoomDelta,
      this.config.minZoom,
      this.config.maxZoom
    );
  }
  
  public update(deltaTime: number): void {
    this.handleMovement(deltaTime);
    this.updateCameraPosition();
  }
  
  private handleMovement(deltaTime: number): void {
    const moveDistance = this.config.moveSpeed * deltaTime;
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    
    // Calculate movement directions based on camera orientation
    this.camera.getWorldDirection(forward);
    forward.y = 0; // Keep movement on horizontal plane
    forward.normalize();
    
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
    right.normalize();
    
    // Handle WASD movement
    if (this.keys['KeyW']) {
      this.target.addScaledVector(forward, moveDistance);
    }
    if (this.keys['KeyS']) {
      this.target.addScaledVector(forward, -moveDistance);
    }
    if (this.keys['KeyA']) {
      this.target.addScaledVector(right, -moveDistance);
    }
    if (this.keys['KeyD']) {
      this.target.addScaledVector(right, moveDistance);
    }
  }
  
  private updateCameraPosition(): void {
    // Smooth interpolation for rotation and zoom
    this.phi = THREE.MathUtils.lerp(this.phi, this.targetPhi, this.config.smoothness);
    this.theta = THREE.MathUtils.lerp(this.theta, this.targetTheta, this.config.smoothness);
    this.currentDistance = THREE.MathUtils.lerp(this.currentDistance, this.targetDistance, this.config.smoothness);
    
    // Convert spherical coordinates to Cartesian
    const x = this.target.x + this.currentDistance * Math.sin(this.phi) * Math.cos(this.theta);
    const y = this.target.y + this.currentDistance * Math.cos(this.phi);
    const z = this.target.z + this.currentDistance * Math.sin(this.phi) * Math.sin(this.theta);
    
    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.target);
  }
  
  public setTarget(target: THREE.Vector3): void {
    this.target.copy(target);
  }
  
  public getTarget(): THREE.Vector3 {
    return this.target.clone();
  }
  
  public dispose(): void {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    window.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    window.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    window.removeEventListener('wheel', this.handleWheel.bind(this));
  }
}