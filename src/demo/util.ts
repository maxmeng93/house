import * as THREE from 'three';
import Stats from 'stats.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

/**
 * 初始化统计控件
 * @param type
 * @returns
 */
export function initStats(type: number = 0) {
  const stats = new Stats();
  stats.showPanel(type); // 0 fps  1 ms  2 mb  3+ custom
  document.body.appendChild(stats.dom);
  return stats;
}

/**
 * 初始化鼠标控制器来控制场景
 * @param {THREE.Camera} camera
 * @param {THREE.Renderer} renderer
 */
export function initTrackballControls(camera: THREE.Camera, renderer: THREE.Renderer) {
  var trackballControls = new TrackballControls(camera, renderer.domElement);
  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.2;
  trackballControls.panSpeed = 0.8;
  trackballControls.noZoom = false;
  trackballControls.noPan = false;
  trackballControls.staticMoving = true;
  trackballControls.dynamicDampingFactor = 0.3;
  trackballControls.keys = ['65', '83', '68'];

  return trackballControls;
}
