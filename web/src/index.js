import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const apolloClient = new ApolloClient({ uri: 'http://localhost:4000/' });

// ReactDOM.render(<App />, document.getElementById('root'));

const ClientRender = () => {
  let appComponent = (
    <ApolloProvider client={apolloClient}>
        <ApolloConsumer>
          {client => <App apolloClient={client} />}
        </ApolloConsumer>
    </ApolloProvider>
  )
  ReactDOM.render(appComponent, document.getElementById('root'));
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default ClientRender();
