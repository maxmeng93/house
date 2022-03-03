import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { initAxes } from '../../utils';
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
    // this.createFloor1(scene, config, index);

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

  // 楼层
  createFloor1(scene: THREE.Group, config: FloorConfig, index: number): THREE.Group {
    const { width, height, depth, thickness, x, y, z } = config;
    const group = new THREE.Group();

    if (x) group.position.x = x;
    if (y) group.position.y = y;
    if (z) group.position.z = z;

    if (index === 0) initAxes(group, 20);

    const outGeo = new THREE.BoxGeometry(width, height, depth);
    const outMesh = new THREE.Mesh(outGeo);
    outMesh.updateMatrix();

    const innerWidth = width - 2 * thickness;
    const innerHeight = height - 2 * thickness;
    const innerDepth = depth - 2 * thickness;
    const innerGeo = new THREE.BoxGeometry(innerWidth, innerHeight, innerDepth);
    const innerMesh = new THREE.Mesh(innerGeo);
    innerMesh.updateMatrix();

    // this.outWall(group, config);

    let emptyCube = CSG.subtract(outMesh, innerMesh);
    emptyCube = this.cutWindow(emptyCube);
    if (index === 0) emptyCube = this.cutDoor(emptyCube);

    // this.createWindow(group);

    // emptyCube.material = new THREE.MeshBasicMaterial({ color: 0xbbded6 });

    // 纹理
    // const texture = new THREE.TextureLoader().load(wallImg);
    // emptyCube.material = new THREE.MeshLambertMaterial({
    //   // 背景色
    //   color: 0xbbded6,
    //   // 自发光
    //   // emissive: 0xbbded6,
    //   // transparent: true,
    //   // opacity: 0.5,
    //   // map: texture,
    //   // wireframe: true,
    //   // side: THREE.DoubleSide,
    // });

    emptyCube.material = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }), // 外 前+后
      new THREE.MeshBasicMaterial({ color: 0xeeeeee }), // 外 顶
      new THREE.MeshBasicMaterial({ color: 0xeeeeee }), // 外 左+右 里 前+后 上+下 左
      new THREE.MeshBasicMaterial({ color: 0xeeeeee }), // 里 右
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    ];

    console.log('emptyCube.geometry', emptyCube.geometry);
    console.log('emptyCube', emptyCube);
    console.log('emptyCube', emptyCube.geometry);

    group.add(emptyCube);

    // 将楼层添加到建筑(父场景)中
    scene.add(group);

    return group;
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
