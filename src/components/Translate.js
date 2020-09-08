import React, { Component } from "react";
import {
  Form,
  Button,
  Container,
  Dropdown,
  Segment,
  Divider,
} from "semantic-ui-react";
import { Animated } from "react-animated-css";
import EntryList from "../components/EntryList";
import { connect } from "react-redux";
class Translate extends Component {
  state = {
    input: "",
    translation: "",
    language: "",
    category: "",
    abbr: "",
    activePhrase: {},
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  translate = () => {
    let phrase = {
      input: this.state.input,
      category: this.state.category,
      target: this.props.active_phrasebook.language.abbr,
    };

    fetch("http://localhost:3000/phrases", {
      method: "post",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify(phrase),
    })
      //   .then(res => res.json())
      .then((res) => res.json())
      .then((data) => {
        let activePhrase = data[1];
        this.setState({
          activePhrase: activePhrase,
          translation: data[0].data.translations[0].translatedText,
        });
        this.props.set_active_phrase(data[1]);
      })
      .catch((err) => console.log(err));
  };

  setCategory = (e) => {
    let cat = e.target.textContent;
    console.log(cat);
    this.setState({
      category: cat,
    });
  };

  clearPhrase = () => {
    this.setState({
      input: "",
    });
  };

  render() {
    const categories = [
      {
        key: "Food",
        text: "Food",
        value: "Food",
        id: "Food",
        // image: { avatar: true, src: "../icons/iconfinder_28_3319616.png" }
      },
      {
        key: "Transportation",
        text: "Transportation",
        value: "Transportation",
        // image: { avatar: true, src: "../icons/iconfinder_28_3319616.png" }
      },
      {
        key: "Shopping",
        text: "Shopping",
        value: "Shopping",
        // image: { avatar: true, src: "../icons/iconfinder_28_3319616.png" }
      },
      {
        key: "Greetings",
        text: "Greetings",
        value: "Greetings",
        // image: { avatar: true, src: "/images/avatar/small/christian.jpg" }
      },
      {
        key: "Emergency",
        text: "Emergency",
        value: "Emergency",
        // image: { avatar: true, src: "/images/avatar/small/matt.jpg" }
      },
      {
        key: "Sightseeing",
        text: "Sightseeing",
        value: "Sightseeing",
        // image: { avatar: true, src: "/images/avatar/small/justen.jpg" }
      },
      {
        key: "Money",
        text: "Money",
        value: "Money",
        // image: { avatar: true, src: "/images/avatar/small/justen.jpg" }
      },
      {
        key: "Numbers and Time",
        text: "Numbers and Time",
        value: "Numbers and Time",
        // image: { avatar: true, src: "/images/avatar/small/justen.jpg" }
      },
      {
        key: "Directions",
        text: "Directions",
        value: "Directions",
        // image: { avatar: true, src: "/images/avatar/small/justen.jpg" }
      },
      {
        key: "Hotel",
        text: "Hotel",
        value: "Hotel",
        // image: { avatar: true, src: "/images/avatar/small/justen.jpg" }
      },
    ];
    let phrase_id = this.state.activePhrase.id;
    return (
      <Segment>
        <div>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={`${
                  this.props.active_phrasebook.language
                    ? this.props.active_phrasebook.language.name
                    : "Choose a phrasebook"
                }`}
                // label="Translation"
                name="input"
                placeholder="Enter phrase to be translated"
                onChange={this.handleInput}
                value={this.state.input}
                className="translationHeader"
              />
            </Form.Group>
          </Form>

          <div
            fluid
            dangerouslySetInnerHTML={{ __html: this.state.translation }}
            className="translation-text"
          ></div>

          <Button.Group vertical labeled icon>
            <Button
              basic
              color="green"
              icon="angle double right"
              content="Translate"
              onClick={this.translate}
            />
            <Button
              basic
              color="yellow"
              icon="angle double down"
              content="Save"
              value={phrase_id}
              onClick={(data) => this.props.createEntry(phrase_id)}
            />
            <Button
              icon="cancel"
              content="Clear"
              basic
              color="red"
              onClick={this.clearPhrase}
            />
          </Button.Group>
        </div>
        <Divider section />
        <div>Phrase Bank</div>

        <EntryList
        // entries={this.props.active_phrasebook.value.entries}
        // activePhrasebook={this.props.activePhrasebook}
        ></EntryList>
      </Segment>
    );
  }
}
const mapstateToProps = (state) => {
  return { ...state.user, ...state.active_phrasebook, ...state.active_phrase };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_active_phrase: (data) =>
      dispatch({ type: "SET_ACTIVE_PHRASE", value: data }),
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(Translate);
