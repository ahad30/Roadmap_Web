import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  
  const getToken = () => {    
    const cookieToken = Cookies.get('token');
    const localStorageToken = localStorage.getItem('token');
    return cookieToken || localStorageToken;
  };


  const token = getToken();
  if (!token || user === null) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;