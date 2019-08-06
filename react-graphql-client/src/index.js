import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'graphql-js-client';
import typeBundle from './types';
import './App.css';

export const client = new Client(typeBundle, {
  // Paste your shopify url at below line before you proceed
  url: 'YOUR_SOPIFY_URL_HERE',
  fetcherOptions: {
    // Paste your Access Token at below line before you proceed
    headers: {
      'X-Shopify-Storefront-Access-Token': 'YOUR_ACCESS_TOKEN_HERE'
    }
  }
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
