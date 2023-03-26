import React, { useContext } from 'react';

import Model from './pages/Model';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Video from './pages/Video';
import Home from './pages/Home';
import Error from './pages/Error';
import Register from './pages/Register';
import Login from './pages/Login';
import { SocketContext } from './Context';
import Story from './pages/Story';

const App = () => {

  const { rootUser } = useContext(SocketContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/video" element={rootUser ? <Video /> : <Login />} />
        <Route exact path="/predict" element={<Model />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/story" element={<Story />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
