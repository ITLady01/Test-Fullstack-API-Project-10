import React from './node_modules/react';
import {Link} from './node_modules/react-router-dom';

export default () => ( <div className = "bounds">
    <h1 > Not Found </h1>
    <p> Sorry! We did not find the page that you are looking
    for. </p> <Link to = "/"
    className = "button button-secondary" > Return to Courses </Link> 
    </div>
);