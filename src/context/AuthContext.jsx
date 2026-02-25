import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPro, setIsPro] = useState(false);

  const login = (email) => {
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
    setIsPro(false);
  };

  const upgradeToPro = () => {
    setIsPro(true);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isPro, upgradeToPro }}
    >
      {children}
    </AuthContext.Provider>
  );
};