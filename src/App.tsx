import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { init as houseInit } from './other/house';
import { init as robotInit } from './other/robot';
import { init as yogoInit } from './other/yogo';
import Main from './pages/main';
import Main1 from './pages/main.1';

const Home = () => {
  return (
    <nav>
      <div><Link to="/robot">robot</Link></div>
      <div><Link to="/house">house</Link></div>
      <div><Link to="/main">main</Link></div>
      <div><Link to="/main1">main1</Link></div>
      <div><Link to="/yogo">YOGO</Link></div>
    </nav>
  );
};

interface Props {
  init: () => any
}

const WebglOutput = (props: Props) => {
  const { init } = props;

  useEffect(() => {
    init()

    document.addEventListener('resize', () => init());
  }, [init]);
  return <div id="webgl-output"></div>
};

function App() {
  return (
    <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/house" element={<WebglOutput init={houseInit} />} />
      <Route path="/robot" element={<WebglOutput init={robotInit} />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main1" element={<Main1 />} />
      <Route path="/yogo" element={<WebglOutput init={yogoInit} />} />
      <Route
        path="*"
        element={
          <main>
            <p>404</p>
          </main>
        }
      />
    </Routes>
  </HashRouter>
  );
}

export default App;
