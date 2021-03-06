import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 3D引擎
export class Engine {
  // 画布容器
  container: HTMLElement;
  canvas: HTMLElement;
  // 固定尺寸时不执行onResize方法
  fixed: Boolean = false;
  // 画布宽度
  width: number;
  // 画布高度
  height: number;
  // 场景
  scene: THREE.Scene;
  // 渲染器
  renderer: THREE.WebGLRenderer;
  rendererDom: HTMLElement | null = null;
  // 透视相机
  camera: THREE.PerspectiveCamera;
  // 平行光
  light: THREE.Light | null = null;
  // 轨道控制器
  orbitControls!: OrbitControls;

  constructor(canvas: HTMLElement, width?: number, height?: number) {
    this.container = canvas.parentElement as HTMLElement;
    this.canvas = canvas;
    
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;

    if (width && height) {
      this.fixed = true;
    }

    this.scene = new THREE.Scene();
    this.camera = this.initCamera({x: 0, y: 0, z: 120});
    this.renderer = this.initRenderer();
    this.light = this.initLight();

    this.onEvent();
    this.renderScene();
  }

  // 事件监听
  onEvent() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  // 移除事件监听
  offEvent() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  // 当页面调整尺寸时
  onResize() {
    if (this.fixed) return;
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

  // 添加参考线
  addAxes(size = 30) {
    const axes = new THREE.AxesHelper(size);
    this.scene.add(axes);
    return axes;
  }

  // 添加鼠标控制器
  addOrbitControls(): OrbitControls {
    const orbitControls = new OrbitControls(this.camera, this.renderer.domElement);

    // 锁定x轴旋转角度
    // controls.minPolarAngle = 0;
    // controls.maxPolarAngle = Math.PI/2;
    this.orbitControls = orbitControls;

    return orbitControls;
  }

  // 渲染场景
  renderScene() {
    requestAnimationFrame(this.renderScene.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  initCamera(
    position: { x: number, y: number; z: number }, 
    { fov, near, far } = { fov: 45, near: 0.1, far: 1000 }
  ): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(fov, this.width / this.height, near, far);

    const { x, y, z } = position;
    camera.position.set(x, y, z);
    camera.lookAt(this.scene.position);

    return camera;
  }

  initRenderer() {
    const renderer = new THREE.WebGLRenderer({canvas: this.canvas});
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