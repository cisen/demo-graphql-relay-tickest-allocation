import React from 'react'
import { QueryRenderer } from 'react-relay'
import BuyTickets from './BuyTickets'
import environment from '../environment'

function ViewerBuyTickets() {
  return (
      <QueryRenderer
        environment={environment}
        variables={{}}
        render={() => {
          return (
            <BuyTickets />
          )
        }}
      />
    )
}

export default ViewerBuyTickets
