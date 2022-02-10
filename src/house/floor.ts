import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { initLight } from './utils';

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

    // floors.forEach((f, i) => {
    //   this.storey(f, i);
    // });

    const storeyMeshList = floors.map((f, i) => this.storey(f, i));

    storeyMeshList.forEach((s, i) => {
      floorScene.add(s);

      const y = floorHeight + floors[i].height / 2;
      floorHeight += floors[i].height;

      s.position.set(0, y, 0);

      s.castShadow = true;
    });

    const light = new THREE.AmbientLight(0x111111);
    scene.add(light);

    scene.add(floorScene);
  }

  storey(storeyConfig: FloorConfig, index: number): THREE.Mesh {
    const { width, height, depth } = storeyConfig;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const boxMesh = new THREE.Mesh(geometry);
    boxMesh.updateMatrix();

    const cutBox = boxMesh.clone();
    cutBox.scale.multiplyScalar(0.9);
    cutBox.updateMatrix();

    let emptyCube = CSG.subtract(boxMesh, cutBox);

    // 窗
    const windowgeo = new THREE.BoxGeometry(5, 5, 5);
    windowgeo.applyMatrix4(new THREE.Matrix4().makeTranslation(25, 0, 0));
    const window = new THREE.Mesh(windowgeo);
    window.updateMatrix();
    emptyCube = CSG.subtract(emptyCube, window);

    if (index === 0) {
      // 门
      const doorgeo = new THREE.BoxGeometry(5, 8, 5);
      doorgeo.applyMatrix4(new THREE.Matrix4().makeTranslation(25, 0, -20));
      const door = new THREE.Mesh(doorgeo);
      door.updateMatrix();
      emptyCube = CSG.subtract(emptyCube, door);
    }

    var material = new THREE.MeshLambertMaterial({
      color: 0xdadada,
      side: THREE.DoubleSide,
      // wireframe: true,
    });

    emptyCube.material = material;
    return emptyCube;
  }
}
