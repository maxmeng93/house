import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { initAxes } from './utils';
import skyPanoImg from './img/sky-dome-panorma.jpg';
// import textureImg from './img/Bricks074_1K/Bricks074_1K_Color.jpg';
import wallImg from './img/Bricks066_1K/Bricks066_1K_Color.jpg';

import { FloorConfig } from './types';

export default class Floor {
  floor: THREE.Group;

  constructor(scene: THREE.Group, storeyConfig: FloorConfig, index: number) {
    this.floor = this.createFloor(scene, storeyConfig, index);
  }

  // 楼层
  createFloor(scene: THREE.Group, storeyConfig: FloorConfig, index: number): THREE.Group {
    const floorGroup = new THREE.Group();

    if (index === 0) initAxes(floorGroup, 20);

    const { width, height, depth, thickness } = storeyConfig;

    const outGeo = new THREE.BoxGeometry(width, height, depth);
    console.log(outGeo);
    const outMesh = new THREE.Mesh(outGeo);
    console.log(outMesh);
    outMesh.updateMatrix();

    const innerWidth = width - 2 * thickness;
    const innerHeight = height - 2 * thickness;
    const innerDepth = depth - 2 * thickness;
    const innerGeo = new THREE.BoxGeometry(innerWidth, innerHeight, innerDepth);
    const innerMesh = new THREE.Mesh(innerGeo);
    innerMesh.updateMatrix();

    this.outWall(floorGroup, storeyConfig);

    let emptyCube = CSG.subtract(outMesh, innerMesh);
    emptyCube = this.cutWindow(emptyCube);
    if (index === 0) emptyCube = this.cutDoor(emptyCube);

    this.createWindow(floorGroup);

    // emptyCube.material = new THREE.MeshBasicMaterial({ color: 0xbbded6 });

    // 纹理
    // const texture = new THREE.TextureLoader().load(wallImg);
    emptyCube.material = new THREE.MeshLambertMaterial({
      // 背景色
      color: 0xffffff,
      // 自发光
      emissive: 0xbbded6,
      transparent: true,
      opacity: 0.5,
      // map: texture,
      // wireframe: true,
      // side: THREE.DoubleSide,
    });

    floorGroup.add(emptyCube);

    // 将楼层添加到建筑(父场景)中
    scene.add(floorGroup);

    return floorGroup;
  }

  // 外墙
  outWall(group: THREE.Group, storeyConfig: FloorConfig) {
    const { width, height } = storeyConfig;

    const wallGeo = new THREE.PlaneGeometry(width, height);

    const wallTexture = new THREE.TextureLoader().load(wallImg);
    const wallMaterial = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: wallTexture,
    });

    const plane = new THREE.Mesh(wallGeo, wallMaterial);
    plane.position.set(0, 0, 25.05);

    group.add(plane);
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
