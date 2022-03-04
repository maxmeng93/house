import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { Map } from '@/lib/engine';
import data from './china.json';
import styles from './style/index.module.scss';
import MarkPoint from '@/components/MarkPoint';

// 北京 116.412318, 39.909843
// yogo 121.464323, 31.29927
const projection = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);

export default function MapPage() {

  const domRef = useRef(null);

  useEffect(() => {
    if (domRef.current) {
      const map = new Map(domRef.current, projection);
      map.openStats();
      map.renderMap(data as GeoJSON.FeatureCollection);
      map.markPoint([121.464323, 31.29927]);
    }
  }, [domRef]);

  return (
    <div>
      <div className={styles.container3d} ref={domRef}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <MarkPoint data={[]}></MarkPoint>
      </div>
    </div>
  );
}
