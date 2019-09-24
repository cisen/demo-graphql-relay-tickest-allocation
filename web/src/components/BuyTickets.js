import React from 'react';
import {createFragmentContainer, QueryRenderer } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from '../environment';

function BuyTickets(props) {
  const { userID } = props
  return (
    <QueryRenderer
        environment={environment}
        query={graphql`
          query UserTodoListQuery($userID: ID!) {
            node(id: $userID) {
              id
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
          return (
            <div>
              User ID: {props.node.id}
            </div>
          )
        }}
      />
  );
}

export default BuyTickets;
