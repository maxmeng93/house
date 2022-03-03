import * as THREE from 'three';
import * as d3 from 'd3';
import { Engine } from './engine';

const COLOR_ARR = ['#0465BD', '#357bcb', '#3a7abd'];

// 墨卡托投影转换
const projection = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);

export class Map extends Engine {
  constructor(container: HTMLElement, width = window.innerWidth, height = window.innerHeight) {
    super(container, width, height);

  }

  /**
   * 渲染地图
   * @param data 符合 GeoJSON 标准的数据 
   */
  renderMap(data: GeoJSON.FeatureCollection) {
    data.features.forEach((feature: GeoJSON.Feature, index: number) => {
      const group = new THREE.Group();
      const { geometry, properties } = feature;
      //@ts-ignore
      const { coordinates, type } = geometry;

      if (type === 'MultiPolygon') {

        coordinates.forEach((multiPolygon: any) => {
          multiPolygon.forEach((polygon: any) => {
            this.drawShape(group, polygon, index);
          });
        });
        
      } else if (type === 'Polygon') {

        coordinates.forEach((polygon: any) => {
          this.drawShape(group, polygon, index);
        });

      } else {

        console.warn(`第${index + 1}项数据，type 应该是 "MultiPolygon"、"Polygon" 之一。`);
      
      }
      this.scene.add(group);
    });

  }

  // 绘制形状
  private drawShape(group: THREE.Group, polygon: any, index: number) {

    const shape = new THREE.Shape();
    for (let i = 0; i < polygon.length; i++) {
      let [x, y] = projection(polygon[i]) as [number, number];
      if (i === 0) {
        shape.moveTo(x, -y);
      }
      shape.lineTo(x, -y);
    }

    this.extrudeGeometry(group, shape, index);
  }

  // 将2D形状拉伸为3D几何体
  private extrudeGeometry(group: THREE.Group, shape: any, index: number) {
    const color = COLOR_ARR[index % COLOR_ARR.length];

    const extrudeSettings = {
      depth: 4,
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
    // 设置高度将省区分开来
    if (index % 2 === 0) {
      mesh.scale.set(1, 1, 1.2);
    }

    group.add(mesh);
  }
}
