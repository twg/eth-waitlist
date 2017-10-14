import React, { Component } from 'react'
import WaitlistContract from '../build/contracts/Waitlist.json'
import getWeb3 from './utils/getWeb3'
import networkIdMap from './utils/networkIdMap'
import _ from 'lodash'

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
      network: null,
      waitlistInstance: null,
      currentPosition: null,
      waitingList: [],
      userAccounts: [],
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
        this.setState(prevState => ({ ...prevState, web3 }), this.getNetworkId)
      })
      .then(() => {
        // Instantiate contract once web3 provided.
        this.instantiateContract()
        this.getAccounts()
      })
      .catch((err) => {
        console.error(err)
        console.log('Error finding web3.')
      })
  }
  instantiateContract () {
    const contract = require('truffle-contract')
    const waitlist = contract(WaitlistContract)
    waitlist.setProvider(this.state.web3.currentProvider)

    // get waitlist instance
    waitlist.deployed().then((instance) => {
      this.setState(prevState => ({...prevState, waitlistInstance: instance}))
      this.getContractOwner(instance)
    })
  }

  getAccounts () {
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState(prevState => ({...prevState, userAccounts: accounts}))
    })
  }

  getContractOwner (instance) {
    instance.owner().then(owner => {
      this.setState(prevState => ({...prevState, owner }))
    })
  }

  getNetworkId () {
    this.state.web3.version.getNetwork((err, netId) => {
      this.setState(prevState => ({ ...prevState, network: netId }))
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
                <p>Network: {this.state.web3 ? networkIdMap[this.state.network] : 'Loading...'}</p>
                <p>Main contract address: {this.state.waitlistInstance ? this.state.waitlistInstance.address : 'Loading...'}</p>
              </div>

              <div className='user'>
                <h2>Current User</h2>
                <p>Accounts:</p>
                <ul>
                  { this.state.userAccounts.map(account => <li key={account}>{account}</li>) }
                </ul>
                <p>Current User is {this.isCurrentUserContractOwner() ? '' : 'NOT'} contract owner</p>

              </div>

              <div className='waitlist'>
                <h2>Waiting List</h2>
                {
                  this.state.waitingList.length === 0 ? 'Empty!' :
                  <ul>
                  {_.map(this.state.waitingList, (waitingList, index) => {
                    return <li key={index}>{waitingList}</li>
                  })}
                  </ul>
                }
                <h2>Current Position: {JSON.stringify(this.state.currentPosition)}</h2>
                <div><button onClick={this.addMeToList}>Add me to list</button></div>
                <div><button onClick={this.getCurrentList}>Get current list</button></div>
                <div><button onClick={this.getCurrentPosition}>Update current position</button></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
