import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

interface FloorConfig {
  // 长x
  width: number;
  // 宽y
  height: number;
  // 高z
  depth: number;
}

interface Config {
  // 场景
  scene: THREE.Scene;
  // 楼层
  number?: number;
  // 配置
  floors: FloorConfig[];
}

export default class Floor {
  config;

  constructor(config: Config) {
    this.config = config;
    this.init();
  }

  init() {
    const floorScene = new THREE.Object3D();
    let floorHeight = 0;

    const { floors, scene } = this.config;

    floors.forEach((f, i) => {
      this.storey(f);
    });

    const storeyMeshList = floors.map((f) => this.storey(f));

    storeyMeshList.forEach((s, i) => {
      floorScene.add(s);

      const y = floorHeight + floors[i].height / 2;
      floorHeight += floors[i].height;

      s.position.set(0, y, 0);

      s.castShadow = true;
    });

    scene.add(floorScene);
  }

  storey(storeyConfig: FloorConfig): THREE.Mesh {
    const { width, height, depth } = storeyConfig;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const boxMesh = new THREE.Mesh(geometry);
    boxMesh.updateMatrix();

    const cutBox = boxMesh.clone();
    cutBox.scale.multiplyScalar(0.9);
    cutBox.updateMatrix();

    const emptyCube = CSG.subtract(boxMesh, cutBox);
    var material = new THREE.MeshLambertMaterial({
      color: 0xdadada,
      side: THREE.DoubleSide,
      // wireframe: true,
    });
    emptyCube.material = material;

    return emptyCube;
  }
}
