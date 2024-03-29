import React, {  useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
// import { PATH_DASHBOARD } from "../routes/paths";
import { TOKEN_TAG } from "../utils/const.utils";

const GuardedRoute = ({ component: Component, layout: Layout, ...rest }) => {
  // const [auth, setAuth] = useState(false);
  const isAuthenticated = localStorage.getItem(TOKEN_TAG);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(TOKEN_TAG);
    if (isAuthenticated) {
      // setAuth(true);
    }
  }, []);

  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Layout >
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
