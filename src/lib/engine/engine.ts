import * as THREE from 'three';
import Stats from 'stats.js';

// 3D引擎
export class Engine {
  container: HTMLElement;
  // 画布宽度
  width: number;
  // 画布高度
  height: number;
  // 场景
  scene: THREE.Scene;
  // 渲染器
  renderer: THREE.WebGLRenderer;
  // 透视相机
  camera: THREE.PerspectiveCamera;
  // 平行光
  light: THREE.Light | null = null;

  constructor(
    container: HTMLElement, 
    width: number = window.innerWidth, 
    height: number = window.innerHeight
  ) {
    this.container = container;
    
    this.width = width;
    this.height = height;

    this.scene = new THREE.Scene();
    this.camera = this.initCamera({x: 1000, y: 1000, z: 1000});
    this.renderer = this.initRenderer();
    this.light = this.initLight();

    this.container.appendChild(this.renderer.domElement);

    this.render();

    // this.onEvent();
    this.renderScene();
  }

  render() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    console.log(this.scene);
  }

  // 事件监听
  onEvent() {
    window.addEventListener('resize', this.onResize);
  }

  // 移除事件监听
  offEvent() {
    window.removeEventListener('resize', this.onResize);
  }

  // 当页面调整尺寸时
  onResize() {
    const width = window.innerWidth, height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderScene();
  }

  // 开启性能监控
  openStats() {
    const stats = new Stats();
    this.container.appendChild(stats.dom);
  }

  addAxes(size = 10) {
    console.log('addAxes')
    const axes = new THREE.AxesHelper(size);
    this.scene.add(axes);
  }

  // 渲染场景
  renderScene() {
    requestAnimationFrame(this.renderScene.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  initCamera(
    position: { x: number, y: number; z: number }, 
    { fov, near, far } = { fov: 60, near: 0.1, far: 1000 }
  ): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(fov, this.width / this.height, near, far);

    const { x, y, z } = position;
    camera.position.set(x, y, z);
    camera.lookAt(this.scene.position);

    return camera;
  }

  initRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.width, this.height);
    renderer.setClearColor(0xffffff, 0);
    renderer.outputEncoding = THREE.sRGBEncoding;

    return renderer;
  }

  initLight(): THREE.Light {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-1000, 1000, 1000);
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.castShadow = true;

    this.scene.add(directionalLight);

    return directionalLight;
  }
}