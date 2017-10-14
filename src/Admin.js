import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
const contract = require("truffle-contract")
import WaitlistContract from '../build/contracts/Waitlist.json'

class Admin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      instances: [],
      currentInstance: null,
      list: null,
      current: null
    }

    this.Waitlist = null
  }

  componentDidMount () {
    const instances = this.getInstancesFromLocalStorage()
    this.setState(prevState => ({...prevState, instances }))
  }

  getInstancesFromLocalStorage () {
    return JSON.parse(localStorage.getItem('instances')) || []
  }

  deploy = () => {
    this.Waitlist = contract({
      abi: WaitlistContract.abi,
      unlinked_binary: WaitlistContract.unlinked_binary,
    })
    this.Waitlist.setProvider(this.props.web3.currentProvider)
    this.Waitlist.new({
      from: this.props.currentAccount,
      gas: 500000,
      gasPrice: 1000000000, // 1 wei
    }).then(instance => {
      const instances = this.saveInstanceToLocalStorage(instance)
      this.setState(prevState => ({...prevState, instances }))
    }).catch(err => {
      console.error(err)
    })
  }

  saveInstanceToLocalStorage = (instance) => {
    const instances = this.getInstancesFromLocalStorage()
    instances.push(instance)
    localStorage.setItem('instances', JSON.stringify(instances))
    return instances
  }

  getInstance = (address) => {
    this.Waitlist = contract({
      abi: WaitlistContract.abi,
      unlinked_binary: WaitlistContract.unlinked_binary,
    })
    this.Waitlist.setProvider(this.props.web3.currentProvider)
    this.Waitlist.at(address)
      .then(instance => {
        this.setState(prevState => ({...prevState, currentInstance: instance }), this.getInfo)
      })
  }

  getInfo = () => {
    this.state.currentInstance.getWaitingList()
      .then(list => {
        this.setState(prevState => ({...prevState, list }))
      })

    this.state.currentInstance.getCurrent()
    .then(current => {
      this.setState(prevState => ({...prevState, current }))
    })
  }

  renderListInfo () {
    return (
      <div>
        <h2>List Info:</h2>
        <p>Current Position: {this.state.current && this.state.current.toString()}</p>
        <p>List: {JSON.stringify(this.state.list)}</p>
      </div>
    )
  }


  render () {
    return (
      <div>
        <div className='waitlist'>
          <h2>All Lists Belonging to Current User</h2>
          <ul>
            { this.state.instances && this.state.instances.map((instance, index) => <li key={index}><span onClick={() => this.getInstance(instance.address)}>{instance.address}</span> <Link to={`/list/${instance.address}`}>Go to list</Link></li>)}
          </ul>
          <button onClick={this.deploy}>Deploy new list</button>
          {this.state.currentInstance && this.renderListInfo()}
        </div>
      </div>
    )
  }
}

export default Admin

