// 定义设计稿的宽高
const designWidth = 1920;
const designHeight = 1080;

export let styleUtil = {
  px2vw: function (px: number) {
    return px * 100 / designWidth + 'vw';
  },
  px2vh: function (px: number) {
    return px * 100 / designHeight + 'vh';
  },
};

/**
 * 图表类字体自适应
 * @param size 设计稿文字字体
 * @returns 
 */
export const fitChartSize = (size: number) => {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return size;

  const scale = clientWidth / designWidth;
  return Number((size * scale).toFixed(3));
}
