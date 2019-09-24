import React from 'react';
import { createFragmentContainer } from 'react-relay';
import { Input, Button } from 'antd';
// import { graphql } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro';
import environment from '../environment';
import BuyTicketsMutation from './BuyTicketsMutation';
import './BuyTickets.css';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

class BuyTickets extends React.Component {
  render() {
    const { userID, relay } = this.props

    let buyTicket = () => {
      BuyTicketsMutation.commit(environment, 123456, 2);
    }

    return (
      <div>
      <div className="ticket_buy_input">
        <label>手机号：</label><Input />
        <label>购票数量：</label><Input />
        <Button onClick={buyTicket}>提交</Button>
      </div>
      {/* <QueryRenderer
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
        /> */}
        </div>
    );
  }
}

// export default BuyTickets;

export default createFragmentContainer(
  BuyTickets,
  {
    buyTickets: graphql`
      # As a convention, we name the fragment as
      # '<ComponentFileName>_<propName>'
      fragment BuyTickets_buyTickets on Ticket {
        phone
        seatCodes
      }
    `
  }
)
