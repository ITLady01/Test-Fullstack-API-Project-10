import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
  };

  //redirect the user to the course list
  returnToList = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  //update user email address state
  updateUserEmailAddress = (e) => {
    this.setState({ emailAddress: e.target.value });
  }

  //update user password state
  updateUserPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  //submit handler
  handleSubmit = (e) => {
    e.preventDefault();
    //abtain the global state and location of previous route
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    //sign the user in with the user state
    context.actions.signIn(this.state.emailAddress, this.state.password)
      .then(user => {
        if(user !== null) { //sign in was successful
          user.password = this.state.password;
          context.actions.setAuthenticatedUser(user); //set the user to the global authenticated user state
          this.props.history.push(from); //redirect user to the route they previously visited
        } else {
          this.props.history.push("/forbidden"); //user is unauthorized
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error"); //there was an error, likely a server error
      });
  }

  //render a sign-in form
  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className=""
                  placeholder="Email Address" value={this.state.emailAddress}
                  onChange={this.updateUserEmailAddress} />
              </div>
              <div>
                <input id="password" name="password" type="password" className=""
                  placeholder="Password" value={this.state.password}
                  onChange={this.updateUserPassword} />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={this.returnToList}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  }
}
export default withRouter(UserSignIn);