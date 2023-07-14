import React, { useState,useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

type Props = {
  children:React.ReactNode
}


const AuthProvider = (props:Props) => {
  const {children} = props;
    const [userToken,setUserToken] = useState("")
    const [user,setUser] = useState<object>({})
    useEffect(() => {
      if (user) {
        localStorage.setItem("Auser", JSON.stringify(user));
      }
      if (userToken) {
        localStorage.setItem("AuserToken", userToken.trim());
      }
    }, [user,userToken]);
  
    useEffect(() => {
      const profile = localStorage.getItem("Auser");
      if (profile) {
        setUser(JSON.parse(profile));
      }
      const token = localStorage.getItem("AuserToken");
      if (token) {
        setUserToken(token?token:"");
      }
    }, []);
  
  return (
    <AuthContext.Provider value={{userToken,setUserToken,user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider