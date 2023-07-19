import React from "react";

type AuthContextType = {
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  user: object;
  setUser: React.Dispatch<React.SetStateAction<object>>;
};

const AuthContext = React.createContext<AuthContextType>(null);

export { AuthContext };

AuthContext.displayName = "AuthContext";
const useAuth = () => React.useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth };
