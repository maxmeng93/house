import * as THREE from 'three';
import { initStats } from './util';

// 简单动画
export const init = () => {
  // 统计
  const stats = initStats();

  // 创建场景
  const scene = new THREE.Scene();
  // 相机
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  // 渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 开启阴影渲染
  renderer.shadowMap.enabled = true;

  // 坐标轴
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // 创建平面
  const planeGemoetry = new THREE.PlaneGeometry(60, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  const plane = new THREE.Mesh(planeGemoetry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  plane.receiveShadow = true;
  scene.add(plane);

  // 创建立方体
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(-4, 3, 0);
  cube.castShadow = true;
  scene.add(cube);

  // 创建球体
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(20, 4, 2);
  sphere.castShadow = true;
  scene.add(sphere);

  // 创建光源
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 40, -15);
  // 显示阴影
  spotLight.castShadow = true;
  // 阴影参数
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;
  scene.add(spotLight);

  // 摄像机位置
  camera.position.set(-30, 40, 30);
  // 摄像机指向场景中心 默认(0, 0, 0)
  camera.lookAt(scene.position);

  document.getElementById('webgl-output')?.appendChild(renderer.domElement);

  let step = 0;
  function renderScene() {
    stats.update();

    // 立方体旋转
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    // 球体跳动
    step += 0.04;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }

  renderScene();
};
