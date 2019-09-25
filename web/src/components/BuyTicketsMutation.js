import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro';

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

function commit(
  environment,
  phone,
  ticketsCout,
  callBack
) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: { phone, ticketsCout },
      },
      onCompleted: (response, errors) => {
        callBack && callBack(response);
      }
    }
  )
}

export default { commit }
