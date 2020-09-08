import React, { Component } from "react";
import { Button, Image, Modal, Icon, Form, Dropdown } from "semantic-ui-react";
import { COUNTRY_OPTIONS } from "../countriesData.js";
import { connect } from "react-redux";

class EditUser extends Component {
  state = {
    open: false,
    username: "",
    email: "",
    nation: ""
  };

  handleFormInput = event => {
    const user_id = this.props.user.user.id;
    this.setState({
      user_id: user_id
    });
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
  submitEdit = event => {
    let updatedUser = {
      user_id: this.state.user_id,
      username: this.state.username,
      email: this.state.email,
      nation: this.state.nation
    };
    fetch("http://localhost:3000/users/" + updatedUser.user_id, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  };
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Icon name="pencil alternate" onClick={this.show("inverted")} />

        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          className="editForm"
        >
          <Modal.Header>Edit Profile</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={this.props.nation.flag} />
            <Modal.Description>
              <Form>
                <Form.Field>
                  <label>Edit Username</label>
                  <input
                    placeholder="Username"
                    name="username"
                    onChange={this.handleFormInput}
                    defaultValue={this.props.user.username}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Edit Email Address</label>
                  <input
                    placeholder="Email Address"
                    name="email"
                    onChange={this.handleFormInput}
                    defaultValue={this.props.user.email}
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
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Looks good!"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ...state.user };
};
export default connect(mapStateToProps)(EditUser);
