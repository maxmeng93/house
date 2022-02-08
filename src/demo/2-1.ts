import * as THREE from 'three';
import * as dat from 'dat.gui';
import { initStats, initTrackballControls } from './util';

// 雾化、材质覆盖
export function init() {
  const stats = initStats();

  const scene = new THREE.Scene();
  // 雾化，离摄像机越远越模糊
  scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
  // 指数级雾化
  // scene.fog = new THREE.FogExp2(0xffffff, 0.01);
  // 材质覆盖，场景中对象使用相同材质
  scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
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

  // 聚光灯，产品阴影
  const spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.getElementById('webgl-output')?.appendChild(renderer.domElement);

  class Controls {
    rotationSpeed = 0.02;
    numberOfObjects = scene.children.length;

    removeCube() {
      const allChildren = scene.children;
      const lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    }

    addCube() {
      const cubeSize = Math.ceil(Math.random() * 3);
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = 'cube-' + scene.children.length;

      cube.position.x = -30 + Math.round(Math.random() * planeGeometry.parameters.width);
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height);

      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    }

    outputObjects() {
      console.log(scene.children);
    }
  }

  const controls = new Controls();

  // 先移除旧的GUI控件
  const oldGUI = document.querySelectorAll('.dg.main.a');
  if (oldGUI[0]) {
    console.log(oldGUI);
    // @ts-ignore
    oldGUI[0].parentNode.removeChild(oldGUI[0]);
  }

  const gui = new dat.GUI();

  console.log('s121522111');

  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'outputObjects');
  gui.add(controls, 'numberOfObjects').listen();

  const trackballControls = initTrackballControls(camera, renderer);

  render();

  function render() {
    trackballControls.update();
    stats.update();

    scene.traverse(function (e) {
      if (e instanceof THREE.Mesh && e !== plane) {
        e.rotation.x += controls.rotationSpeed;
        e.rotation.y += controls.rotationSpeed;
        e.rotation.z += controls.rotationSpeed;
      }
    });

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
