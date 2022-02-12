import * as THREE from 'three';
import { BuildingConfig } from './types';
import Floor from './floor';

export default class Building {
  config: BuildingConfig;

  constructor(config: BuildingConfig) {
    this.config = config;
    this.init();
  }

  init() {
    const buildingScene = new THREE.Group();
    let floorHeight = 0;

    const { floors, scene } = this.config;

    const storeyMeshList = floors.map((f, i) => {
      const floor = new Floor(buildingScene, f, i).floor;

      return floor;
      // return floor.create(f, i);
    });

    storeyMeshList.forEach((s, i) => {
      buildingScene.add(s);

      const y = floorHeight + floors[i].height / 2;
      floorHeight += floors[i].height;
      s.position.set(0, y, 0);
    });

    const light = new THREE.AmbientLight(0x111111);
    scene.add(light);

    scene.add(buildingScene);
  }
}
