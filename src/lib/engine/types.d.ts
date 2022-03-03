/**
 * 标记点信息
 */
export interface IPoint {
  /** 经度 */
  longitude: number;
  /** 纬度 */
  latitude: number;
  /** x坐标 */
  x: number;
  /** y坐标 */
  y: number;
  /** 点位名称 */
  name: string;
  /** 点位其他信息 */
  [key?: string]: any;
}