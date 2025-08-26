import * as THREE from 'three';
import type {SceneConfig, CameraConfig, LightingConfig} from '@/types/scene/index.ts';

export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  private animationId: number = 0;

  constructor(config: SceneConfig) {
    this.scene = new THREE.Scene();
    this.setupRenderer(config);
    this.setupCamera({
      fov: 75,
      near: 0.1,
      far: 1000,
      position: new THREE.Vector3(0, 20, 20),
      target: new THREE.Vector3(0, 0, 0)
    });
    this.setupLighting({
      ambient: { color: 0x404040, intensity: 0.4 },
      directional: {
        color: 0xffffff,
        intensity: 0.8,
        position: new THREE.Vector3(-50, 100, 50),
        castShadow: true
      }
    });

    this.setupEventListeners();
  }

  private setupRenderer(config: SceneConfig): void {
    const canvas = document.getElementById(config.canvasId) as HTMLCanvasElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });

    this.renderer.setSize(config.width, config.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = config.enableShadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(config.backgroundColor);

    // Enable tone mapping for better lighting
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
  }

  private setupCamera(config: CameraConfig): void {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(config.fov, aspect, config.near, config.far);
    this.camera.position.copy(config.position);
    this.camera.lookAt(config.target);
  }

  private setupLighting(config: LightingConfig): void {
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(
      config.ambient.color,
      config.ambient.intensity
    );
    this.scene.add(ambientLight);

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(
      config.directional.color,
      config.directional.intensity
    );
    directionalLight.position.copy(config.directional.position);
    directionalLight.castShadow = config.directional.castShadow;

    if (config.directional.castShadow) {
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 500;
      directionalLight.shadow.camera.left = -100;
      directionalLight.shadow.camera.right = 100;
      directionalLight.shadow.camera.top = 100;
      directionalLight.shadow.camera.bottom = -100;
    }

    this.scene.add(directionalLight);
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  public startRenderLoop(): void {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.render();
    };
    animate();
  }

  public stopRenderLoop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public dispose(): void {
    this.stopRenderLoop();
    this.renderer.dispose();
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  public addObject(object: THREE.Object3D): void {
    this.scene.add(object);
  }

  public removeObject(object: THREE.Object3D): void {
    this.scene.remove(object);
  }
}
