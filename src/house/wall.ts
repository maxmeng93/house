import * as THREE from 'three';

interface WallConfig {
  /** 材质颜色 */
  color: THREE.ColorRepresentation;
  /** 墙体厚度 */
  depth: number;
  /** 材质 */
  material?: THREE.Material;
}

interface WallCreate {
  box: {
    width: number;
    height: number;
    depth?: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
}

export default class Wall {
  config;
  list: THREE.Mesh[] = [];

  constructor(config: WallConfig) {
    this.config = config;
  }

  create({ position, box }: WallCreate): THREE.Mesh {
    const { color, depth: defaultDepth } = this.config;
    const { width, height, depth = defaultDepth } = box;
    const { x, y, z } = position;

    const texture = new THREE.TextureLoader().load('/img/Bricks074_1K_Color.jpg');

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    // const material = new THREE.MeshBasicMaterial({ color: color, wireframe: false });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(x, y, z);

    this.list.push(cube);
    return cube;
  }
}
