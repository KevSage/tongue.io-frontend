import React, { Component } from "react";
import { Container, Button, Form, Dropdown } from "semantic-ui-react";
import { COUNTRY_OPTIONS } from "../countriesData.js";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    nation: ""
  };

  handleFormInput = event => {
    if (event.target.name) {
      this.setState({
        [event.target.name]: event.target.value
      });
    } else {
      this.setState({
        nation: event.target.children[1].textContent
      });
    }
    console.log(this.state);
  };

  createUser = event => {
    event.preventDefault();

    let newUser = {
      user: {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        nation: this.state.nation
      }
    };

    fetch("http://localhost:3000/users", {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.history.push("/login");
      });

    console.log(newUser);
  };

  render() {
    return (
      <div className="signup">
        <div className="loginHeader">Tongue.io</div>

        <Container>
          <Form
            onSubmit={event => this.createUser(event)}
            className="signinForm"
          >
            <Form.Field>
              <label>Username</label>
              <input
                placeholder="Username"
                name="username"
                onChange={this.handleFormInput}
              />
            </Form.Field>
            <Form.Field>
              <label>Email Address</label>
              <input
                placeholder="Email Address"
                name="email"
                onChange={this.handleFormInput}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                name="password"
                onChange={this.handleFormInput}
                type="password"
              />
            </Form.Field>

            <Form.Field>
              <label htmlFor="country">Country</label>
              <Dropdown
                name="nation"
                // onChange={this.updateCountry}
                onChange={this.handleFormInput}
                options={COUNTRY_OPTIONS}
                search
                selection
                selectOnBlur={false}
                // value={this.state.nation}
                // className="country"
              />
            </Form.Field>

            <br />
            <Button type="submit" color="red">
              Submit
            </Button>
          </Form>
          <div className="registerLinks">
            Already registered?{" "}
            <Link to="/login" className="registerLinks">
              Login
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}
export default Signup;
