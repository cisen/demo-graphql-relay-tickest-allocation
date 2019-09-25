import React, { useState } from 'react';
// import { createFragmentContainer } from 'react-relay';
import { Input, Button, InputNumber  } from 'antd';
// import { graphql } from 'babel-plugin-relay/macro';
import environment from '../environment';
import BuyTicketsMutation from './BuyTicketsMutation';
import './BuyTickets.css';

export default function BuyTickets() {
  const [inputPhone, setInputPhone] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputTips, setInputTips] = useState('');
  const [inputTicketCout, setInputTicketCout] = useState();
  const [phone, setPhone] = useState();
  const [seatCodes, setSeatCodes] = useState();

  let getResponseCallback = (response) => {
    const { buyTickets: { ticket: { phone, seatCodes }}} = response;
    setButtonLoading(false);
    setPhone(phone);
    setSeatCodes(seatCodes);
  }

  let submit = () => {
    setButtonLoading(true);
    BuyTicketsMutation.commit(environment, inputPhone, inputTicketCout, getResponseCallback);
  }

  let phoneInput = (e) => {
    let phone = e.currentTarget.value;

    setInputTips('');
    setInputPhone(phone);
  }

  let phoneInputVerify = (e) => {
    let phone = e.currentTarget.value;

    if(!(/^1[3456789]\d{9}$/.test(phone))){
      setInputTips('手机号输入格式错误');
    }
  }

  return (
    <div className="ticket-buy">
      <div className="form">
        <label>手机号：</label>
        <Input onChange={phoneInput} onBlur={phoneInputVerify} />
        <label>购票数量：</label>
        <InputNumber onChange={(value) => setInputTicketCout(value)} max={5} min={0} />
        <Button loading={buttonLoading} onClick={submit}>提交</Button>
      </div>
      {
        inputTips && <p className="tips">{inputTips}</p>
      }
      { phone && <div className="result">
        <p className="">用户 {phone} 买到的票为：</p>
        <p>{seatCodes}</p>
      </div>}
    </div>
  );
}

// export default createFragmentContainer(
//   BuyTickets,
//   {
//     buyTickets: graphql`
//       fragment BuyTickets_buyTickets on BuyTicketsPayload {
//         ticket {
//           phone
//           seatCodes
//         }
//       }
//     `
//   }
// )
