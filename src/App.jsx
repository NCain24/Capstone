import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header'
import Home from './components/Home';
import Profile from './components/Profile';
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
        <Header/>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
