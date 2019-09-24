import React from 'react';
import { Link } from 'react-router-dom'

export default ({ context }) => {
    const userAuth = context.authenticatedUser;
    return (
        <div className="bounds">
            <div className="grid-100">
                <h1>{userAuth.firstName} You are authenticated!</h1>
                <p>Your username is {userAuth.emailAddress}</p>
            </div>
            <div>
                <Link to="/" className="button button-secondary" >
                    Return to List
        </Link>
            </div>
        </div>
    );
}
