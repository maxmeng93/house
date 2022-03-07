import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { Map, Point } from '@/lib/engine';
import data from './china.json';
import styles from './style/index.module.scss';
import MarkPoint from '@/components/MarkPoint';

const projection = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);

export default function MapPage() {

  const domRef = useRef(null);

  const [points, setPoints] = useState<any[]>([]);

  useEffect(() => {
    if (domRef.current) {
      const map = new Map(domRef.current, projection);

      map.openStats();
      map.addOrbitControls();
      map.renderMap(data as GeoJSON.FeatureCollection);

      const point = new Point(map.camera, map.projection, 'map');
      const p = point.setPoints([
        { long: 121.464323, lat: 31.29927, name: 'YOGO' }, 
        { long: 116.40355, lat: 39.923402, name: '北京' }
      ]);

      setPoints(p);

      map.orbitControls.addEventListener('change', () => {
        setPoints(point.update());
      });

      window.addEventListener('resize', () => {
        setPoints(point.update());
      });
    }
  }, [domRef]);

  const clickName = (data: any) => {
    console.log(data);
  }

  return (
    <div>
      <div className={styles.container3d} ref={domRef}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <MarkPoint data={points} clickName={clickName}></MarkPoint>
      </div>
    </div>
  );
}
