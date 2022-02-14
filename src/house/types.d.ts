/** 楼层 */
export interface FloorConfig {
  /** 长x */
  width: number;
  /** 高y */
  height: number;
  /** 宽z */
  depth: number;
  /** 墙体厚度 */
  thickness: number;
  /** x轴位置 */
  x?: number;
  /** y轴位置 */
  y?: number;
  /** z轴位置 */
  z?: number;
}

/** 建筑物 */
export interface BuildingConfig {
  /** 父对象 */
  scene: THREE.Scene | THREE.Object3D | THREE.Group;
  /** 楼层数量 */
  number?: number;
  /** 楼层配置 */
  floors: FloorConfig[];
}