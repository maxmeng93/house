import * as THREE from 'three';
import { Engine } from './engine';
import type { IPoint } from './types';

const COLOR_ARR = ['#0465BD', '#357bcb', '#3a7abd'];

export class Map extends Engine {
  // 标记点
  points: IPoint[] = [];
  // 墨卡托投影转换方法
  projection: Function;
  
  constructor(canvas: HTMLElement, projection: Function, width?: number, height?: number ) {
    super(canvas, width, height);
    this.projection = projection;
  }

  /**
   * 渲染地图
   * @param data 符合 GeoJSON 标准的数据 
   */
  renderMap(data: GeoJSON.FeatureCollection) {
    data.features.forEach((feature: GeoJSON.Feature, index: number) => {
      const group = new THREE.Group();
      const { geometry } = feature;
      //@ts-ignore
      const { coordinates, type } = geometry;

      if (type === 'MultiPolygon') {
        coordinates.forEach((multiPolygon: any) => {
          multiPolygon.forEach((polygon: any) => {
            this.drawShape(group, polygon);
            this.drawLine(group, polygon);
          });
        });
      } else if (type === 'Polygon') {
        coordinates.forEach((polygon: any) => {
          this.drawShape(group, polygon);
          this.drawLine(group, polygon);
        });
      } else {
        console.warn(`第${index + 1}项数据，type 应该是 "MultiPolygon"、"Polygon" 之一。`);
      }
      this.scene.add(group);
    });

  }

  // 绘制2D形状
  private drawShape(group: THREE.Group, polygon: any) {
    const shape = new THREE.Shape();

    for (let i = 0; i < polygon.length; i++) {
      let [x, y] = this.projection(polygon[i]) as [number, number];
      if (i === 0) {
        shape.moveTo(x, -y);
      }
      shape.lineTo(x, -y);
    }

    this.extrudeGeometry(group, shape);
  }

  // 将2D形状拉伸为3D几何体
  private extrudeGeometry(group: THREE.Group, shape: any) {
    const color = COLOR_ARR[0];

    const extrudeSettings = {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelThickness: 0.2,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const material = new THREE.MeshStandardMaterial({
      metalness: 1,
      color: color,
    });
    const material1 = new THREE.MeshStandardMaterial({
      metalness: 1,
      roughness: 1,
      color: color,
    });

    const mesh = new THREE.Mesh(geometry, [material, material1]);

    group.add(mesh);
  }

  private drawLine(group: THREE.Group, polygon: any) {
    const color = COLOR_ARR[1];
    const lineGeometry = new THREE.BufferGeometry()
    const pointsArray: any = [];
    polygon.forEach((row: [number, number]) => {
      const [x, y] = this.projection(row)
      pointsArray.push(new THREE.Vector3(x, -y, 1.2))
    });
    lineGeometry.setFromPoints(pointsArray)

    const lineMaterial = new THREE.LineBasicMaterial({
      color: color
    });

    const line = new THREE.Line(lineGeometry, lineMaterial);
    group.add(line);

    return line;
  }
}
