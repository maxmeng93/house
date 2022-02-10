import * as THREE from 'three';

interface Config {
  position: {
    x: number;
    y: number;
    z: number;
  };
  lookAt: THREE.Vector3;
}

// 透视相机
export class Camera {
  camera: THREE.Camera;

  constructor({ position, lookAt }: Config) {
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const { x, y, z } = position;
    camera.position.set(x, y, z);
    camera.lookAt(lookAt);

    this.camera = camera;
  }
}

export function initCamera({ position, lookAt }: Config) {
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

  const { x, y, z } = position;
  camera.position.set(x, y, z);
  camera.lookAt(lookAt);

  return camera;
}

// 渲染器
export function initRenderer(width: number, height: number) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  return renderer;
}

// 灯光
export function initLight(scene: THREE.Scene) {
  // 环境光
  const light = new THREE.AmbientLight(0x111111);
  scene.add(light);

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(100, 100, 100);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(-100, 100, -100);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  scene.add(pointLight);
}
