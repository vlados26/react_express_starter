// mkdir react_express

// cd react_express

// npm init
// In react_express/package.json add:
{
  "name": "react_express",
  "version": "1.0.0",
  "description": "React and Express",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Vlad",
  "license": "MIT"
}

// npm i express concurrently

// npm i nodemon --save-dev
// In react_express/package.json add:
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  },

// In react_express touch server.js
// In react_express/server.js add:
const express = require('express');
const app = express();
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John1', lastName: 'Doe1'},
    {id: 2, firstName: 'John2', lastName: 'Doe2'},
    {id: 3, firstName: 'John3', lastName: 'Doe3'}
  ];

  res.json(customers);
});
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

// npm run server
// http://localhost:5000/api/customers


// New terminal ↓
// cd react_express

// npm i -g create-react-app

// create-react-app client
// In react_express/client/package.json add:
"proxy": "http://localhost:5000"

// cd client

// npm start
// http://localhost:3000/

// In react_express/client/src mkdir components
// In react_express/client/src/components mkdir customers
// In react_express/client/src/components touch customers.css
// In react_express/client/src/components touch customers.js

// In react_express/client/src/components touch customers.js copy react_express/client/src/App.js
import React, { Component } from 'react';
import './customers.css';
class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    }
  }
  componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched..', customers)));
  }
  render() {
    return (
      <div>
        <h2>Customers</h2>
      </div>
    );
  }
}
export default Customers;

// In react_express/client/src/App.js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers/customers';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Customers />
      </div>
    );
  }
}
export default App;

// In react_express/client/src/components/customers.css
ul {
  list-style: none;
  padding: 0;
  width: 30%;
  margin: auto;
}
li {
  font-size: 1.3rem;
  line-height: 2rem;
  border-bottom: 1px dotted #777;  
}

// In react_express/package.json change:
"scripts": {
  "client-install": "cd client && npm install",
  "start": "node server.js",
  "server": "nodemon server.js",
  "client": "npm start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\""
},
