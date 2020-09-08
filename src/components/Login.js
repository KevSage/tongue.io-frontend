import React, { Component } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleFormInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: { ...this.state } })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        this.props.history.push("/dashboard");
        console.log(localStorage);
      });
  };

  render() {
    return (
      <div className="login">
        <div className="loginHeader">Tongue.io</div>
        <Container>
          <Form
            onSubmit={event => this.handleSubmit(event)}
            className="signinForm"
          >
            <Form.Field>
              <label>Email Address</label>
              <input
                placeholder="Email Address"
                name="email"
                value={this.state.name}
                onChange={this.handleFormInput}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleFormInput}
                type="password"
              />
            </Form.Field>
            <Button type="submit" color="red">
              Submit
            </Button>
            <Link to="/signup" className="registerLinks">
              Signup
            </Link>
          </Form>
        </Container>
      </div>
    );
  }
}
export default Login;
