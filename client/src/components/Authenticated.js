   import React from 'react';
import { Link } from 'react-router-dom';

export default ({ context }) => {
  const userAuth = context.authenticatedUser.user;

  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{userAuth.name}, your account has been created!</h1>
      <p>Your username is {userAuth.username}</p>
      <Link to="/" className="button button-secondary">Return to Courses</Link>
    </div>
  </div>
  );
}