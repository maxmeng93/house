import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { Map, Point } from '@/lib/engine';
import data from './china.json';
import styles from '../style/index.module.scss';
import MarkPoint from '@/components/MarkPoint';
import { useAppSelector } from '@/store/hooks';
import { getScale } from '@/store/global';

const projection = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);

export default function MapPage() {
  const scale = useAppSelector(getScale);

  const canvasRef = useRef(null);

  const [points, setPoints] = useState<any[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      // const map = new Map(canvasRef.current, projection);
      const map = new Map(canvasRef.current, projection, 1920, 1080);

      map.addOrbitControls();
      map.renderMap(data as GeoJSON.FeatureCollection);

      const point = new Point(map.camera, map.projection, 1920, 1080, 'map');
      const p = point.setPoints([
        { long: 121.464323, lat: 31.29927, name: 'YOGO' }, 
        { long: 116.40355, lat: 39.923402, name: '北京' }
      ]);

      setPoints(p);

      map.orbitControls.addEventListener('change', () => {
        setPoints(point.update(1920, 1080));
      });

      window.addEventListener('resize', () => {
        setPoints(point.update(1920, 1080));
      });
    }
  }, [canvasRef, scale]);

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
