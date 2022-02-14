import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { initAxes } from './utils';
import skyPanoImg from './img/sky-dome-panorma.jpg';
// import textureImg from './img/Bricks074_1K/Bricks074_1K_Color.jpg';
import wallImg from './img/Bricks066_1K/Bricks066_1K_Color.jpg';

import { FloorConfig } from './types';

export default class Floor {
  floor: THREE.Group;
  config: FloorConfig;

  constructor(scene: THREE.Group, config: FloorConfig, index: number) {
    this.config = config;
    this.floor = this.createFloor(scene, config, index);
  }

  createFloor1(scene: THREE.Group, config: FloorConfig, index: number): THREE.Group {
    const group = new THREE.Group();

    const { width, height, depth, thickness, x, y, z } = config;

    if (x) group.position.x = x;
    if (y) group.position.y = y;
    if (z) group.position.z = z;

    this.createWall(group);

    scene.add(group);

    return group;
  }

  // 楼层
  createFloor(scene: THREE.Group, config: FloorConfig, index: number): THREE.Group {
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

    this.outWall(group, config);

    let emptyCube = CSG.subtract(outMesh, innerMesh);
    emptyCube = this.cutWindow(emptyCube);
    if (index === 0) emptyCube = this.cutDoor(emptyCube);

    // this.createWindow(group);

    // emptyCube.material = new THREE.MeshBasicMaterial({ color: 0xbbded6 });

    // 纹理
    // const texture = new THREE.TextureLoader().load(wallImg);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(1, 5);

    emptyCube.material = new THREE.MeshLambertMaterial({
      // 背景色
      color: 0xbbded6,
      // transparent: true,
      // opacity: 0.5,
      // map: texture,
      // wireframe: true,
      // side: THREE.DoubleSide,
    });

    group.add(emptyCube);

    // 将楼层添加到建筑(父场景)中
    scene.add(group);

    console.log('emptyCube', emptyCube);

    return group;
  }

  // 4面墙、地板、天花板
  createWall(floorScene: THREE.Group) {
    const { width, height, depth, thickness } = this.config;
    const offsetW = width / 2 - thickness / 2;
    const offsetD = depth / 2 - thickness / 2;

    const color = 0xffffff;
    const wireframe = false;
    const transparent = true;
    const opacity = 0.5;

    const texture = new THREE.TextureLoader().load(wallImg);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 5);

    const texture2 = texture.clone();
    texture2.repeat.set(5, 2);

    const material1 = new THREE.MeshLambertMaterial({
      color: color || 0xbbded6,
      wireframe,
      transparent,
      opacity,
      side: THREE.DoubleSide,
      map: texture,
    });
    const material2 = new THREE.MeshLambertMaterial({
      color: color || 0xffffff,
      wireframe,
      transparent,
      opacity,
      map: texture,
    });
    const material3 = new THREE.MeshLambertMaterial({
      color: color || 0xff0000,
      wireframe,
      transparent,
      opacity,
      map: texture,
    });
    const material = [material1, material2, material3, material1, material2, material3];

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

    // 顶
    const topGeo = new THREE.PlaneGeometry(width, depth);
    const top = new THREE.Mesh(topGeo, material[0]);
    top.rotateX(0.5 * Math.PI);
    top.position.set(0, height / 2, 0);
    floorScene.add(top);

    // 底
    const bottom = top.clone();
    bottom.position.set(0, -height / 2, 0);
    floorScene.add(bottom);
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
