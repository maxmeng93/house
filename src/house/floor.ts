import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { initAxes } from './utils';
import skyPanoImg from './img/sky-dome-panorma.jpg';
// import textureImg from './img/Bricks074_1K/Bricks074_1K_Color.jpg';
import wallImg from './img/Bricks066_1K/Bricks066_1K_Color.jpg';

import { FloorConfig } from './types';

export default class Floor {
  config: FloorConfig;
  group: THREE.Group;
  material: THREE.Material;

  constructor(scene: THREE.Group, config: FloorConfig, index: number) {
    this.config = config;
    this.group = new THREE.Group();

    // 初始化材质
    this.material = this.initMaterial();
    this.createFloor(config, index);

    scene.add(this.group);
  }

  initMaterial(config?: { color?: number; x?: number; y?: number }) {
    const color = config?.color || 0xffffff;
    const x = config?.x || 1;
    const y = config?.y || 1;

    const wireframe = false;
    const transparent = false;
    const opacity = 0.5;
    const texture = new THREE.TextureLoader().load(wallImg);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(x, y);

    return new THREE.MeshLambertMaterial({
      color: color,
      wireframe,
      transparent,
      opacity,
      map: texture,
      side: THREE.DoubleSide,
    });
  }

  createFloor(config: FloorConfig, index: number) {
    const group = this.group;

    const { width, height, depth, thickness, x, y, z } = config;

    if (x) group.position.x = x;
    if (y) group.position.y = y;
    if (z) group.position.z = z;

    this.createWall(group);
    this.createCeiling(group);
    this.createGround(group);
  }

  // 创建地面
  createGround(floorScene: THREE.Group) {
    const { width, height, depth } = this.config;
    const material = this.initMaterial({ x: 5, y: 5 });

    const groundGeo = new THREE.PlaneGeometry(width, depth);
    const ground = new THREE.Mesh(groundGeo, material);
    ground.rotateX(0.5 * Math.PI);
    ground.position.set(0, -height / 2, 0);
    floorScene.add(ground);
  }

  // 创建天花板
  createCeiling(floorScene: THREE.Group) {
    const { width, height, depth } = this.config;
    const material = this.initMaterial({ x: 5, y: 5 });

    const topGeo = new THREE.PlaneGeometry(width, depth);
    const top = new THREE.Mesh(topGeo, material);
    top.rotateX(0.5 * Math.PI);
    top.position.set(0, height / 2, 0);
    floorScene.add(top);
  }

  // 4面墙、地板、天花板
  createWall(floorScene: THREE.Group) {
    const { width, height, depth, thickness } = this.config;
    const offsetW = width / 2 - thickness / 2;
    const offsetD = depth / 2 - thickness / 2;

    const material = this.initMaterial({ x: 5, y: 1 });

    // 后
    const wall1Geo = new THREE.BoxGeometry(width, height, thickness);
    const wall1 = new THREE.Mesh(wall1Geo, material);
    wall1.position.set(0, 0, -offsetD);
    floorScene.add(wall1);

    // 前
    const wall2 = wall1.clone();
    wall2.position.set(0, 0, offsetD);
    floorScene.add(wall2);

    // 左
    const wall3geo = new THREE.BoxGeometry(depth, height, thickness);
    const wall3 = new THREE.Mesh(wall3geo, material);
    wall3.rotateY(0.5 * Math.PI);
    wall3.position.set(-offsetW, 0, 0);
    floorScene.add(wall3);

    // 右
    const wall4 = wall3.clone();
    wall4.position.set(offsetW, 0, 0);
    floorScene.add(wall4);
  }

  // 外墙
  outWall(group: THREE.Group, floorConfig: FloorConfig) {
    const { width, height } = floorConfig;

    const wallGeo = new THREE.PlaneGeometry(width, height);

    const texture = new THREE.TextureLoader().load(wallImg);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(15, 3);
    const wallMaterial = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: texture,
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
