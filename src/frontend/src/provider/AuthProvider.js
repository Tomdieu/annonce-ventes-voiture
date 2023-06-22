import React, { useState } from 'react'
import { AuthContext } from '../context/AuthContext'



const AuthProvider = () => {
    const [userToken,setUserToken] = useState(null)
    const [user,setUser] = useState(null)
  return (
    <AuthContext.Provider value={{userToken,setUserToken,user,setUser}}>

    </AuthContext.Provider>
  )
}

export default AuthProvider