import React, { useEffect } from 'react';
// import { init } from './house';
import { init } from './robot';

function App() {
  useEffect(() => {
    init();

    document.addEventListener('resize', init);
  }, []);

  return <div id="webgl-output"></div>;
}

export default App;
