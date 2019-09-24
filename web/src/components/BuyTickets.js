import React, { useState } from 'react';
import { createFragmentContainer } from 'react-relay';
import { Input, Button } from 'antd';
// import { graphql } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro';
import environment from '../environment';
import BuyTicketsMutation from './BuyTicketsMutation';
import './BuyTickets.css';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

function BuyTickets(props) {
  const [inputPhone, setInputPhone] = useState();
  const [inputTicketCout, setInputTicketCout] = useState();
  const [phone, setPhone] = useState();
  const [seatCodes, setSeatCodes] = useState();

  console.log(inputPhone, inputTicketCout)

  let getResponse = (response) => {
    console.log(response);
    const { buyTickets: { ticket: { phone, seatCodes }}} = response;
    setPhone(phone);
    setSeatCodes(seatCodes);
  }

  let buyTicket = () => {
    var res = BuyTicketsMutation.commit(environment, inputPhone, inputTicketCout, getResponse);
    console.log(res);
  }

  return (
    <div>
      <div className="ticket_buy_input">
        <label>手机号：</label><Input onChange={(e) => setInputPhone(e.currentTarget.value)} />
        <label>购票数量：</label><Input onChange={(e) => setInputTicketCout(e.currentTarget.value)}/>
        <Button onClick={buyTicket}>提交</Button>
      </div>
      { phone && <p className="ticket_result">
        <span className="">用户 {phone} 买到的票为：</span>
        <span>{seatCodes}</span>
      </p>}
    </div>
  );
}


// export default BuyTickets;

export default createFragmentContainer(
  BuyTickets,
  {
    buyTickets: graphql`
      # As a convention, we name the fragment as
      # '<ComponentFileName>_<propName>'
      fragment BuyTickets_buyTickets on BuyTicketsPayload {
        ticket {
          phone
          seatCodes
        }
      }
    `
  }
)
