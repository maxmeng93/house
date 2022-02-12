import * as THREE from 'three';
import { BuildingConfig } from './types';
import Floor from './floor';

export default class Building {
  config: BuildingConfig;
  // 大楼高度
  height = 0;

  constructor(config: BuildingConfig) {
    this.config = config;
    this.init();
  }

  init() {
    const group = new THREE.Group();

    const { scene, floors, number } = this.config;

    const arr = number && number > 0 ? new Array(number).fill(floors[0]) : floors;

    arr.map((f, i) => {
      const y = this.height + f.height / 2;
      this.height += f.height;

      const floor = new Floor(group, { ...f, y }, i).floor;

      return floor;
    });

    const light = new THREE.AmbientLight(0x111111);
    scene.add(light);

    scene.add(group);
  }
}
