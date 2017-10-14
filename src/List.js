import React, { Component } from 'react'
const contract = require("truffle-contract")
import WaitlistContract from '../build/contracts/Waitlist.json'
import PropTypes from 'prop-types'

class List extends Component {
  state = {
    list: [],
    current: null
  }

  constructor (props) {
    super(props)
    this.Waitlist = contract({
      abi: WaitlistContract.abi,
      unlinked_binary: WaitlistContract.unlinked_binary,
    })
    this.Waitlist.setProvider(this.props.web3.currentProvider)
  }

  componentDidMount() {
    this.refreshList()
  }

  refreshList() {
    this.getInstance()
    .then(instance => {
      instance.getWaitingList()
        .then(list => {
          this.setState(prevState => ({...prevState, list}))
        })

      instance.getCurrent()
        .then(current => {
          this.setState(prevState => ({...prevState, current}))
        })
    })
  }

  contractId = () => {
    return this.props.match.params.id
  }

  getInstance = () => {
    return this.Waitlist.at(this.contractId())
  }

  addMeToList = () => {
    this.getInstance()
      .then(instance => {
        instance.addToWaitingList({ from: this.context.web3.selectedAccount }).then(res => {
          this.refreshList()
        })
      })
  }

  userPosition = () => {
    const userIndex = this.state.list.findIndex(address => address === this.context.web3.selectedAccount)
    if (userIndex !== -1) {
      return userIndex - this.state.current
    }
    return null
  }

  renderUserPosition = () => {
    const pos = this.userPosition()
    if (pos === null) {
      return 'Current user is not on the list.'
    } else {
      return `You are number ${pos}`
    }
  }

  userOnList = () => {
    return this.userPosition() !== null
  }

  render () {
    return (
      <div className='waitlist'>
        <div>{this.renderUserPosition()}</div>
        { !this.userOnList() && <button onClick={this.addMeToList}>Add me to list</button>}
      </div>
    )
  }
}

List.contextTypes = {
  web3: PropTypes.object
};

export default List
