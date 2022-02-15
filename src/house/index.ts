import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initCamera, initRenderer, initLight, initAxes } from './utils';
import Building from './building';

export function init() {
  const container = document.getElementById('webgl-output') as HTMLElement;
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f2f7);

  const stats = new Stats();
  container.appendChild(stats.dom);

  initLight(scene);

  initAxes(scene, 100);

  // 相机
  const camera = initCamera({ position: { x: 100, y: 100, z: 100 }, lookAt: scene.position });

  // 渲染器
  const renderer = initRenderer(window.innerWidth, window.innerHeight);

  new OrbitControls(camera, renderer.domElement);
  container.appendChild(renderer.domElement);

  new Building(scene, {
    number: 1,
    floor: [
      {
        width: 50,
        height: 10,
        depth: 50,
        thickness: 0.5,
      },
      {
        width: 50,
        height: 10,
        depth: 50,
        thickness: 0.5,
      },
    ],
    elevator: [
      {
        start: 1,
        end: 2,
        width: 8,
        height: 10,
        depth: 8,
        x: 10,
        z: -10,
      },
      {
        start: 2,
        end: 3,
        width: 8,
        height: 10,
        depth: 8,
        x: -10,
        z: -10,
      },
    ],
  });

  render();

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
