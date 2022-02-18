import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { PATH_DASHBOARD } from "../routes/paths";

const GuardedRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const [auth, setAuth] = useState(false);
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (isAuthenticated) {
      setAuth(true);
    }
  }, []);

  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/auth/org/login" />
        )
      }
    />
  );
};
export default GuardedRoute;
