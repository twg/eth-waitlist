import React from 'react'
import PropTypes from 'prop-types'

const Accounts = (props, context) => {
  const web3 = context.web3
  const renderAccounts = () => {
    return web3.accounts.map(account => {
      return (
        <li key={account}>
          {web3.selectedAccount === account ? <strong style={{fontSize: '24px'}}>{account}</strong> : account}
        </li>
      )
    })
  }

  return (
    <div className='user'>
      <h2>Current User</h2>
      <p>Accounts:</p>
      <ul>
        { renderAccounts() }
      </ul>
    </div>
  )
}

Accounts.contextTypes = {
  web3: PropTypes.object
};

export default Accounts
