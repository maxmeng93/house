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
    console.log(data);
    data.features.forEach((feature: GeoJSON.Feature, index: number) => {
      // 省份
      const province = new THREE.Group();
      const { geometry, properties } = feature;
      //@ts-ignore
      const { coordinates, type } = geometry;

      if (type === 'MultiPolygon') {
        coordinates.forEach((multiPolygon: any) => {
          multiPolygon.forEach((polygon: any) => {
            this.drawShape(province, polygon);
          });
        });
        
      } else if (type === 'Polygon') {
        coordinates.forEach((polygon: any) => {
          this.drawShape(province, polygon);
        });
      } else {
        console.warn(`第${index + 1}项数据，type 应该是 "MultiPolygon"、"Polygon" 之一。`);
      }
      console.log(province);
      this.scene.add(province);
    });

  }

  // 绘制形状
  private drawShape(province: THREE.Group, polygon: any) {
    const color = '#0465BD';

    const shape = new THREE.Shape();
    for (let i = 0; i < polygon.length; i++) {
      let [x, y] = projection(polygon[i]) as [number, number];
      if (i === 0) {
        shape.moveTo(x, -y);
      }
      shape.lineTo(x, -y);
    }

    const extrudeSettings = {
      depth: 4,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelThickness: 0.2,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // 平面部分材质
    const material = new THREE.MeshStandardMaterial({
      metalness: 1,
      color: color,
    });
    // 拉高部分材质
    const material1 = new THREE.MeshStandardMaterial({
      metalness: 1,
      roughness: 1,
      color: color,
    });

    const mesh = new THREE.Mesh(geometry, [material, material1]);
    // 设置高度将省区分开来
    // if (index % 2 === 0) {
    //   mesh.scale.set(1, 1, 1.2);
    // }
    // 给mesh开启阴影
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    province.add(mesh);
  }

  // 将2D形状拉伸为3D几何体
  private extrudeGeometry() {

  }
}
