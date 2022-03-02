import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initCamera, initRenderer, initLight, initAxes } from '../utils';
import geoJson from './china.json';

function initMap (chinaJson: any) {
  console.log(chinaJson);
}

export function init() {
  const container = document.getElementById('webgl-output') as HTMLElement;
  // 场景
  const scene = new THREE.Scene();
  scene.background = null;

  const stats = new Stats();
  container.appendChild(stats.dom);

  initLight(scene);

  initAxes(scene, 100);

  initMap(geoJson);

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