import React, { useEffect } from 'react';
import init from './map';

export default function MapPage() {
  useEffect(() => {
    init();
  })
  return (
    <div>
      <div id="webgl-output"></div>
    </div>
  );
}