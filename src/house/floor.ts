import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { initAxes } from './utils';
import skyPanoImg from './sky-dome-panorma.jpg';
// import textureImg from './img/Bricks074_1K_Color.jpg';

interface FloorConfig {
  /** 长x */
  width: number;
  /** 高y */
  height: number;
  /** 宽z */
  depth: number;
  /** 墙体厚度 */
  thickness?: number;
}

interface Config {
  /** 父对象 */
  scene: THREE.Scene | THREE.Object3D | THREE.Group;
  /** 楼层数量 */
  number?: number;
  /** 楼层配置 */
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

    const storeyMeshList = floors.map((f, i) => this.createStorey(f, i));

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

  // 楼层
  createStorey(storeyConfig: FloorConfig, index: number): THREE.Group {
    const group = new THREE.Group();

    initAxes(group, 20);

    const { width, height, depth } = storeyConfig;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const boxMesh = new THREE.Mesh(geometry);
    boxMesh.updateMatrix();

    const cutBox = boxMesh.clone();
    cutBox.scale.multiplyScalar(0.9);
    cutBox.updateMatrix();

    let emptyCube = CSG.subtract(boxMesh, cutBox);
    emptyCube = this.cutWindow(emptyCube);
    if (index === 0) emptyCube = this.cutDoor(emptyCube);

    this.createWindow(group);

    // 纹理
    // const texture = new THREE.TextureLoader().load(textureImg);
    emptyCube.material = new THREE.MeshLambertMaterial({
      color: 0xdadada,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      // map: texture,
      // wireframe: true,
    });

    group.add(emptyCube);

    return group;
  }

  // 切出窗洞
  cutWindow(cube: THREE.Mesh) {
    const windowgeo = new THREE.BoxGeometry(5, 5, 5);
    windowgeo.applyMatrix4(new THREE.Matrix4().makeTranslation(25, 0, 0));
    let window = new THREE.Mesh(windowgeo);
    window.updateMatrix();
    return CSG.subtract(cube, window);
  }

  // 窗户
  createWindow(scene: THREE.Group) {
    var material = new THREE.MeshLambertMaterial({
      color: 0xff1111,
      wireframe: false,
    });

    const windowgeo = new THREE.BoxGeometry(2, 5, 5);
    const window = new THREE.Mesh(windowgeo, material.clone());

    new THREE.TextureLoader().load(skyPanoImg, function (texture) {
      const materialclone = material.clone();
      materialclone.map = texture;
      window.material = materialclone;

      window.material.opacity = 0.4;
      window.material.transparent = true;
      texture.mapping = THREE.EquirectangularReflectionMapping;
    });

    window.position.set(24, 0, 0);
    scene.add(window);
  }

  // 切出门洞
  cutDoor(cube: THREE.Mesh) {
    const doorgeo = new THREE.BoxGeometry(5, 8, 5);
    doorgeo.applyMatrix4(new THREE.Matrix4().makeTranslation(25, 0, -20));
    const door = new THREE.Mesh(doorgeo);
    door.updateMatrix();
    return CSG.subtract(cube, door);
  }
}
