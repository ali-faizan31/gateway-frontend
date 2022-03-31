import React from 'react';
import { Route } from "react-router-dom";
 
const UnGuardedRoute = ({component: Component, layout: Layout, headerTitle, auth, ...rest}) => { 
  return <Route exact
    {...rest}
    render={(props) =>
    //   !auth  ? (
        <Layout headerTitle={headerTitle}>
          <Component {...props} />
        </Layout>
    //   ) : (
    //     <Redirect to="/" />
    //   )
    }
  />
};
export default UnGuardedRoute;