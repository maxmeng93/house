import * as THREE from 'three';

// 添加坐标参考线
export function axes(size = 30) {
  const axes = new THREE.AxesHelper(size);
  return axes;
}
