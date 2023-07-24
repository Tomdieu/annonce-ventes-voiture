import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserTypes } from "../types";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = (props: Props) => {
  const { children } = props;
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState<UserTypes>(null);

  const logoutUser = () =>{
    localStorage.clear()
    setUserToken("")
    setUser(null)
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("Auser", JSON.stringify(user));
    }
    if (userToken) {
      localStorage.setItem("AuserToken", userToken.trim());
    }
  }, [user, userToken]);

  useEffect(() => {
    const profile = localStorage.getItem("Auser");
    if (profile) {
      const _profile = JSON.parse(profile) as UserTypes;
      setUser(_profile);
    }
    const token = localStorage.getItem("AuserToken");
    if (token) {
      setUserToken(token ? token : "");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, user, setUser,logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
