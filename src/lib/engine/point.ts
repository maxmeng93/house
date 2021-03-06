import * as THREE from 'three';
import { PointType } from './types';

export class Point {
  points: any[] = [];
  readonly type: PointType;
  // 墨卡托投影转换
  readonly projection!: Function;
  // 相机
  readonly camera;
  width;
  height;

  constructor(camera: THREE.Camera, projection: Function, width: number, height: number, type: PointType = 'normal') {
    this.camera = camera;
    this.projection = projection;
    this.type = type;
    this.width = width;
    this.height = height;
  }

  public setPoints(data: any[]) {
    if (this.type === 'map') {
      return this.setMapPoints(data);
    } else {
      return this.setNormalPoints(data);
    }
  }

  // 设置地图点
  private setMapPoints(data: any[]) {

    const d = data.map(item => {
      const arr = this.projection([item.long, item.lat]);
      if (arr) return {...item, x: arr[0], y: -arr[1]};
      return { ...item };
    });

    return this.setNormalPoints(d);
  }

  // 设置普通点
  private setNormalPoints(data: any[]) {
    const arr = data.map(item => {
      const { x, y, z = 1 } = item;
      const worldPosition = new THREE.Vector3(x, y, z);
  
      const standardVector = worldPosition.project(this.camera);

      console.log('x,y,z', x, y, z);
      console.log('camera', this.camera);
      console.log('standardVector', standardVector)
  
      const a = this.width / 2;
      const b = this.height / 2;

      const left = Math.round(standardVector.x * a + a);
      const top = Math.round(-standardVector.y * b + b);

      return {...item, left, top };
    });

    this.points = arr;

    return arr;
  }

  // 更新点位
  public update(width: number, height: number) {
    this.width = width;
    this.height = height;
    return this.setNormalPoints(this.points);
  }
}