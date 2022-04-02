import React from 'react'
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ component: Component, user, ...props }) => {
  
  return (
      <Route exact {...props} render={(props) => !user ? <Component {...props} /> : <Redirect to='/blogs' />} />
  );
}