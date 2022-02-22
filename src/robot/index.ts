import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { initCamera, initRenderer, initLight, initAxes } from './utils';

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

  let robot: THREE.Object3D = new THREE.Object3D();
  // 加载机器人模型
  const loader = new GLTFLoader();
  loader.load(
    // '/models/robot1.gltf',
    '/models/cute_little_robot/scene.gltf',
    function (gltf) {
      console.log('模型', gltf);

      const root = gltf.scene.children[0].children[0].children[0].children[0];
      console.log('root', root);
      robot = root;
      root.scale.set(20, 20, 20);
      root.rotateX(-Math.PI * 0.5);
      root.rotateY(-Math.PI * 0.8);
      scene.add(root);
    },
    function (xhr) {
      console.log('xhr', xhr);
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
      console.log('ERROR: 加载模型出错');
    }
  );

  render();

  console.log('scene', scene);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  window.addEventListener('mousedown', function (e) {
    mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY / renderer.domElement.clientHeight) * 2) + 1;

    raycaster.setFromCamera(mouse, camera);
    console.log('scene.children', scene.children);
    var intersects = raycaster.intersectObjects(robot.children);
    console.log('intersects', intersects);

    if (intersects.length > 0) {
      console.log(intersects[0].object);
      // @ts-ignore
      // intersects[0].object.material.color.set(0xff0000);
    }
  });

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
