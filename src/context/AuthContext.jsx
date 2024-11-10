import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username'); 
    setIsAuthenticated(!!token);
    setUsername(storedUsername || ''); 
  }, []);

  const login = (userData) => {
    console.log(userData);
    
    localStorage.setItem('token', userData.token);
    localStorage.setItem('username', userData.username); 
    setIsAuthenticated(true);
    setUsername(userData.username); 
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); 
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
