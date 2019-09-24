import React from 'react';
import {createFragmentContainer, QueryRenderer } from 'react-relay';
// import { graphql } from 'react-relay'
import {graphql} from 'babel-plugin-relay/macro';
import environment from '../environment';

function BuyTickets(props) {
  const { userID } = props
  return (
    <QueryRenderer
        environment={environment}
        query={graphql`
          query BuyTicketsQuery($userID: ID!) {
            seat(id: $userID) {
              seatLen
            }
          }
        `}
        variables={{userID}}
        render={({error, props}) => {
          if(error) {
            return <div>Error!</div>
          }
          if(!props) {
            return <div>Loading...</div>
          }
          console.log(props);
          return (
            <div>
              User ID: {props.seat.seatLen}
            </div>
          )
        }}
      />
  );
}

export default BuyTickets;
