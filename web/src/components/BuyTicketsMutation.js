/*
 * Created by jemo on 2018-9-2.
 * ChangeTodoStatusMutation
 */

import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro';

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

function commit(
  environment,
  phone,
  ticketsCout,
) {
  // Now we just call commitMutation with the appropriate parameters
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: { phone, ticketsCout },
      },
      optimisticResponse: getOptimisticResponse(phone, ticketsCout),
    }
  )
}

export default { commit }
