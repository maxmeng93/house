import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'dat.gui';

/**
 * 
 * @param path 模型路径
 * @param gltf 模型
 * @param progress 加载进度回调
 * @returns 
 */
function loadGltfModule({ path = '', gltf }: { path?: string, gltf: string }, progress?: Function) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader().setPath(path);
    loader.load(gltf, function(module) {
      console.log(`模型：${gltf}`, module);
      resolve(module);
    }, function(xhr) {
      progress?.(xhr)
    }, function(err) {
      reject(err);
    });
  });
}

// 科技风头盔模型
export function module1(scene: THREE.Scene) {
  return loadGltfModule({ 
    path: '/models/DamagedHelmet/glTF/', 
    gltf: 'DamagedHelmet.gltf'
  }).then((gltf: any) => {
    gltf.scene.scale.set(20, 20, 20);
    gltf.scene.position.x -= 50;
    scene.add(gltf.scene);
  });
}

// 履带机器人模型
export function module2(scene: THREE.Scene) {
  return loadGltfModule({ 
    path: '/models/cute_little_robot/', 
    gltf: 'scene.gltf'
  }).then((gltf: any) => {
    gltf.scene.scale.set(20, 20, 20);
    gltf.scene.rotateY(-Math.PI * 0.8);
    scene.add(gltf.scene);
  });
}

// 大黄蜂模型
export function module3(scene: THREE.Scene) {
  // function gui() {
  //   // @ts-ignore
  //   const controls = new function() {
  //     // @ts-ignore
  //     this.showAxes = false;
  //     // @ts-ignore
  //     this.showRoof = true;
  //   }()

  //   const ui = new GUI();
  //   ui.add(controls, 'showAxes');
  //   ui.add(controls, 'showRoof');

  //   return controls;
  // }

  return loadGltfModule({ path: '/models/biped_robot/', gltf: 'scene.gltf' }).then((gltf: any) => {
    const robot = gltf.scene;
    robot.scale.set(0.5, 0.5, 0.5);
    robot.position.x += 50;
    scene.add(robot);

    // 添加骨架
    const skeleton = new THREE.SkeletonHelper(robot);
    skeleton.visible = true;
    scene.add(skeleton);

    const mixer = new THREE.AnimationMixer(robot);
    mixer.clipAction(gltf.animations[0]).play();

    return { robot, mixer, /*gui: gui()*/ };
  })
}


// 加载粉色直立机器人（动画）
export function module4(scene: THREE.Scene) {
  return loadGltfModule({ 
    path: '/models/', 
    gltf: 'Xbot.glb'
  }).then((gltf: any) => {
    const robot = gltf.scene;

    robot.scale.set(40, 40, 40);
    robot.rotateY(-Math.PI * 0.8);
    scene.add(robot);

    const skeleton = new THREE.SkeletonHelper(robot);
    skeleton.visible = true;
    scene.add(skeleton);

    const mixer = new THREE.AnimationMixer(robot);
    const action = mixer.clipAction(gltf.animations[6]);
    action.play();

    return { robot, mixer };
  });
}

// kago5
export function kago5(scene: THREE.Scene) {
  return loadGltfModule({ 
    path: '/models/kago5/', 
    gltf: 'kago5.gltf'
  }).then((gltf: any) => {
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.rotateY(-Math.PI * 0.8);
    scene.add(gltf.scene);
  });
}

// 赤普零售柜
export function vendor(scene: THREE.Scene) {
  return loadGltfModule({
    path: '/models/vendor/',
    gltf: 'vendor.glb'
  }).then((gltf: any) => {
    scene.add(gltf.scene);
  })
}