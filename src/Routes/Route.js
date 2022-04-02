import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { onAuthStateChanged } from '@firebase/auth';

import { auth } from '../Firebase';
import { Dashboard, Login, Signup, TodoTasks, Portfolio, Blog, CreateBlog, Showblogs, Profile, TypingTest } from '../Screens';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoutes';
import { loading } from '../Assets';
import { SpinngLoader } from '../Containers';

export const Routes = (props) => {

  const publicroutes = [
    { path: '/', component: Portfolio },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
  ]
  const privateroutes = [
    { path: '/', component: Portfolio },
    { path: '/Portfolio/:Ritik-PAl', component: Portfolio },
    { path: '/test-typing', component: TypingTest },
    { path: '/todo-app', component: TodoTasks },
    { path: '/blogs', component: Blog },
    { path: '/createblog', component: CreateBlog },
    { path: '/blogs/:Blogdetail', component: Showblogs },
    { path: '/Profile', component: Profile },
  ]
  
  const [user, setUser] = useState();
  const [loader, setloader] = useState(false)

  useEffect(() => {
    handleauth()
  }, [])

  const handleauth = () => {
    setloader(true)
    onAuthStateChanged(auth, user => {
      if (user) setUser(user);
        setloader(false)
    })
  }

  return (
    <Router>
      <Switch>
      {loader ?  <SpinngLoader/>:
        <div> 
          {privateroutes.map((value,index)=> 
            <PrivateRoute exact key={index} 
            path={value.path} user={user} 
            component={value.component}/>)}

          {publicroutes.map((value,index)=>
            <PublicRoute key={index} exact
            path={value.path} user={user} 
            component={value.component}/>)}
        </div>
      }
      </Switch>
    </Router>
  )
}