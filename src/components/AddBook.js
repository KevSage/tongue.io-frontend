import React from "react";
import { Button, Container, Dropdown } from "semantic-ui-react";
import Languages from "../Languages";

// const languages = { Languages };

const AddBook = props => {
  return (
    <div className="add_book_container">
      <Container>
        <Dropdown
          placeholder="Select a Language"
          options={Languages}
          fluid
          selection
          className="book_language"
          // onChange={handleSelection}
        />

        <Button
          className="add_book_btn"
          color="red"
          onClick={e => {
            props.addBook(e);
          }}
        >
          Add Book
        </Button>
      </Container>
    </div>
  );
};
export default AddBook;
