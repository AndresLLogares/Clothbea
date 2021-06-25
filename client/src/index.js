import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store/store.js'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { KEY_STRIPE } from './components/Secret/secret.js';
const stripePromise = loadStripe(KEY_STRIPE, { locale: 'en' });

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
    <Elements stripe={stripePromise} >
      <App />
      </Elements>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

