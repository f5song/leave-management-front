import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '@/Api/auth-service';

type AuthStatus = {
  isAuthenticated: boolean;
};

const PrivateRoute = () => {
  const { data, isLoading, isError } = useQuery<AuthStatus>({
    queryKey: ['authStatus'],
    queryFn: () => authService.checkAuth(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
