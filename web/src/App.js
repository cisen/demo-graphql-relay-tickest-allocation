import React from 'react';
import {createFragmentContainer, graphql } from 'react-relay';
import BuyTickets from './components/BuyTickets';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>test</div>
      <BuyTickets userID="1" />
    </div>
  );
}

export default App;
