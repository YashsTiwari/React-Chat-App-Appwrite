/*eslint-disable*/

import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwriteConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      const response = await account.createEmailSession(
        credentials.email,
        credentials.password
      );
    } catch (error) {
      console.log(error);
    }
  };
  const contextData = { user };

  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
