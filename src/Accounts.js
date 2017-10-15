import React from 'react'

const Accounts = props => {
  const renderAccounts = () => {
    return props.accounts.map(account => {
      return (
        <li key={account}>
          <strong style={{ fontSize: '24px' }}>{account}</strong>
        </li>
      )
    })
  }

  return (
    <div className="user">
      <h2>Current User</h2>
      <p>Accounts:</p>
      <ul>{renderAccounts()}</ul>
    </div>
  )
}

export default Accounts
