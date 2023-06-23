import React from "react"

type AuthContextType = {
    userToken: string;
    setUserToken: React.Dispatch<React.SetStateAction<string>>;
    user: object;
    setUser: React.Dispatch<React.SetStateAction<object>>
}

export const AuthContext = React.createContext<AuthContextType>(null)

AuthContext.displayName = "AuthContext";
export const useAuth = () => React.useContext(AuthContext)