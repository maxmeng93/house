import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js';

let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;

init();

export function init() {
  //Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8cc7de);

  //Camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = -70;
  camera.position.y = 25;
  camera.position.x = 90;

  //Initial cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  //Lights
  const directionalLight1 = new THREE.DirectionalLight(0xffeeff, 0.8);
  directionalLight1.position.set(1, 1, 1);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight2.position.set(-1, 0.5, -1);
  scene.add(directionalLight2);

  const ambientLight = new THREE.AmbientLight(0xffffee, 0.25);
  scene.add(ambientLight);

  //Setup IFC Loader
  const ifcLoader = new IFCLoader();
  ifcLoader.ifcManager.setWasmPath('three/examples/jsm/loaders/ifc/');
  ifcLoader.load('three/examples/models/ifc/rac_advanced_sample_project.ifc', function (model) {
    scene.add(model.mesh);
    render();
  });

  const highlightMaterial = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    depthTest: false,
    transparent: true,
    opacity: 0.3,
  });

  function selectObject(event: any) {
    if (event.button !== 0) return;

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersected = raycaster.intersectObjects(scene.children, false);
    if (intersected.length) {
      const found = intersected[0];
      const faceIndex = found.faceIndex as number;
      // @ts-ignore
      const geometry = found.object.geometry;
      const id = ifcLoader.ifcManager.getExpressId(geometry, faceIndex) as number;

      // @ts-ignore
      const modelID = found.object.modelID;
      ifcLoader.ifcManager.createSubset({
        modelID,
        ids: [id],
        scene,
        removePrevious: true,
        material: highlightMaterial,
      });
      const props = ifcLoader.ifcManager.getItemProperties(modelID, id, true);
      console.log(props);
      renderer.render(scene, camera);
    }
  }

  window.onpointerdown = selectObject;

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);

  window.addEventListener('resize', onWindowResize);

  render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, camera);
}
