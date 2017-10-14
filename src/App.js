import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import getWeb3 from './utils/getWeb3'
import _ from 'lodash'
// import Admin from './Admin'
import List from './List'
import Metadata from './Metadata'
import Accounts from './Accounts'
import Lists from './Lists'
import CreateList from './CreateList'
// import User from './User'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null
    }

    // this.getCurrentList = this.getCurrentList.bind(this)
    // this.getCurrentPosition = this.getCurrentPosition.bind(this)
    // this.addMeToList = this.addMeToList.bind(this)
    // this.getContractOwner = this.getContractOwner.bind(this)
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        const web3 = results.web3
        this.setState(prevState => ({ ...prevState, web3 }))
      })
      .catch(err => {
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

  // getContractOwner(instance) {
  //   instance.owner().then(owner => {
  //     this.setState(prevState => ({ ...prevState, owner }))
  //   })
  // }

  // getCurrentList() {
  //   this.state.waitlistInstance.getWaitingList().then(list => {
  //     this.setState(prevState => ({ ...prevState, waitingList: list }))
  //   })
  // }

  // getCurrentPosition() {
  //   this.state.waitlistInstance.getCurrent().then(position => {
  //     console.log('position: ' + position)
  //     this.setState(prevState => ({ ...prevState, currentPosition: position }))
  //   })
  // }

  // addMeToList() {
  //   this.state.waitlistInstance
  //     .addToWaitingList({ from: this.state.web3.eth.accounts[0] })
  //     .then(res => {
  //       console.log(res)
  //     })
  // }

  // isCurrentUserContractOwner() {
  //   return this.state.userAccounts.find(address => address === this.state.owner)
  // }

  // renderAccounts() {
  //   return this.context.web3.accounts.map(account => {
  //     return (
  //       <li key={account}>
  //         {this.context.web3.selectedAccount === account ? (
  //           <strong style={{ fontSize: '24px' }}>{account}</strong>
  //         ) : (
  //           account
  //         )}
  //       </li>
  //     )
  //   })
  // }

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
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Lists {...this.state} />} />
              <Route
                exact
                path="/lists/new"
                render={() => <CreateList {...this.state} />}
              />
              <Route
                exact
                path="/list/:id"
                render={props => <List {...props} {...this.state} />}
              />
            </Switch>
          </BrowserRouter>
          <Metadata />
          <Accounts />
        </main>
      </div>
    )
  }
}

App.contextTypes = {
  web3: PropTypes.object
}

export default App
