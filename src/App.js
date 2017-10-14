import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import getWeb3 from './utils/getWeb3'
import _ from 'lodash'
import Admin from './Admin'
import List from './List'
// import User from './User'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      storageValue: '',
      web3: null,
      waitlistInstance: null,
      currentPosition: null,
      waitingList: [],
      owner: null
    }

    this.getCurrentList = this.getCurrentList.bind(this)
    this.getCurrentPosition = this.getCurrentPosition.bind(this)
    this.addMeToList = this.addMeToList.bind(this)
    this.getContractOwner = this.getContractOwner.bind(this)
  }

  componentWillMount () {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        const web3 = results.web3
        this.setState(prevState => ({ ...prevState, web3 }))
      })
      .catch((err) => {
        console.error(err)
        console.log('Error finding web3.')
      })
  }
  // instantiateContract () {
  //   const contract = require('truffle-contract')
  //   const waitlist = contract(WaitlistContract)
  //   waitlist.setProvider(this.state.web3.currentProvider)

  //   // get waitlist instance
  //   waitlist.deployed().then((instance) => {
  //     this.setState(prevState => ({...prevState, waitlistInstance: instance}))
  //     this.getContractOwner(instance)
  //   })
  // }

  getContractOwner (instance) {
    instance.owner().then(owner => {
      this.setState(prevState => ({...prevState, owner }))
    })
  }

  getCurrentList () {
    this.state.waitlistInstance.getWaitingList().then(list => {
      this.setState(prevState => ({...prevState, waitingList: list}))
    })
  }

  getCurrentPosition () {
    this.state.waitlistInstance.getCurrent().then(position => {
      console.log('position: ' + position)
      this.setState(prevState => ({...prevState, currentPosition: position}))
    })
  }

  addMeToList () {
    this.state.waitlistInstance.addToWaitingList({ from: this.state.web3.eth.accounts[0] }).then(res => {
      console.log(res)
    })
  }

  isCurrentUserContractOwner () {
    return this.state.userAccounts.find(address => address === this.state.owner)
  }

  renderAccounts () {
    return this.context.web3.accounts.map(account => {
      return (
        <li key={account}>
          {this.context.web3.selectedAccount === account ? <strong style={{fontSize: '24px'}}>{account}</strong> : account}
        </li>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">Waitlist App</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <div className='metadata'>
                <h2>Metadata</h2>
                <p>Network: {this.context.web3.network} ({this.context.web3.networkId})</p>
                <p>Main contract address: {this.state.waitlistInstance ? this.state.waitlistInstance.address : 'Loading...'}</p>
              </div>
            </div>
          </div>
          <div className='user'>
            <h2>Current User</h2>
            <p>Accounts:</p>
            <ul>
              { this.renderAccounts() }
            </ul>
          </div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/admin" render={() => <Admin {...this.state} />} />
              <Route exact path="/list/:id" render={props => <List {...props} {...this.state} />} />
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    )
  }
}

App.contextTypes = {
  web3: PropTypes.object
};

export default App
