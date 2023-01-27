import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthContext from './store/authContext';
import Auth from './components/Auth';
import Header from './components/Header';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      { !authCtx.token ? (
        <Auth />
      ) : (
          <div>
        <Header/>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" />}
        />
        <Route
          path="/auth"
          element={<Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={<Navigate to="/auth" />}
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
            </Routes>
          </div>
      )}
      
    </div>
  );
}

export default App;
