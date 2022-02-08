import React, { useEffect } from 'react';
import * as THREE from 'three';
import { init } from './demo/2-3';
import './App.css';

function App() {
  console.log('THREE版本：', THREE.REVISION);

  useEffect(() => {
    init();
  }, []);

  return <div id="webgl-output"></div>;
}

export default App;
