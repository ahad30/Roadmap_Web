import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user, checkAuthStatus} = useAuth();
  const location = useLocation();

  const getToken = () => {    
    const cookieToken = Cookies.get('token');
    const localStorageToken = localStorage.getItem('token');
    
    return cookieToken || localStorageToken;
  };

useEffect(() => {
  const verifyAuth = async () => {
      await checkAuthStatus();
    };
    verifyAuth();
  }, []);


  if (!getToken() || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;