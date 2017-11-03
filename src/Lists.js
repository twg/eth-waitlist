import React from 'react'
import { Link } from 'react-router-dom'
import { get } from './utils/api'

class Lists extends React.Component {
  state = {
    lists: []
  }

  componentDidMount() {
    get(`/admin/lists?ownerPublicKey=${this.props.accounts[0]}`)
      .then(lists => {
        this.setState({ lists })
      })
      .catch(err => console.log(err))
  }

  renderNonEmptyMessage() {
    return 'The lists you manage are below. Click one to check the list, or create a new one.'
  }

  renderEmptyMessage() {
    return "You don't currently manage any lists, click below to create one."
  }

  renderLists() {
    return this.state.lists.map(list => {
      return (
        <Link key={list.contractAddress} to={`/lists/${list.contractAddress}`}>
          <div className="list-box">{list.name}</div>
        </Link>
      )
    })
  }

  render() {
    return (
      <div>
        <p style={{ textAlign: 'center' }}>
          {this.state.lists.length === 0
            ? this.renderEmptyMessage()
            : this.renderNonEmptyMessage()}
        </p>
        <div className="flexcontainer" style={{ margin: '50px 0' }}>
          {this.renderLists()}
          <Link to="/lists/new">
            <div className="add-box">
              <div className="circle">+</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Lists
