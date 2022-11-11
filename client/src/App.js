import React from 'react';

import Model from './components/Model';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Video from './Video';
import Home from './Home';
import Error from './components/Error';


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/video" element={<Video />} />
        <Route exact path="/predict" element={<Model />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
