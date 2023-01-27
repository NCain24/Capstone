import { useState, useCallback, createContext } from 'react';

let logoutTimer;

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null,
});

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem('token');
  const storedExp = localStorage.getItem('exp');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: +userId,
    username,
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  let initialId;
  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.clear();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    console.log('logging out');
  }, []);

  const login = (token, exp, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('exp', exp);
    localStorage.setItem('userId', userId);
    // localStorage.setItem('username', username)
    
    // const remainingTime = calculateRemainingTime(exp);
    // const logoutTimer = setTimeout(logout, remainingTime);
  };

  const contextValue = {
    token,
    login,
    logout,
    userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
