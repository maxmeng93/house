import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
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
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.outputEncoding = THREE.sRGBEncoding;

  new OrbitControls(camera, renderer.domElement);
  container.appendChild(renderer.domElement);

  let robot: THREE.Object3D = new THREE.Object3D();

  // // 加载头盔
  // const loader1 = new GLTFLoader().setPath('/models/DamagedHelmet/glTF/')
  // loader1.load('DamagedHelmet.gltf', function(gltf) {
  //   console.log(gltf)
  //   gltf.scene.scale.set(20, 20, 20);
  //   gltf.scene.position.x -= 50;
  //   scene.add(gltf.scene);
  // })

  // // 加载机器人模型
  // const loader2 = new GLTFLoader().setPath('/models/cute_little_robot/');
  // loader2.load('scene.gltf', function (gltf) {
  //     gltf.scene.scale.set(20, 20, 20);
  //     gltf.scene.rotateY(-Math.PI * 0.8);
  //     scene.add(gltf.scene);
  //   }
  // );

  // 加载直立机器人
  const loader3 = new GLTFLoader().setPath('/models/biped_robot/')
  loader3.load('scene.gltf', function(gltf) {
    console.log('robot gltf', gltf)
    robot = gltf.scene;
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    gltf.scene.position.x += 50;
    scene.add(gltf.scene);
  })

  // 加载kago5
  // const startTime = new Date().getTime()
  // const loader2 = new GLTFLoader().setPath('/models/kago5/');

  // loader2.load('kago5.gltf', function (gltf) {
  //   const time = new Date().getTime()

  //   gltf.scene.scale.set(2, 2, 2);
  //   gltf.scene.rotateY(-Math.PI * 0.8);
  //   scene.add(gltf.scene);
  // }, function(xhr) {
  //   console.log('loaded', xhr.loaded)
  // }, function(err) {
  //   console.log('err', err);
  // });

  render();

  // 射线
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  window.addEventListener('mousedown', function (e) {
    mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY / renderer.domElement.clientHeight) * 2) + 1;

    raycaster.setFromCamera(mouse, camera);
    console.log('robot.children', robot.children);
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
