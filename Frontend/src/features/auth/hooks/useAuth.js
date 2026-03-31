import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await login({ email, password });

      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      await register({ username, email, password });

      //  DO NOT log user in
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to get user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, [setUser, setLoading]);

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
