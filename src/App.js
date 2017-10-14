import React, { Component } from 'react'
import WaitlistContract from '../build/contracts/Waitlist.json'
import getWeb3 from './utils/getWeb3'
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
      waitingList: [
        '0x00000001',
        '0x00000002',
        '0x00000003',
        '0x00000004',
      ],
      waitlistInstance: null,
      currentPosition: null
    }

    this.getCurrentList = this.getCurrentList.bind(this)
    this.getCurrentPosition = this.getCurrentPosition.bind(this)
    this.addMeToList = this.addMeToList.bind(this)
  }

  componentWillMount () {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })

        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }
  instantiateContract () {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const waitlist = contract(WaitlistContract)
    waitlist.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      waitlist.deployed().then((instance) => {
        this.setState(prevState => ({...prevState, waitlistInstance: instance}))
      })
    })
  }

  getNetworkId () {
    return this.state.web3.version.getNetwork((err, netId) => {
      return <p>{netId}</p>
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
    // console.log(this.state.web3.eth.accounts)
    this.state.waitlistInstance.addToWaitingList({ from: this.state.web3.eth.accounts[0] }).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Waiting List</h2>
              <ul>
                {_.map(this.state.waitingList, (waitingList) => {
                  return <li>{waitingList}</li>
                })}
              </ul>
              <h2>Current Position</h2>
              <div>{JSON.stringify(this.state.currentPosition)}</div>
              {this.state.web3 ? this.getNetworkId() : 'Loading'}
              {this.state.waitlistInstance ? 'Got instance' : 'No instance'}
              <button onClick={this.addMeToList}>Add me to list</button>
              <button onClick={this.getCurrentList}>Get current list</button>
              <button onClick={this.getCurrentPosition}>Update current position</button>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
