import React from 'react'
import { Header, Icon} from "semantic-ui-react";


const PhrasebookHeader = props => {
    return (
        <div>
        <Header as="h2" icon>
        <Icon name="language" color="violet" />
        My Phrasebooks
        <Header.Subheader>
          Study phrasebooks or add to your collection.
        </Header.Subheader>
      </Header>
      </div>
    )
}
export default PhrasebookHeader;
