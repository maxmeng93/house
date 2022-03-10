import * as dat from 'dat.gui';

class Gui {
  rotationSpeed = 0.02;
  setColor(color: string | number) {
    console.log(color)
  }
}
const controls = new Gui();

const g = new dat.GUI();
g.add(controls, 'rotationSpeed', 0, 0.5);
g.addColor({ '地图边界颜色': '#FF0000' }, '地图边界颜色');

export default Gui;