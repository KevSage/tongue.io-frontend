const initialState = {
  user: {},
  nation: {},
  phrasebooks: [],
  entries: [],
  phrases: [],
  active_phrasebook: {},
  active_phrase: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      let entries = [];
      let phrases = [];

      if (action.value.phrasebooks) {
        action.value.phrasebooks.map(book => {
          book.entries.map(entry => {
            entries.push(entry);
          });
        });
        action.value.phrasebooks.map(book => {
          book.phrases.map(phrase => {
            phrases.push(phrase);
          });
        });
      }
      return {
        ...state,
        user: action.value,
        nation: action.value.nation,
        phrasebooks: action.value.phrasebooks,
        entries: entries,
        phrases: phrases
      };
    case "SET_ACTIVE_PHRASEBOOK":
      return {
        ...state,
        active_phrasebook: action.value
      };
    case "SET_ACTIVE_PHRASE":
      return {
        ...state,
        active_phrase: action.value
      };
    case "SAVE_ENTRY":
      if (state.active_phrasebook.id) {
        let AP = action.value.filter(
          book => book.id === state.active_phrasebook.id
        )[0];
        return { ...state, phrasebooks: action.value, active_phrasebook: AP };
      } else {
        return { ...state, phrasebooks: action.value };
      }

    case "ADD_PHRASEBOOK":
      let newPhrasebook = this;
      return {
        ...state,
        phrasebooks: [...state.phrasebooks, action.value]
      };
    case "ADD_PHRASE":
      let newActivePhrasebook = { ...state.active_phrasebook };
      if (newActivePhrasebook.phrases) {
        newActivePhrasebook.phrases.push(state.active_phrase);
      } else {
        newActivePhrasebook = { ...newActivePhrasebook, phrases: [] };
        newActivePhrasebook.phrases = [
          ...newActivePhrasebook.phrases,
          state.active_phrase
        ];
      }

      return {
        ...state,
        active_phrasebook: newActivePhrasebook
      };
    case "DELETE_PHRASEBOOK":
      let newestArr = [];
      fetch("http://localhost:3000/phrasebooks/" + action.value, {
        method: "DELETE"
      })
        .then(res => res.text())
        .then(data => {});
      newestArr = state.phrasebooks.filter(
        book => book.id !== parseInt(action.value)
      );
      return {
        ...state,
        phrasebooks: newestArr
      };
    case "DELETE_ENTRY":
      fetch("http://localhost:3000/entries/" + action.value.id, {
        method: "DELETE"
      })
        .then(res => res.text())
        .then(data => {});
      let newArray = state.active_phrasebook.entries.filter(
        entry => entry.id !== parseInt(action.value.id)
      );
      let updatedArray = state.entries.filter(
        entry => entry.id !== action.value.id
      );
      let new_obj = Object.assign({}, state.active_phrasebook);
      new_obj.entries = [...newArray];
      return {
        ...state,
        active_phrasebook: new_obj,
        entries: updatedArray
      };

    default:
      return state;
  }
};
