import React from 'react';
import { Link } from 'react-router-dom';

export default ({ context }) => {

  let userAuth = context.authenticatedUser;

  if (userAuth) {
    userAuth = context.authenticatedUser.user;
  }

  return (
      <div className="header">
        <div className="bounds">
          <Link to="/"><h1 className="header--logo">Courses</h1></Link>
          <nav>
              {userAuth ?
                    <React.Fragment>
                        <span>Welcome, {userAuth.name}!</span>
                        <Link to="/signout">Sign Out</Link>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <Link className="signup" to="/signup">Sign Up</Link>
                        <Link className="signin" to="/signin">Sign In</Link>
                    </React.Fragment>
              }
          </nav>
        </div>
      </div>
  );
}
