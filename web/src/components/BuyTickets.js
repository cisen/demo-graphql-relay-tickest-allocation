import React, { useState } from 'react';
import { Input, Button, InputNumber  } from 'antd';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import './BuyTickets.css';

function BuyTickets(props) {
  const { apolloClient } = props;
  const [inputPhone, setInputPhone] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputTips, setInputTips] = useState('');
  const [inputTicketCout, setInputTicketCout] = useState();
  const [phone, setPhone] = useState();
  const [seatCodes, setSeatCodes] = useState();

  // 提交购票
  let submit = () => {
    setButtonLoading(true);
    const mutationSQL = gql`
      mutation BuyTicketsMutation($phone: String!, $ticketsCout: Int!) {
        buyTickets(input: {phone: $phone, ticketsCout: $ticketsCout}) {
          ticket {
            phone
            seatCodes
          }
        }
      }
    `;

    apolloClient.mutate({
      mutation: mutationSQL,
      variables: {
        phone: inputPhone,
        ticketsCout: inputTicketCout
      }
    }).then((data) => {
      const { data: {buyTickets: { ticket }}} = data;

      setButtonLoading(false);
      setPhone(ticket.phone);
      setSeatCodes(ticket.seatCodes);
    });
  }
  // 输入手机号时，需要清除提示
  let phoneInput = (e) => {
    let phone = e.currentTarget.value;

    setInputTips('');
    setInputPhone(phone);
  }
  // 加点提示把，不过滤了
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
        <InputNumber onChange={(value) => setInputTicketCout(value)} max={5} min={1} />
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

export default withApollo(BuyTickets)
