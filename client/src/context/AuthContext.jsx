import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import api from '../api/api';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user , setUser] = useState(null)
  const [loading, setLoading] = useState(false);
  
 useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {  
      setUser(JSON.parse(storedUser));
  }
  // setLoading(false);
}, []);

  const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };


  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/signup', userData);
      
      if (response.data.success) {     
        toast.success('Account created successfully!');
        return { success: true };
      }

    } catch (error) {
      // console.log(error)
      const message = error.response?.data?.message;
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

const signin = async (credentials) => {
  try {
    setLoading(true);
    const response = await api.post('/signin', credentials);

    if (response?.data?.success) {
      const user = response?.data?.user;

      if (user?.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
      toast.success('Login successful!');
      return { success: true };
    }
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    toast.error(message);
    return { success: false, message };
  } finally {
    setLoading(false);
  }
};


  const logout = async () => {
    try {
      await api.post('/logout');
      clearToken();
      setUser(null)
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    loading,
    setLoading,
    signup,
    signin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};