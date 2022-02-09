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

// 渲染器
export class Renderer {
  renderer: THREE.WebGLRenderer;

  constructor(width: number, height: number) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    this.renderer = renderer;
  }
}
