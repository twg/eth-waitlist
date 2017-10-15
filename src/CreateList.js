import React from 'react'
import { Button } from './components/button'
import { post } from './utils/api'
const contract = require('truffle-contract')
import WaitlistContract from '../build/contracts/Waitlist.json'

class CreateList extends React.Component {
  state = {
    name: ''
  }

  deploy = () => {
    this.Waitlist = contract({
      abi: WaitlistContract.abi,
      bytecode: WaitlistContract.bytecode
    })
    this.Waitlist.setProvider(this.props.web3.currentProvider)
    return this.Waitlist.new({
      from: this.props.accounts[0]
    })
  }

  createList = () => {
    this.deploy()
      .then(instance => {
        post('/admin/lists', {
          contractAddress: instance.address,
          name: this.state.name,
          ownerPublicKey: this.props.accounts[0]
        })
          .then(() => {
            window.location = '/'
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
      <div className="createBox">
        <div>
          <h3>Create your list</h3>
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
          <input
            className="input"
            name="listName"
            value={this.props.accounts[0]}
            readOnly
          />
        </div>
        <p />
        <p />
        <Button onClick={this.createList}>SAVE</Button>
      </div>
    )
  }
}

export default CreateList
