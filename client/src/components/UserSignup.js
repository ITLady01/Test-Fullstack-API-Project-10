import React, { Component} from 'react';
import { Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class UserSignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmationPassword: "",
        isConfirmed: false,
        errors: [],
    };

    //redirect the user to the course list
    returnToList = (event) => {
        event.preventDefault();
        this.props.history.push("/");
    }

    //update the user first name state
    updateUserFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        });
    }

    //update the user last name state
    updateUserLastName = (event) => {
        this.setState({
            lastName: event.target.value
        });
    }

    //update the user email address state
    updateUserEmailAddress = (event) => {
        this.setState({
            emailAddress: event.target.value
        });
    }

    //update the user password state
    updateUserPassword = async (event) => {
        await this.setState({
            password: event.target.value
        });
        //check if current password state matches the password confirmation state
        if (this.state.confirmationPassword === this.state.password) {
            this.setState({
                isConfirmed: true
            }); //if true then password is confirmed
        } else {
            this.setState({
                isConfirmed: false
            }); //if false password is not confirmed
        }
    }

    //confirm the user's password
    updateConfirmationPassword = async (event) => {
        //update the password confirmation state
        await this.setState({
            confirmationPassword: event.target.value
        });
        //check if current password confirmation state matches the password state
        if (this.state.confirmationPassword === this.state.password) {
            this.setState({
                isConfirmed: true
            }); //if true then password is confirmed
        } else {
            this.setState({
                isConfirmed: false
            }); //if false password is not confirmed
        }
    }

    //submit handler
    handleSubmit = (event) => {
        event.preventDefault();
        //obtain user state, and previous route location
        const {
            context
        } = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password
        } = this.state;
        const {
            from
        } = this.props.location.state || {
            from: {pathname: "/" }
        };
        //attempt to sign the user up to the site
        context.actions.signUp({
                firstName,
                lastName,
                emailAddress,
                password
            })
            .then(errors => {
                if (errors.length) {
                    this.setState({
                        errors
                    }); //there was an error, set the error state to validation errors
                } else {
                    //if the user is signed up successfully, automatically sign them in to the site
                    context.actions.signIn(emailAddress, password)
                        .then(user => {
                            user.password = password;
                            context.actions.setAuthenticatedUser(user); //set the user state to the global authenticated user state
                            this.props.history.push(from); //redirect the user to the route they previously visited
                        })
                        .catch(err => {
                            console.log(err);
                            this.props.history.push("/forbidden"); //the user is unauthorized
                        })
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push("/error"); //there was an error, likely a server error
            });
    }

    //render a sign-up form
    render() {
        let id = 1;
        return (
        <div className="bounds" >
            <div className = "grid-33 centered signin" >
            <h1 > Sign Up </h1> {
                (this.state.errors.length > 0) &&
                <div >
                    <h2 className = "validation--errors--label" > Validation errors </h2> <
                    div className = "validation-errors" >
                    <ul > {
                        this.state.errors.map(error => {
                                return ( < li key = {
                                        id++
                                    } > {
                                        error
                                    } </li>);
                                })
                        } {
                            (!this.state.isConfirmed) && <li > Passwords must match
                            for confirmation </li>
                        } </ul> </div> </div>
                    } <div >
                    <form onSubmit = {
                        this.handleSubmit
                    } >
                    <div >
                    <input id = "firstName"
                name = "firstName"
                type = "text"
                className = ""
                placeholder = "First Name"
                value = {
                    this.state.firstName
                }
                onChange = {
                    this.updateUserFirstName
                }
                /> </div> <div >
                    <input id = "lastName"
                name = "lastName"
                type = "text"
                className = ""
                placeholder = "Last Name"
                value = {
                    this.state.lastName
                }
                onChange = {
                    this.updateUserLastName
                }
                /> </div> <div >
                    <input id = "emailAddress"
                name = "emailAddress"
                type = "text"
                className = ""
                placeholder = "Email Address"
                value = {
                    this.state.emailAddress
                }
                onChange = {
                    this.updateUserEmailAddress
                }
                /> </div> <div>
                    < input id = "password"
                name = "password"
                type = "password"
                className = ""
                placeholder = "Password"
                value = {
                    this.state.password
                }
                onChange = {
                    this.updateUserPassword
                }
                /> </div> <div>
                    <input id = "confirmPassword"
                name = "confirmPassword"
                type = "password"
                className = ""
                placeholder = "Confirm Password"
                value = {
                    this.state.confirmationPassword
                }
                onChange = {
                    this.updateConfirmationPassword
                }
                /> </div> <div className = "grid-100 pad-bottom" >
                    <button className = "button"
                type = "submit" > Sign Up </button> <button className = "button button-secondary"
                onClick = {
                        this.returnToList
                    } > Cancel </button> 
                    </div> </form> </div> <p> & nbsp; </p>
                <p> Already have a user account ? <Link to = "/signin"> Click here </Link> to sign in!</p>
                    </div> </div>
            );
        }
    }

    export default withRouter(UserSignUp);