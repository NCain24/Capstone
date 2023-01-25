// import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
