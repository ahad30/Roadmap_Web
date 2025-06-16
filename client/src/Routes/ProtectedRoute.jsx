import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const { loading , checkAuthStatus} = useAuth();
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
 

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!getToken()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;