import React, { Component } from 'react'
const contract = require("truffle-contract")
import WaitlistContract from '../build/contracts/Waitlist.json'

class List extends Component {

  contractId = () => {
    return this.props.match.params.id
  }

  addMeToList = () => {
    this.Waitlist = contract({
      abi: WaitlistContract.abi,
      unlinked_binary: WaitlistContract.unlinked_binary,
    })
    this.Waitlist.setProvider(this.props.web3.currentProvider)
    this.Waitlist.at(this.contractId())
      .then(instance => {
        instance.addToWaitingList({ from: this.props.currentAccount }).then(res => {
          console.log(res)
        })
      })
  }

  render () {
    return (
      <div>
        <button onClick={this.addMeToList}>Add me to list</button>
      </div>
    )
  }
}

export default List
