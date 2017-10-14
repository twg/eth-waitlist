import React from 'react'

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
  children: React.PropTypes.string.isRequired,
  /**
   * Event to fire when button is clicked
   */
  onClick: React.PropTypes.func,
  /**
   * Available values: hero, primary, secondary
   */
  size: React.PropTypes.string,
  /**
   * Available values: green, grey, orange
   */
  color: React.PropTypes.string,
  /**
   * If true, applies margin: 0px property
   */
  noMargin: React.PropTypes.bool
}

export { Button }
