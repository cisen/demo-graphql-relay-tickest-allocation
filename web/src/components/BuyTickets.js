import React from 'react';
import { QueryRenderer, createFragmentContainer } from 'react-relay';
import { Input, Button } from 'antd';
// import { graphql } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro';
import environment from '../environment';
import BuyTicketsMutation from './BuyTicketsMutation';

function BuyTickets(props) {
  const { userID, relay } = props

  let test = () => {
    BuyTicketsMutation.commit(environment, 123456, 2)
  }

  return (
    <>
    手机号：<Input />
    购票数量：<Input />
    <Button onClick={test}>22</Button>
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
      </>
  );
}

export default BuyTickets;


// export default createFragmentContainer(
//   BuyTickets,
//   graphql`
//     # As a convention, we name the fragment as
//     # '<ComponentFileName>_<propName>'
//     fragment BuyTickets_buyTickets on Ticket {
//       id
//       phone
//       seatCodes
//     }
//   `
// )
