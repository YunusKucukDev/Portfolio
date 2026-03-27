import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = () => {
  // Redux'tan kullanıcıyı al (State ismi 'auths' ise)
  const { user } = useSelector((state: any) => state.auths);
  const location = useLocation();

  // Eğer kullanıcı yoksa (veya localStorage boşsa) login'e fırlat
  if (!user && !localStorage.getItem("user")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kullanıcı varsa, alt rotaları (Admin Panel içerikleri) göster
  return <Outlet />;
};

export default AuthGuard;