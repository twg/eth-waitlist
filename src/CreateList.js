import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './components/button'
import { post } from './utils/api'
const contract = require('truffle-contract')
import WaitlistContract from '../build/contracts/Waitlist.json'

const styles = {
  margin: '50px auto',
  display: 'flex',
  flexDirection: 'column',
  width: '400px'
}

class CreateList extends React.Component {
  state = {
    name: ''
  }

  deploy = () => {
    this.Waitlist = contract({
      abi: WaitlistContract.abi,
      unlinked_binary: WaitlistContract.unlinked_binary
    })
    this.Waitlist.setProvider(this.props.web3.currentProvider)
    return this.Waitlist.new({
      from: this.context.web3.selectedAccount,
      gas: 500000,
      gasPrice: 1000000000 // 1 wei
    })
  }

  createList = () => {
    this.deploy()
      .then(instance => {
        post('/lists', {
          contractAddress: instance.address,
          name: this.state.name,
          user: this.context.web3.selectedAccount
        })
          .then(() => {
            window.location = '/lists'
          })
          .catch(err => {
            console.error(err)
          })
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <div style={styles}>
        <div>
          <label>List Name</label>
          <input
            value={this.state.name}
            className="input"
            name="listName"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <p />
        <div>
          <label>Owner</label>
          <input className="input" name="listName" value="0xfsldfsf" readOnly />
        </div>
        <p />
        <Button onClick={this.createList}>Create</Button>
      </div>
    )
  }
}

CreateList.contextTypes = {
  web3: PropTypes.object
}

export default CreateList
