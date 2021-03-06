import React, { createContext, useState, useEffect, useContext } from "react";

import api from "../services/api";

// the args is only formats, and not default values!
const AuthContext = createContext({
  signed: false,
  token: "",
  user: {},
  signIn() {},
  signUp() {},
  signOut() {},
});

const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState({}); // for test
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await localStorage.getItem("@RNAuth:user");
      const storagedToken = await localStorage.getItem("@RNAuth:token");

      if (storagedUser && storagedToken) {
        api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  async function signIn(email, password) {
    await api
      .post("/sessions", {
        email,
        password,
      })
      .then(function (res) {
        // set header to all requests
        api.defaults.headers["Authorization"] = `Bearer ${res.data.token}`;

        localStorage.setItem("@RNAuth:user", JSON.stringify(res.data));
        localStorage.setItem("@RNAuth:token", res.data.token);
        setUser(res.data);
        setLoading(false);

        // history.push("/");
      })
      .catch(function (error) {
        console.log(error, "Auth user error!");
      });
  }

  async function signUp(
    name,
    avatar,
    email,
    birthday,
    gender,
    teacher,
    password
  ) {
    await api
      .post("/users", {
        name,
        avatar_url: avatar,
        email,
        birthday,
        gender,
        password,
      })
      .then(() => {
        if (teacher) {
          api
            .post("/sessions", {
              email,
              password,
            })
            .then((res) => {
              let tokenUser = res.data.token;
              api.defaults.headers["Authorization"] = `Bearer ${tokenUser}`;

              api.post("/teachers").then(() => {
                // history.push("/signin");
                console.log("Adds associated teacher!");
              });
            });
        } else {
          api
            .post("/sessions", {
              email,
              password,
            })
            .then((res) => {
              let tokenUser = res.data.token;
              api.defaults.headers["Authorization"] = `Bearer ${tokenUser}`;

              api.post("/students").then(() => {
                // history.push("/signin");
                console.log("Adds associated students!");
              });
            });
        }
      })
      .catch(function (error) {
        console.log(error, "Auth register user error!");
      });
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// hook to send context
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
