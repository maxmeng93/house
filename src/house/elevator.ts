import * as THREE from 'three';
import type { ElevatorConfig } from './types';

export default class Elevator {
  config: ElevatorConfig;
  group: THREE.Group;

  constructor(scene: THREE.Group, config: ElevatorConfig) {
    this.config = config;
    this.group = new THREE.Group();
    this.init();

    scene.add(this.group);
  }

  init() {
    const { width, height, depth, start, end, x, z } = this.config;
    const h = height * (end - start + 1);
    const geo = new THREE.BoxGeometry(width, h, depth);
    const material = new THREE.MeshLambertMaterial({
      color: 0xffeeee,
      transparent: true,
      opacity: 0.5,
    });
    const mesh = new THREE.Mesh(geo, material);

    mesh.position.x = x;
    mesh.position.y = height * (start - 1) + h / 2;
    mesh.position.z = z;

    // 添加边缘线条
    const material2 = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1,
      linecap: 'round',
      linejoin: 'round',
    });
    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(edges, material2);
    line.position.x = x;
    line.position.y = height * (start - 1) + h / 2;
    line.position.z = z;
    this.group.add(line);

    console.log('geo', geo);

    this.group.add(mesh);
  }
}
