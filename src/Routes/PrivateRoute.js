// import React  from 'react'
// import { Route } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// export const PrivateRoute = ({component:Component, user, ...props}) => {
  
//   return (
//     <Route exact {...props} render={(props)=> user ? <Component {...props} /> : <Navigate replace to='/login' />} />
//   );
// }