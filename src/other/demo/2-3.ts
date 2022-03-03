import * as THREE from 'three';
import { initStats, initTrackballControls } from './util';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// 加载模型
export function init() {
  const stats = initStats();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

  const renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, 0, 0);
  scene.add(plane);

  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  // 环境光
  const ambientLight = new THREE.AmbientLight(0x3c3c3c);
  scene.add(ambientLight);

  // 聚光灯
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(100, 1000, 10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const loader = new GLTFLoader();
  loader.load(
    '/models/misc_chair01.gltf',
    function (gltf) {
      console.log('模型', gltf);
      const mesh = gltf.scene;
      mesh.castShadow = true;
      mesh.scale.set(5, 5, 5);
      scene.add(gltf.scene);
    },
    function (xhr) {
      console.log(xhr);
    },
    function (error) {
      console.log('error:', error);
    }
  );

  document.getElementById('webgl-output')?.appendChild(renderer.domElement);

  const trackballControls = initTrackballControls(camera, renderer);

  render();

  function render() {
    trackballControls.update();
    stats.update();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
