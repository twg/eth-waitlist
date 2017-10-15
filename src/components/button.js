import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  return (
    <button
      className="button"
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {
  /**
   * This is the label of the button
   */
  children: PropTypes.string.isRequired,
  /**
   * Event to fire when button is clicked
   */
  onClick: PropTypes.func,
  /**
   * Available values: hero, primary, secondary
   */
  size: PropTypes.string,
  /**
   * Available values: green, grey, orange
   */
  color: PropTypes.string,
  /**
   * If true, applies margin: 0px property
   */
  noMargin: PropTypes.bool
}

export { Button }
