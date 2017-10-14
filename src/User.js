import React, { Component } from 'react'

class User extends Component {
  render () {
    return (
      <div>
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
    )
  }
}

export default User

