import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Wall from './wall';
import { Camera, Renderer } from './utils';

export function init() {
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f2f7);

  // 环境光
  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, 0);
  scene.add(directionalLight);

  // 坐标系辅助工具
  const axes = new THREE.AxesHelper(50);
  scene.add(axes);

  // 相机
  const camera = new Camera({ position: { x: 100, y: 100, z: 100 }, lookAt: scene.position })
    .camera;

  // 渲染器
  const renderer = new Renderer(window.innerWidth, window.innerHeight).renderer;

  new OrbitControls(camera, renderer.domElement);
  document.getElementById('webgl-output')?.appendChild(renderer.domElement);

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
  wall2.position.set(0, 25, 25);
  wall2.rotation.y += 0.5 * Math.PI;
  scene.add(wall2);

  render();

  function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  }
}
