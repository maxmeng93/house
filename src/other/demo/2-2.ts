import * as THREE from 'three';
import * as dat from 'dat.gui';
import { initStats, initTrackballControls } from './util';
import { Face3 } from 'three/examples/jsm/deprecated/Geometry';

// 自定义几何体
export function init() {
  const stats = initStats();

  const scene = new THREE.Scene();

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
  // camera.lookAt(scene.position);
  camera.lookAt(new THREE.Vector3(5, 0, 0));

  // 环境光
  const ambientLight = new THREE.AmbientLight(0x3c3c3c);
  scene.add(ambientLight);

  document.getElementById('webgl-output')?.appendChild(renderer.domElement);

  var vertices = [
    new THREE.Vector3(1, 3, 1),
    new THREE.Vector3(1, 3, -1),
    new THREE.Vector3(1, -1, 1),
    new THREE.Vector3(1, -1, -1),
    new THREE.Vector3(-1, 3, -1),
    new THREE.Vector3(-1, 3, 1),
    new THREE.Vector3(-1, -1, -1),
    new THREE.Vector3(-1, -1, 1),
  ];

  var faces = [
    new Face3(0, 2, 1), // 现在不在使用，而是Mesh.raycast()为面创建自定义对象
    new Face3(2, 3, 1),
    new Face3(4, 6, 5),
    new Face3(6, 7, 5),
    new Face3(4, 5, 1),
    new Face3(5, 0, 1),
    new Face3(7, 6, 2),
    new Face3(6, 3, 2),
    new Face3(5, 7, 0),
    new Face3(7, 2, 0),
    new Face3(1, 3, 4),
    new Face3(3, 6, 4),
  ];

  // const geometry = new THREE.BufferGeometry();
  // const vertices = new Float32Array([
  //   -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

  //   1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
  // ]);

  // // itemSize = 3 because there are 3 values (components) per vertex
  // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  // const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

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
