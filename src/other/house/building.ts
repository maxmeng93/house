import * as THREE from 'three';
import { BuildingConfig } from './types';
import Floor from './floor';
import Elevator from './elevator';

export default class Building {
  config: BuildingConfig;
  // 建筑物组
  group: THREE.Group;
  // 大楼高度
  height = 0;
  // 楼层组列表
  floorList: THREE.Group[] = [];
  // 电梯组列表
  elevatorList: THREE.Group[] = [];

  constructor(scene: THREE.Scene, config: BuildingConfig) {
    this.config = config;
    this.group = new THREE.Group();

    this.createElevator();
    this.createFloor();

    scene.add(this.group);
  }

  // 创建楼层
  createFloor() {
    const { floor, number } = this.config;

    const arr = number && number > 0 ? new Array(number).fill(floor[0]) : floor;

    this.floorList = arr.map((f, i) => {
      const y = this.height + f.height / 2;
      this.height += f.height;

      return new Floor(this.group, { ...f, y }, i).group;
    });
  }

  // 创建电梯
  createElevator() {
    const { elevator = [] } = this.config;

    this.elevatorList = elevator.map((item) => {
      return new Elevator(this.group, item).group;
    });
  }
}
