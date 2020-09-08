import React from "react";
import {
  Divider,
  Grid,
  Image,
  Segment,
  Statistic,
  Icon
} from "semantic-ui-react";
import EditUser from "../components/EditUser";
import { connect } from "react-redux";

function UserInfo(props) {
  return (
    <div>
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <Image src={props.nation.flag} size="small" avatar />
            <p>Username: {props.user.username}</p>
            <p>Email: {props.user.email}</p>
            <p>Country: {props.nation.name}</p>
            <EditUser></EditUser>
          </Grid.Column>
          <Grid.Column>
            <div>
              <Statistic>
                <Statistic.Value text>
                  <Icon name="book" />{" "}
                  {props.phrasebooks ? props.phrasebooks.length : 0}
                </Statistic.Value>
                <Statistic.Label>Phrasebooks</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value text>
                  {props.entries ? props.entries.length : 0}
                </Statistic.Value>
                <Statistic.Label>Translations</Statistic.Label>
              </Statistic>
            </div>
          </Grid.Column>
        </Grid>

        <Divider vertical></Divider>
      </Segment>
      {/* <Translate user={props.user} /> */}
    </div>
  );
}

// const mapStateToProps = state => {
//   return { ...state.user };
// };

const mapStateToProps = state => {
  return { ...state.user, ...state.phrasebooks, ...state.entries };
};

// const mapDispatchToProps = state => {};
export default connect(mapStateToProps)(UserInfo);
