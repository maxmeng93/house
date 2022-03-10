import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { Map, Point } from '@/lib/engine';
import data from './china.json';
import styles from '../style/index.module.scss';
import MarkPoint from '@/components/MarkPoint';
import * as dat from 'dat.gui';

const projection = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);

class Gui {
  rotationSpeed = 0.02;
  setColor(color: string | number) {
    console.log(color)
  }
}
const controls = new Gui();


export default function MapPage() {

  const canvasRef = useRef(null);

  const [points, setPoints] = useState<any[]>([]);

  const gui = useRef<any>(null);

  useEffect(() => {
    if (!gui.current) {

      const g = new dat.GUI();
      g.add(controls, 'rotationSpeed', 0, 0.5);
      g.addColor({ '地图边界颜色': '#FF0000' }, '地图边界颜色').onChange(color => {
        console.log(color)
      });
      gui.current = g;
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      const map = new Map(canvasRef.current, projection);

      map.addOrbitControls();
      map.renderMap(data as GeoJSON.FeatureCollection);

      const point = new Point(map.camera, map.projection, window.innerWidth, window.innerHeight, 'map');
      const p = point.setPoints([
        { long: 121.464323, lat: 31.29927, name: 'YOGO' }, 
        { long: 116.40355, lat: 39.923402, name: '北京' }
      ]);

      setPoints(p);

      map.orbitControls.addEventListener('change', () => {
        setPoints(point.update(window.innerWidth, window.innerHeight));
      });

      window.addEventListener('resize', () => {
        setPoints(point.update(window.innerWidth, window.innerHeight));
      });
    }
  }, [canvasRef]);

  const clickName = (data: any) => {
    console.log(data);
  }

  return (
    <div className={styles.main}>
      <canvas ref={canvasRef}></canvas>
      <MarkPoint data={points} clickName={clickName}></MarkPoint>
    </div>
  );
}
