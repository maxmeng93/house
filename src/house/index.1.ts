import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Wall from './wall';
import { initCamera, initRenderer } from './utils';
const ThreeBSP = require('jthreebsp')(THREE);

export function init() {
  const container = document.getElementById('webgl-output') as HTMLElement;
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f2f7);

  const stats = new Stats();
  container.appendChild(stats.dom);

  // 环境光
  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, 0);
  scene.add(directionalLight);

  // 坐标系辅助工具
  const axes = new THREE.AxesHelper(100);
  scene.add(axes);

  // 相机
  const camera = initCamera({ position: { x: 100, y: 100, z: 100 }, lookAt: scene.position });

  // 渲染器
  const renderer = initRenderer(window.innerWidth, window.innerHeight);

  new OrbitControls(camera, renderer.domElement);
  container.appendChild(renderer.domElement);

  const wall = new Wall({
    color: 0x8ac6d1,
    depth: 2,
  });

  // 新建墙1
  const wall1 = wall.create({
    box: { width: 50, height: 50 },
    position: { x: 25, y: 25, z: 1 },
  });
  scene.add(wall1);

  // 由墙1 clone 墙2
  const wall2 = wall1.clone();
  wall2.position.set(1, 25, 25);
  wall2.rotation.y += 0.5 * Math.PI;
  scene.add(wall2);

  const sphereBSP = new ThreeBSP(wall1);
  const cubeBSP = new ThreeBSP(wall2);
  const resultBSP = sphereBSP.union(cubeBSP);
  const result = resultBSP.toMesh();
  result.geometry.computeFaceNormals();
  result.geometry.computeVertexNormals();
  const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
  result.material = material;
  scene.add(result);

  render();

  function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  }
}
