/** 
 * 标点类型
 */
export type PointType = 'normal' | 'map';

/**
 * 标记点信息
 */
export interface IPoint {
  /** 经度 */
  long?: number;
  /** 纬度 */
  lat?: number;
  /** 世界坐标 x */
  x: number;
  /** 世界坐标 y */
  y: number;
  /** 世界坐标 z */
  z: number;
  /** 距离容器 left 方向偏移 */
  left: number;
  /** 距离容器 top 方向偏移 */
  top: number;
  /** 点位名称 */
  name: string;
  /** 点位其他信息 */
  [key?: string]: any;
}