import React, { Component } from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/UserInfo";
import PhrasebookList from "../components/PhrasebookList";
import { Container, Segment, Grid, Divider } from "semantic-ui-react";
import AddBook from "../components/AddBook";
import PhrasebookHeader from "../components/PhrasebookHeader";
import Translate from "../components/Translate";
import { connect } from "react-redux";
class Dashboard extends Component {
  state = {
    user: {},
    nation: {},
    phrasebooks: [],
    entries: [],
    activePhrasebook: "",
    activePhrase: "",
    phrases: []
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:3000/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(data => {
          this.props.set_user(data);
        });
    }
  }

  addBook = e => {
    let lang = document.querySelector(".book_language div").textContent;

    let newBook = {
      user_id: this.props.user.id,
      average_score: 0,
      language: lang
    };
    fetch("http://localhost:3000/phrasebooks", {
      method: "post",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(book => {
        let newBookList = [...this.state.phrasebooks, book];
        this.setState({
          phrasebooks: newBookList
        });
        this.props.add_phrasebook(book);
      });
  };

  createEntry = entry => {
    console.log(entry);
    let newEntry = {
      phrasebook_id: this.props.active_phrasebook.id,
      phrase_id: entry
    };

    fetch("http://localhost:3000/entries", {
      method: "POST",
      body: JSON.stringify(newEntry),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        let newPhrasebooks = [...this.state.phrasebooks];
        this.setState({
          phrasebooks: data
        });
        this.props.save_entry(data);
        this.props.add_phrase();
        this.forceUpdate();
      });
  };
  getTotalEntries = () => {
    let total = 0;
    this.props.phrasebooks.map(book => {
      total += book.entries.length;
    });
    debugger;
  };

  logout = () => {
    localStorage.clear();
  };

  render() {
    return (
      <div>
        <Navbar logout={this.logout} />
        <UserInfo
          user={this.state}
          entries={this.getTotalEntries}
          phrasebooks={this.state.phrasebooks}
        />
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Container className="main">
                <PhrasebookHeader />
                <AddBook user={this.state} addBook={this.addBook} />

                <PhrasebookList />
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Translate
                phrasebook={this.state.activePhrasebook}
                entries={this.state.entries}
                createEntry={this.createEntry}
                activePhrasebook={this.state.activePhrasebook}
              />
            </Grid.Column>
          </Grid>

          <Divider vertical>Translate</Divider>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.user,
    ...state.active_phrasebook,
    ...state.active_phrase,
    ...state.phrasebooks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_user: data => dispatch({ type: "SET_USER", value: data }),
    set_active_phrasebook: data =>
      dispatch({ type: "SET_ACTIVE_PHRASEBOOK", value: data }),
    save_entry: data => dispatch({ type: "SAVE_ENTRY", value: data }),
    add_phrasebook: data => dispatch({ type: "ADD_PHRASEBOOK", value: data }),
    delete_phrasebook: data =>
      dispatch({ type: "DELETE_PHRASEBOOK", value: data }),
    add_phrase: data => dispatch({ type: "ADD_PHRASE", value: data })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
