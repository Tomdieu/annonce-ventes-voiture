import React, { useState,useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

type Props = {
  children:React.ReactNode
}


const AuthProvider = (props:Props) => {
  const {children} = props;
    const [userToken,setUserToken] = useState<string>("")
    const [user,setUser] = useState<object>({})
    useEffect(() => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }, [user]);
  
    useEffect(() => {
      if (userToken) {
        localStorage.setItem("userToken", userToken);
      }
    }, [userToken]);
  
    useEffect(() => {
      const profile = localStorage.getItem("user");
      if (profile) {
        setUser(JSON.parse(profile));
      }
      const token = localStorage.getItem("userToken");
      if (token) {
        setUserToken(token);
      }
    }, []);
  
  return (
    <AuthContext.Provider value={{userToken,setUserToken,user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider