import React from 'react'
import PropTypes from 'prop-types'

const Metadata = (props, context) => {
  const web3 = context.web3 || {}
  return (
    <div className="metadata">
      <h2>Metadata</h2>
      <p>
        Network: {web3.network} ({web3.networkId})
      </p>
    </div>
  )
}

export default Metadata
