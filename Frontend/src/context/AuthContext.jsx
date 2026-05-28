import { createContext, useContext, useEffect, useState } from "react";

import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  // LOGIN

  const login = async ({ email, password }) => {

    setLoading(true);

    try {
      const data = await authService.login({
        email,
        password,
      });

      setUser(data.user);

      return data;
    } 
    catch (error) {
      console.error(error);
      throw error;
    } 
    finally {
      setLoading(false);
    }
  };

  // REGISTER

  const register = async ({ username, fullname, email, password, rememberMe }) => {
    setLoading(true);

    try {
      const data = await authService.register({
        username,
        fullname,
        email,
        password,
        rememberMe
      });

      setUser(data.user);
      return data;
    } 
    catch (error) {
      console.error(error);
      throw error;
    } 
    finally {
      setLoading(false);
    }
  };

  // LOGOUT

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } 
    catch (error) {
      console.error(error);
    } 
    finally {
      setLoading(false);
    }
  };

  // CHECK AUTH

  const checkAuth = async () => {
    try {
      setLoading(true);
      const data = await authService.getCurrentUser();
      setUser(data.user);
    } 
    catch (error) {
      setUser(null);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK

export const useAuth = () => {
  return useContext(AuthContext);
};
