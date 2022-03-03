import h337 from "heatmap.js";
import type { Heatmap, HeatmapConfiguration } from "heatmap.js";

interface IData {
  x: number;
  y: number;
  value: number;
  radius?: number;
}

interface IContainerAttr {
  width: number;
  height: number;
}

export default class HeatMap {
  instance: Heatmap<"value", "x", "y">;

  options: HeatmapConfiguration<"value", "x", "y">;

  constructor(config?: HeatmapConfiguration) {
    let container: HTMLElement | undefined = config?.container;
    if (!container) {
      container = document.createElement("div");
      container.id = "heatmap-container";
      container.style.zIndex = "-1";
      document.body.appendChild(container);
    }

    this.options = {
      container: container,
      ...config,
    };

    this.instance = h337.create(this.options);
  }

  /**
   * 新建热力图画布，并添加数据
   * @param points 要绘制的点
   * @param attr 画布容器的属性（宽、高）
   */
  public create(points: IData[], attr?: IContainerAttr) {
    const options = this.options;

    if (attr) {
      const { container } = options;
      const { width, height } = attr;
      container.style.width = `${width}px`;
      container.style.height = `${height}px`;
    }

    this.instance = h337.create(options);

    this.setData(points);
  }

  /**
   * 为热力图添加数据
   * @param points
   */
  public setData(points: IData[]) {
    if (points.length === 0) return;

    let min: number = 0;
    let max: number = 1;

    points.forEach(({ value }) => {
      if (min === undefined) {
        min = value;
      } else {
        min = Math.min(min, value);
      }

      if (max === undefined) {
        max = value;
      } else {
        max = Math.max(max, value);
      }
    });

    const option = {
      min,
      max,
      data: points,
    };

    this.instance.setData(option);
  }

  /**
   * 获取热力图图片
   * @returns base64格式的图片链接
   */
  getDataUrl(): string {
    return this.instance.getDataURL();
  }
}

interface IGenDataConfig {
  width: number;
  height: number;
  xDeviation?: number;
  yDeviation?: number; // y轴偏移
  length?: number; // 随机点数量
  radius?: number; // 点半径
  spacing?: number; // 规矩点间距
}

/**
 * 随机生成测试点位数据
 * @param config
 * @returns
 */
export function genData({
  width,
  height,
  xDeviation = 0,
  yDeviation = 0,
  length = 100,
  radius = 15,
}: IGenDataConfig) {
  const extremas = [(Math.random() * 100) >> 0, (Math.random() * 100) >> 0];
  const max = Math.max.apply(Math, extremas);
  const min = Math.min.apply(Math, extremas);
  const points = [];

  for (let i = 0; i < length; i++) {
    const x = (Math.random() * width) >> 0;
    const y = (Math.random() * height) >> 0;
    const value = ((Math.random() * max - min) >> 0) + min;
    points.push({
      x: x + xDeviation,
      y: y + yDeviation,
      value: value,
      radius: radius,
    });
  }
  return points;
}

export function genData1({
  width,
  height,
  xDeviation = 0,
  yDeviation = 0,
  radius = 15,
  spacing = 15,
}: IGenDataConfig) {
  const extremas = [(Math.random() * 100) >> 0, (Math.random() * 100) >> 0];
  const max = Math.max.apply(Math, extremas);
  const min = Math.min.apply(Math, extremas);
  const points = [];

  for (let x = 0; x < width; x = x + spacing) {
    for (let y = 0; y < height; y = y + spacing) {
      // const x = (Math.random() * width) >> 0;
      // const y = (Math.random() * height) >> 0;
      const value = ((Math.random() * max - min) >> 0) + min;
      points.push({
        x: x + xDeviation,
        y: y + yDeviation,
        value,
        radius,
      });
    }
  }

  console.log(points.length);

  return points;
}
