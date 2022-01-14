import React from 'react';
import { Route, Redirect } from "react-router-dom";
 
const GuardedRoute = ({component: Component, layout: Layout, auth, ...rest}) => { 
  return <Route
    {...rest}
    render={(props) =>
      auth !== null ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to="/auth/login" />
      )
    }
  />
  };
export default GuardedRoute;