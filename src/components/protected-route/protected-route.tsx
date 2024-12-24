import { Preloader } from '@ui';
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { TProtectedRouteProps } from './type';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  isAuthOnly = false,
  children
}) => {
  const { isAuthChecked, user } = useSelector((state) => state.user);

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (isAuthOnly && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!isAuthOnly && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
