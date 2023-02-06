import { useState, useCallback, createContext } from 'react';

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
  console.log(localData);

  let initialToken;
  let initialId;
  let initialUsername;
  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
    initialUsername = localData.username;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);
  const [username, setUsername] = useState(initialUsername);

  const login = (token, exp, userId, username) => {
    console.log('logged in');
    setToken( token );
    console.log(token)
    setUserId(userId);
    setUsername(username);

    localStorage.setItem('token', token);
    localStorage.setItem('exp', exp);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);

    [{ token }].map(({ key, value }) => {
      return localStorage.setItem(key, value);
    });

  };
  const logout = useCallback(() => {
    console.log('logged out');
    setToken(null);
    setUserId(null);
    setUsername(null);
    localStorage.clear();

  }, []);
  const contextValue = {
    token,
    login,
    logout,
    userId,
    username,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
