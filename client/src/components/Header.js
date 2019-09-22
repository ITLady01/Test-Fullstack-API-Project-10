import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  // context from props
  const { context } = props;
  // authenticated user from context
  const userAuth = context.authenticatedUser;

  return(
    <div className="header">
      <div className="bounds">
        <h1 onClick={() => window.location.href = '/'} className="header--logo">Courses</h1>
        {
          userAuth ?
          <nav>
            <span>Welcome, {userAuth.firstName}!</span>
            <NavLink className="signout" to="/signout">Sign Out</NavLink>
          </nav> :
          <nav>
            <NavLink
              className="signup"
              to={{
                pathname:'/signup',
                state: { from: props.location },
              }}
            >Sign Up</NavLink>

            <NavLink
              className="signin"
              to={{
                pathname:'/signin',
                state: { from: props.location },
              }}
            >Sign In</NavLink>
          </nav>
        }
      </div>
    </div>
  );
}

export default Header;