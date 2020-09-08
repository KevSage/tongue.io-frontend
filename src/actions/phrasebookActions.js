import { ADD_PHRASEBOOK } from "./types";

export const addPhrasebook = newBook => dispatch => {
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
      //   let newBookList = [...this.state.phrasebooks, book];
      //   this.setState({
      //     phrasebooks: newBookList
      //   });
      dispatch({
        type: ADD_PHRASEBOOK,
        payload: book
      });
    });
};
