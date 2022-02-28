import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initCamera, initRenderer, initLight, initStats } from '../utils';
import f1 from './images/1f.png';
import f2 from './images/2f.png';
import f3 from './images/3f.png';
import { points } from './data';
import { Camera } from 'three';

/**
 * 获取楼层地图，并将楼层编号画到地图上，并生成纹理
 * @param img 图片链接
 * @param index 楼层序号
 * @returns 
 */
function getFloorTexture(img: string, index: number) {
  return new Promise<THREE.CanvasTexture>((resolve, reject) => {
    const imgDom = document.createElement('img');
    imgDom.src = img;
    imgDom.onload = (event: any) => {
      const { path: [ image ] } = event;
  
      const { width, height } = image;
  
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(image, 0, 0);
      ctx.font = "48px serif";
      ctx.fillText(`${index + 1}F`, 10, 50);
  
      const texture = new THREE.CanvasTexture(canvas);
      resolve(texture);
    }
    imgDom.onerror = () => {
      reject(new Error(`图像加载错误。src:${img}，index${index}`))
    }
  });
}

function tag(origin: { x: number, y: number, z: number }, boxMesh: THREE.Object3D, camera: THREE.Camera) {
  
  const x = 0;
  const y = 0;
  const z = 0;

  // 世界坐标
  const worldVector = new THREE.Vector3(x, y, z);
  const standardVector = worldVector.project(camera);//世界坐标转标准设备坐标
  const a = window.innerWidth / 2;
  const b = window.innerHeight / 2;
  const x1 = Math.round(standardVector.x * a + a);//标准设备坐标转屏幕坐标
  const y1 = Math.round(-standardVector.y * b + b);//标准设备坐标转屏幕坐标
  
  console.log(x1, y1);
}

/**
 * 渲染标记点
 */
function renderPoint(origin: { x: number, y: number, z: number }, group: THREE.Object3D, index: number, camera: THREE.Camera) {
  console.log("origin", origin);
  console.log("group", group);
  points[index].forEach((point) => {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshPhongMaterial({color: 0xff0000});
    const p = new THREE.Mesh(geometry, material);

    console.log(point);
    // const p = new THREE.Object3D();
    p.position.set(point.x / 50 + origin.x, origin.y, point.y / 50 + origin.z);
    
    group.add(p);

    console.log('p', p)
    // 标点的世界坐标
    const worldPosition = new THREE.Vector3();
    console.log('p', p.getWorldPosition(worldPosition));
    console.log(worldPosition)
    // 设备坐标
    const standardVector = worldPosition.project(camera);
    console.log('standardVector', standardVector)

    const a = window.innerWidth / 2;
    const b = window.innerHeight / 2;
    const x1 = Math.round(standardVector.x * a + a);
    const y1 = Math.round(-standardVector.y * b + b);//标准设备坐标转屏幕坐标
    const div = document.createElement('div');
    div.style.width = '20px';
    div.style.height = '20px';
    div.style.background = 'rgba(0, 225, 223, 0.5)';
    div.style.position = 'fixed';
    div.style.left = `${x1}px`;
    div.style.top = `${y1}px`;
    div.style.transform = 'translate(-50%, -50%)';
    div.style.borderRadius = '50%';
    document.body.appendChild(div);
  });
}

// 初始化楼层
function initFloor(scene: THREE.Scene, img: string, index: number, camera: THREE.Camera): THREE.Object3D {

  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const color = 0xdddffb;
  const transparent = false;
  const opacity = 0.5;

  const material0 = new THREE.MeshPhongMaterial({ color, transparent, opacity });
  const material1 = material0.clone();
  const material = [material0, material0, material1, material0, material0, material0];
  
  const mesh =  new THREE.Mesh(geometry, material);

  group.add(mesh);
  scene.add(group);

  getFloorTexture(img, index).then((texture: THREE.CanvasTexture) => {
    const { image } = texture;
    const { width, height } = image;
    geometry.scale(width, 5, height);
    material1.map = texture;
    material1.needsUpdate = true;

    // 重置坐标原点
    const origin = {
      x: -width / 2,
      y: 5/2,
      z: -height / 2,
    };

    renderPoint(origin, group, index, camera);
  });

  return group;
}

// 初始化建筑
function initBuilding(scene: THREE.Scene, camera: THREE.Camera) {
  const floorimages = [f1, f2, f3];

  floorimages.forEach((item, index) => {
    if (index !== 0) return;
    const group = initFloor(scene, item, index, camera);
    group.position.y = index * 100;
  })
}

export function init() {
  const container = document.getElementById('webgl-output') as HTMLElement;
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f2f7);

  initStats(container);
  initLight(scene);

  // 相机
  const camera = initCamera({ 
    position: { x: 0, y: 1000, z: 0 }, 
    lookAt: scene.position, 
    near: 0.1, 
    far: 10000 
  });

  // 渲染器
  const renderer = initRenderer(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.outputEncoding = THREE.sRGBEncoding;

  const controls = new OrbitControls(camera, renderer.domElement);
  // 锁定x轴旋转角度
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI/2;
  container.appendChild(renderer.domElement);

  initBuilding(scene, camera);

  render();

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  });

  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }
}