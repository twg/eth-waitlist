import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import getWeb3 from './utils/getWeb3'
import _ from 'lodash'
import List from './List'
import Accounts from './Accounts'
import Lists from './Lists'
import CreateList from './CreateList'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      accounts: []
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        const web3 = results.web3
        this.setState(prevState => ({ ...prevState, web3 }))
      })
      .then(() => this.state.web3.eth.getAccounts())
      .then(accounts => this.setState({ accounts }))
      .catch(err => {
        console.error(err)
        console.log('Error finding web3.')
      })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="/">
            <span className="pure-menu-heading pure-menu-link">
              Waitlist App
            </span>
          </a>
        </nav>
        <main className="container">
          {this.state.accounts[0] && (
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Lists {...this.state} />}
                />
                <Route
                  exact
                  path="/lists/new"
                  render={() => <CreateList {...this.state} />}
                />
                <Route
                  exact
                  path="/lists/:id"
                  render={props => <List {...props} {...this.state} />}
                />
              </Switch>
            </BrowserRouter>
          )}
          <Accounts {...this.state} />
        </main>
      </div>
    )
  }
}

App.contextTypes = {
  web3: PropTypes.object
}

export default App
