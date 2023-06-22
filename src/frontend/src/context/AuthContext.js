import React from "react"


export const AuthContext = React.createContext()


export const useAuth = () => React.useContext(AuthContext)