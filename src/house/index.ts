import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function init() {
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f2f7);

  // 坐标系辅助工具
  const axes = new THREE.AxesHelper(50);
  scene.add(axes);

  // 透视相机
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 100;
  camera.lookAt(scene.position);

  // 渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  document.getElementById('webgl-output')?.appendChild(renderer.domElement);

  render();

  function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  }
}
