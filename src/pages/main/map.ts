import * as THREE from 'three';
import Stats from 'stats.js';
import * as d3 from 'd3';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initCamera, initRenderer, initLight, initAxes } from '../../utils';
import geoJson from './china.json';

const COLOR_ARR = ['#0465BD', '#357bcb', '#3a7abd'];

// 墨卡托投影转换
const projection = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);

function operationData(scene: THREE.Scene, chinaJson: any) {
  console.log(chinaJson)
  chinaJson.features.forEach((elem: any, index: number) => {
    // 省份
    const province = new THREE.Object3D();
    const { coordinates, type } = elem.geometry;
    const color = COLOR_ARR[index % COLOR_ARR.length];

    if (type === 'MultiPolygon') {
      // 
    } else if (type === 'Polygon') {
      //
    }
    
    coordinates.forEach((multiPolygon: [number, number][][]) => {
      multiPolygon.forEach((polygon: [number, number][]) => {
        const shape = new THREE.Shape();

        for (let i = 0; i < polygon.length; i++) {
          let [x, y] = projection(polygon[i]) as [number, number];
          if (isNaN(x)) {
            // 内蒙古数据少一层
            // console.log(polygon[i])
            // console.log(elem.geometry)
            // console.log(elem.properties)
            continue;
          }

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
        if (index % 2 === 0) {
          mesh.scale.set(1, 1, 1.2);
        }
        // 给mesh开启阴影
        // mesh.castShadow = true;
        // mesh.receiveShadow = true;
        province.add(mesh);
      });
    });

    scene.add(province);
  });
}

export default function init() {
  const container = document.getElementById('webgl-output') as HTMLElement;
  // 场景
  const scene = new THREE.Scene();
  scene.background = null;

  const stats = new Stats();
  container.appendChild(stats.dom);

  initLight(scene);

  initAxes(scene, 100);

  // 相机
  const camera = initCamera({ position: { x: 100, y: 100, z: 100 }, lookAt: scene.position });

  // 渲染器
  const renderer = initRenderer(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;

  new OrbitControls(camera, renderer.domElement);
  container.appendChild(renderer.domElement);

  // 绘制地图
  operationData(scene, geoJson);

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  });

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
