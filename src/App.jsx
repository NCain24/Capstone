import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthContext from './store/authContext';
import Auth from './components/Auth';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="text-3xl font-bold flex-col items-center">
      {!authCtx.token ? (
        <Auth />
      ) : (
        <div>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
