import React, { Component } from "react";
import { Table, Icon, Button, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";

class EntryList extends Component {
  state = {
    hover: "",
  };

  hoverTranslate = (e) => {
    this.setState({
      hover: "",
    });
    let phrase = e.target.innerText.split("Delete");
    phrase = phrase[0];
    console.log(phrase);
    let fromLang = "en";
    let toLang = this.props.active_phrasebook.language.abbr;
    let text = phrase;

    const API_KEY = ["AIzaSyB63vqtGkeGtQ-Bl_6vxGldqQb8G1hpjko"];

    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += "&q=" + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        let txt = document.createElement("textarea");
        txt.innerHTML = response["data"]["translations"][0]["translatedText"];

        this.setState({
          hover: txt.value,
        });
      })
      .catch((error) => {
        console.log("There was an error with the translation request: ", error);
      });
  };

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  render() {
    const { column, data, direction } = this.state;

    const workingPhrases = [];
    return (
      <div>
        <div>
          {this.props.active_phrasebook.entries &&
          this.props.active_phrasebook.entries.length > 0
            ? this.props.active_phrasebook.entries.map((entry) => (
                <div className="entryDiv">
                  {" "}
                  <Popup
                    inverted
                    size="huge"
                    mouseEnterDelay={500}
                    content={this.state.hover}
                    trigger={
                      <p
                        className="entry"
                        onMouseEnter={(e) => this.hoverTranslate(e)}
                      >
                        {entry.phrase.input}
                        <Button
                          onClick={(e, entry) => this.props.delete_entry(entry)}
                          color="red"
                          size="mini"
                          className="entryBtn"
                          id={entry.id}
                          name={entry.phrase.id}
                        >
                          Delete
                        </Button>
                      </p>
                    }
                  />
                </div>
              ))
            : "No phrases yet!"}
        </div>
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return { ...state.user, ...state.active_phrasebook };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete_entry: (data) => dispatch({ type: "DELETE_ENTRY", value: data }),
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(EntryList);
