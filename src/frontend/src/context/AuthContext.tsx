import React from "react";
import { UserTypes } from "../types";

type AuthContextType = {
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  user: UserTypes;
  setUser: React.Dispatch<React.SetStateAction<UserTypes>>;
};

const AuthContext = React.createContext<AuthContextType>(null);

export { AuthContext };

AuthContext.displayName = "AuthContext";
const useAuth = () => React.useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth };
