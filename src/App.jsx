import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthContext from './store/authContext';
import Auth from './components/Auth';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import MemberCard from './components/MemberCard';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="bg-slate-500 h-screen bg-scroll">
      {!authCtx.token ? (
        <Auth />
      ) : (
        <div>
          <Header />
          <Routes>
            <Route index path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/viewprofile/:id" element={<MemberCard />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
