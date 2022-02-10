import * as THREE from 'three';
// 组合网格
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initCamera, initRenderer, initLight } from './utils';
import Floor from './floor';

export function init() {
  const container = document.getElementById('webgl-output') as HTMLElement;
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f2f7);

  const stats = new Stats();
  container.appendChild(stats.dom);

  initLight(scene);

  // 坐标系辅助工具
  const axes = new THREE.AxesHelper(100);
  scene.add(axes);

  // 相机
  const camera = initCamera({ position: { x: 100, y: 100, z: 100 }, lookAt: scene.position });

  // 渲染器
  const renderer = initRenderer(window.innerWidth, window.innerHeight);

  new OrbitControls(camera, renderer.domElement);
  container.appendChild(renderer.domElement);

  new Floor({
    scene,
    floors: [
      {
        width: 50,
        height: 10,
        depth: 50,
      },
      {
        width: 50,
        height: 10,
        depth: 50,
      },
    ],
  });

  render();

  function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  }
}
