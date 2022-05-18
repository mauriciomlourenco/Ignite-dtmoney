import React from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import {  createServer, Model } from 'miragejs';
import { App } from './App';


/*
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

/*
// React 18
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
*/

// Configuração do miragejs
createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00'),
        }
      ]
    })
  },
  
  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      /*return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date(),
        }
      ]
      */
     return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data)
    })
  }
});

const container = document.getElementById('root');
if(!container) throw new Error('Failed to find the root element')
const root = createRoot(container);
//root.render(<App tab="home" />);
root.render(
  <App />
);

