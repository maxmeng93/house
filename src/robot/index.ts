import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initCamera, initRenderer, initLight, initAxes } from './utils';
import { module1, module2, module3, module4, kago5 } from './models';

export function init() {
  // 时间
  const clock = new THREE.Clock();

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

  let mixer: THREE.AnimationMixer | null = null;
  let robot: THREE.Object3D = new THREE.Object3D();

  // module1(scene);
  // module2(scene);
  // kago5(scene);

  module3(scene).then((res: any) => {
    robot = res.robot;
    mixer = res.mixer;
  });

  // module4(scene).then((res: any) => {
  //   robot = res.robot;
  //   mixer = res.mixer;
  // });

  render();

  // 射线
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  window.addEventListener('mousedown', function (e) {
    mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY / renderer.domElement.clientHeight) * 2) + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(robot.children);
    console.log('intersects', intersects);

    if (intersects.length > 0) {
      // @ts-ignore
      intersects[0].object.material.color.set(0xff0000);
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

    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }

    renderer.render(scene, camera);
  }
}
