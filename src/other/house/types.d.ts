/** 建筑物 */
export interface BuildingConfig {
  /** 楼层数量，当number为正整数时，将使用floor[0]数据快速新建number层楼 */
  number?: number;
  /** 楼层配置 */
  floor: FloorConfig[];
  /** 电梯配置 */
  elevator?: ElevatorConfig[];
}

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

/** 电梯 */
export interface ElevatorConfig {
  /** 开始楼层 */
  start: number;
  /** 结束楼层 */
  end: number;
  /** 长 x轴 */
  width: number;
  /** 高 y轴 */
  height: number;
  /** 宽 z轴 */
  depth: number;
  /** 坐标 x */
  x: number;
  /** 坐标 z */
  z: number;
}
