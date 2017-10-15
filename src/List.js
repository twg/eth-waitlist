import React, { Component } from 'react'
const contract = require('truffle-contract')
import WaitlistContract from '../build/contracts/Waitlist.json'

class List extends Component {
  state = {
    list: [],
    current: null,
    error: null
  }

  setup(currentProvider) {
    this.Waitlist = contract({
      abi: WaitlistContract.abi,
      unlinked_binary: WaitlistContract.unlinked_binary
    })
    this.Waitlist.setProvider(this.props.web3.currentProvider)
  }

  componentDidMount() {
    if (!this.Waitlist && this.props.web3) {
      this.setup()
      this.refreshList()
    }
  }

  componentDidUpdate(nextProps) {
    if (!this.Waitlist && this.props.web3) {
      this.setup()
      this.refreshList()
    }
  }

  refreshList() {
    this.getInstance()
      .then(instance => {
        console.log(instance)
        instance.get().then(list => {
          this.setState(prevState => ({ ...prevState, list }))
        })

        instance.getNextInQueue().then(current => {
          this.setState(prevState => ({ ...prevState, current }))
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  contractId = () => {
    return this.props.match.params.id
  }

  getInstance = () => {
    if (!this.props.web3.utils.isAddress(this.contractId())) {
      // invalid address
      window.location = '/'
    } else {
      return this.Waitlist.at(this.contractId())
    }
  }

  addMeToList = () => {
    this.getInstance().then(instance => {
      instance.join({ from: this.props.accounts[0] }).then(res => {
        this.refreshList()
      })
    })
  }

  userPosition = () => {
    const userIndex = this.state.list.findIndex(
      address => address.toLowerCase() === this.props.accounts[0].toLowerCase()
    )
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
      return `You are number ${pos + 1} on the list`
    }
  }

  userOnList = () => {
    return this.userPosition() !== null
  }

  render() {
    if (this.state.error) {
      return 'error'
    }
    return (
      <div className="waitlist">
        {this.Waitlist ? (
          <div>
            <ul>{this.state.list.map((item, index) => <li>{item}</li>)}</ul>
            <div>{this.renderUserPosition()}</div>
            {!this.userOnList() && (
              <button onClick={this.addMeToList}>Add me to list</button>
            )}
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}

export default List
