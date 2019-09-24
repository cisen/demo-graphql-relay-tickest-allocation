/*
 * Created by jemo on 2018-9-2.
 * ChangeTodoStatusMutation
 */

import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro';
import { ConnectionHandler } from 'relay-runtime';

// We start by defining our mutation from above using `graphql`
const mutation = graphql`
  mutation BuyTicketsMutation($input: BuyTicketsInfo!) {
    buyTickets(input: $input) {
      ticket {
        phone
        seatCodes
      }
    }
  }
`

function getOptimisticResponse(phone, ticketsCout) {
  return {
    buyTickets: {
      ticket: {
        phone,
        ticketsCout
      },
    },
  }
}

function sharedUpdater(store, phone, newEdge) {
  // Get the current user record from the store
  const userProxy = store.get(phone);

  // Get the user's Todo List using ConnectionHandler helper
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'BuyTickets_buyTickets', // This is the connection identifier, defined here
    // https://github.com/relayjs/relay-examples/blob/master/todo/js/components/TodoList.js#L76
  );

  // Insert the new todo into the Todo List connection
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
}

let tempID = 0;

function commit(
  environment,
  phone,
  ticketsCout,
  callBack
) {
  // Now we just call commitMutation with the appropriate parameters
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: { phone, ticketsCout },
      },
      onCompleted: (response, errors) => {
        console.log('Response received from server.', response);
        callBack && callBack(response);
      }
    }
  )
}

export default { commit }
