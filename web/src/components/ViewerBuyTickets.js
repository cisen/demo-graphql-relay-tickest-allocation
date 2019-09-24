/*
 * Created by jemo on 2018-9-2.
 * ViewerTodoList
 */

import React, { Component } from 'react'
import { QueryRenderer } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro';
import BuyTickets from './BuyTickets'
import environment from '../environment'

class ViewerBuyTickets extends Component {
  render() {
  let phone = 1234;
  return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ViewerBuyTicketsQuery($phone: Int) {
            ticket(phone: $phone) {
              phone
            }
          }
        `}
        variables={{phone}}
        render={({error, props}) => {
          if(error) {
            // return <div>Error!</div>
            return <BuyTickets userID="1" />
          }
          if(!props) {
            return <div>Loading...</div>
          }
          console.log(props);
          return (
            <div>
              <BuyTickets userID="1" buyTickets={{}} />
            </div>
          )
        }}
      />
    )
  }
}

export default ViewerBuyTickets
