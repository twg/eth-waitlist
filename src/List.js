import React, { Component } from 'react'
const contract = require('truffle-contract')
import WaitlistContract from '../build/contracts/Waitlist.json'
import { get } from './utils/api'

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
        instance.get().then(list => {
          this.setState(prevState => ({ ...prevState, list }))
        })

        instance.getNextInQueue().then(current => {
          this.setState(prevState => ({ ...prevState, current }))
        })

        get(`/lists/byAddress/${instance.address}`).then(list => {
          this.setState({ listInfo: list })
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

  numActive = () => {
    return this.state.list.length - this.state.current
  }

  numInactive = () => {
    return this.state.list.length - this.numActive()
  }

  numAhead = () => {
    return this.userPosition() - this.state.current
  }

  numBehind = () => {
    return this.numActive() - this.numAhead() - 1
  }

  render() {
    if (this.state.error) {
      return 'error'
    }
    return (
      <div className="waitlist">
        {this.Waitlist ? (
          <div>
            {!this.userOnList() && (
              <div style={{ float: 'right' }}>
                <div className="circle" onClick={this.addMeToList}>
                  +
                </div>
              </div>
            )}
            <h1>{this.state.listInfo.name}</h1>
            <p>
              {this.numActive()} ACTIVE / {this.numInactive()} INACTIVE
            </p>
            {this.state.list.slice(this.state.current).map((item, index) => (
              <div
                key={index}
                className={`list-row ${this.props.accounts[0].toLowerCase() ===
                item.toLowerCase()
                  ? 'highlight'
                  : ''}`}
              >
                <span className="number">#{index + 1}</span> {item}{' '}
                <span className="label">ACTIVE</span>
              </div>
            ))}
            {this.state.list.slice(0, this.state.current).map((item, index) => (
              <div
                key={index}
                className={`list-row ${this.props.accounts[0].toLowerCase() ===
                item.toLowerCase()
                  ? 'highlight'
                  : ''}`}
              >
                <span className="number" /> {item}{' '}
                <span className="label">INACTIVE</span>
              </div>
            ))}
            {this.userOnList() ? (
              <div className="msg">
                <div className="congrats">You are on the list</div>
                <div className="red-text">{this.numAhead()} ahead of you</div>
                <div className="red-text">{this.numBehind()} behind you</div>
              </div>
            ) : null}
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}

export default List

{
  /* <div>{this.renderUserPosition()}</div> */
}
