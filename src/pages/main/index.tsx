import React, { useEffect, useRef } from 'react';
import { Map } from '@/lib/engine';
import data from './china.json';
import styles from './style/index.module.scss';

export default function MapPage() {
  const domRef = useRef(null)
  useEffect(() => {
    if (domRef.current) {
      const map = new Map(domRef.current);
      map.openStats();
      map.renderMap(data as GeoJSON.FeatureCollection);
      map.markPoint([121.464323, 31.29927])
    }
  }, [domRef])
  return (
    <div>
      <div id="webgl-output" ref={domRef}></div>
      <div className={styles.left}></div>
      <div className={styles.right}></div>
    </div>
  );
}
