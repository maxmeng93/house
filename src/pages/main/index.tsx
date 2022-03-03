import React, { useEffect, useRef } from 'react';
import { Map, Engine } from '@/lib/engine';
import data from './china.json';

export default function MapPage() {
  const domRef = useRef(null)
  useEffect(() => {
    if (domRef.current) {
      const map = new Engine(domRef.current);
      map.openStats();
      // map.renderScene();
      map.addAxes();
      // map.renderMap(data as GeoJSON.FeatureCollection);
    }
  }, [domRef])
  return (
    <div>
      <div id="webgl-output" ref={domRef}></div>
    </div>
  );
}
