import * as THREE from 'three';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

// 创建基本场景和物体
export const init = () => {
  console.log('init');

  // 创建场景
  const scene = new THREE.Scene();
  // 相机
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  // 渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 坐标轴
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // 创建平面
  const planeGemoetry = new THREE.PlaneGeometry(60, 20);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa,
  });
  const plane = new THREE.Mesh(planeGemoetry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  scene.add(plane);

  // 创建立方体
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true, // 物体内线框
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(-4, 3, 0);
  scene.add(cube);

  // 创建球体
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x7777ff,
    wireframe: true,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(20, 4, 2);
  scene.add(sphere);

  // 摄像机位置
  camera.position.set(-30, 40, 30);
  // 摄像机指向场景中心 默认(0, 0, 0)
  camera.lookAt(scene.position);

  document.getElementById('webgl-output')?.appendChild(renderer.domElement);

  renderer.render(scene, camera);
};
