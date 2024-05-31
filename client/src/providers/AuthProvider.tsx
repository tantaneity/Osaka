import AdminService from "@/services/AdminService";
import AuthService from "@/services/AuthService";
import useUserStore from "@/store/UserStore";
import { useEffect, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setIsAuth, setIsLoading, setUser, setIsAdmin } = useUserStore();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setIsLoading(true);
        try {
          const data = await AuthService.refresh();
          const { user, tokens } = data;
          setUser({ ...user });
          setIsAuth(true);
          const isAdmin = await AdminService.getAdminByUserId(user.id)
          setIsAdmin(!!isAdmin)
          localStorage.setItem('accessToken', tokens.accessToken);
        } catch (error) {
          setUser(null);
          setIsAuth(false);
          localStorage.removeItem('accessToken');
          console.error('Failed to refresh token:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
  }, [setIsAuth, setIsLoading, setUser]);

  return <>{children}</>;
};

export default AuthProvider;
