import * as THREE from 'three';
// 组合网格
import { CSG } from 'three-csg-ts';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Wall from './wall';
import { initCamera, initRenderer } from './utils';

export function init() {
  const container = document.getElementById('webgl-output') as HTMLElement;
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f2f7);

  const stats = new Stats();
  container.appendChild(stats.dom);

  // 环境光
  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, 0);
  scene.add(directionalLight);

  // 坐标系辅助工具
  const axes = new THREE.AxesHelper(100);
  scene.add(axes);

  // 相机
  const camera = initCamera({ position: { x: 100, y: 100, z: 100 }, lookAt: scene.position });

  // 渲染器
  const renderer = initRenderer(window.innerWidth, window.innerHeight);

  new OrbitControls(camera, renderer.domElement);
  container.appendChild(renderer.domElement);

  const house = new THREE.Object3D();
  house.position.set(0, 0, 0);
  house.matrixAutoUpdate = false;
  house.updateMatrix();
  scene.add(house);

  // 墙
  // const wall = new Wall({
  //   color: 0x8ac6d1,
  //   depth: 2,
  // });

  // // 新建墙1
  // const wall1 = wall.create({
  //   box: { width: 50, height: 50 },
  //   position: { x: 25, y: 25, z: 1 },
  // });
  // house.add(wall1);

  // // 由墙1 clone 墙2
  // const wall2 = wall1.clone();
  // wall2.position.set(1, 25, 25);
  // wall2.rotation.y += 0.5 * Math.PI;
  // house.add(wall2);

  const doorGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.1);
  doorGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-0.15, -0.1, -0.5));

  var mergeGeometry = new THREE.BufferGeometry();
  // mergeGeometry.merge(window.geometry);
  mergeGeometry.merge(doorGeometry);

  // 房子
  const roomGeometry = new THREE.BoxGeometry(40, 40, 40);
  var box = new THREE.Mesh(roomGeometry);
  box.updateMatrix();

  const cutgeo = box.clone();
  cutgeo.scale.multiplyScalar(0.9);
  cutgeo.updateMatrix();

  // 切出房屋内部空间
  const emptyCube = CSG.subtract(box, cutgeo);

  // 切出门和窗
  // var sub = new THREE.Mesh(mergeGeometry);
  // sub.updateMatrix();
  // const result = CSG.subtract(emptyCube, sub);

  const houseMesh = emptyCube;
  // const houseMesh = result;
  var material = new THREE.MeshLambertMaterial({
    color: 0xff1111,
    wireframe: true,
  });
  houseMesh.material = material;

  houseMesh.position.set(0, 0.4, 0);
  house.add(houseMesh);

  house.traverse(function (object) {
    object.castShadow = true;
  });

  // 地面
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
  const floorGeometry = new THREE.PlaneBufferGeometry(100, 100, 1, 1);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.matrixAutoUpdate = false;
  floor.updateMatrix();
  house.add(floor);
  floor.receiveShadow = false;

  var basicMaterial = new THREE.MeshBasicMaterial({
    color: 0xff1111,
    wireframe: false,
  });

  // 屋顶
  const size = 10;
  const roofGeometry = new THREE.CylinderBufferGeometry(0, size * 3, size * 3, 4);
  const cylinder = new THREE.Mesh(roofGeometry, basicMaterial.clone());
  cylinder.material.color.setHex(0xffffff);
  cylinder.rotation.y = (45 * Math.PI) / 180;
  cylinder.position.set(20, 65, 20);
  cylinder.matrixAutoUpdate = false;
  cylinder.updateMatrix();
  house.add(cylinder);

  render();

  function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  }
}
