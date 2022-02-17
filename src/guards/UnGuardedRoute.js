import React from 'react';
import { Route, Redirect } from "react-router-dom";
 
const UnGuardedRoute = ({component: Component, layout: Layout, auth, ...rest}) => { 
  return <Route exact
    {...rest}
    render={(props) =>
    //   !auth  ? (
        <Layout>
          <Component {...props} />
        </Layout>
    //   ) : (
    //     <Redirect to="/" />
    //   )
    }
  />
};
export default UnGuardedRoute;