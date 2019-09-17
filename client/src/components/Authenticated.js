    import React from './node_modules/react';
    import {Link} from './node_modules/react-router-dom';
    
    export default ({context}) => {
        const UserAuth = context.authenticatedUser.user;

    return (
        <div className="bounds" >
            <div className = "grid-100" >
            <h1 > {UserAuth.name
            }, your account has been created! </h1> <p > Your username is {
                UserAuth.username
            } </p> <Link to = "/"
            className = "button button-secondary"> Return to Courses </Link> \
            </div> </div>
        );
}
