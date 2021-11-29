import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';

import Main from './Main';
import Profile from './Profile';
import Register from './Register';
import Login from './Login';
import ForgotPass from './ForgotPass';
import UpdateProfile from './UpdateProfile';
import Preview from './Preview';


function AuthRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? ( 
          <Component {...props} />
        ) : ( 
          <Redirect to='/' />
        )
      }
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/:user_name' component={Profile} />
        <Route exact path='/app/register' component={Register} />
        <Route exact path='/app/login' component={Login} />
        <Route exact path='/app/forgot' component={ForgotPass} />
        <AuthRoute exact path='/app/update' component={UpdateProfile} />
        <AuthRoute exact path='/app/preview' component={Preview} />
        {/* <AuthRoute exact path='/edit/:user_name' component={} /> */}
      </Switch>
    </AuthProvider>
  );
}

export default App;
