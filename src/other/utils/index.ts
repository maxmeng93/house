import * as THREE from 'three';
import Stats from 'stats.js';

// 坐标轴
export function initAxes(group: THREE.Group | THREE.Scene, size?: number) {
  const axes = new THREE.AxesHelper(size);
  group.add(axes);
}

// 透视相机
export function initCamera({
  position,
  lookAt,
  near = 0.1,
  far = 1000
}: {
  position: {
    x: number;
    y: number;
    z: number;
  };
  lookAt: THREE.Vector3;
  near?: number;
  far?: number;
}) {
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, near, far);

  const { x, y, z } = position;
  camera.position.set(x, y, z);
  camera.lookAt(lookAt);

  return camera;
}

// 渲染器
export function initRenderer(width: number, height: number) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  // renderer.setClearColor('#000');

  return renderer;
}

// 灯光
export function initLight(scene: THREE.Scene) {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.position.set(0, 0, 0);
  scene.add(ambientLight);

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-1000, 1000, 1000);
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // const pointLight = new THREE.PointLight(0xffffff, 0.5);
  // pointLight.position.set(-100, 100, -100);
  // pointLight.castShadow = true;
  // pointLight.shadow.mapSize.width = 1024;
  // pointLight.shadow.mapSize.height = 1024;
  // scene.add(pointLight);

  return {
    ambientLight,
    directionalLight,
  };
}

/**
 * 初始化性能监控器
 * @param container 
 */
export function initStats(container: HTMLElement) {
  const stats = new Stats();
  container.appendChild(stats.dom);
}