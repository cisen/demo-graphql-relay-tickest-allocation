import React from 'react';
import BuyTickets from './components/BuyTickets';
import './App.css';

function App(props) {
  const { apolloClient } = props;

  console.log(apolloClient);
  return (
    <div className="App">
      <BuyTickets apolloClient={apolloClient} />
    </div>
  );
}

export default App;
