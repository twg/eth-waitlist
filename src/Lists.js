import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { get } from './utils/api'

const LISTS = [
  {
    address: '0x1234892374',
    name: 'List 1'
  },
  {
    address: '0x1oiu23942',
    name: 'List 2'
  }
]

class Lists extends React.Component {
  state = {
    lists: []
  }

  componentDidMount() {
    get(`/admin/lists?account=${this.props.accounts[0]}`)
      .then(lists => {
        this.setState({ lists })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="flexcontainer" style={{ margin: '50px 0' }}>
        {this.state.lists.map(list => {
          return (
            <Link to={`/lists/${list.address}`}>
              <div className="list-box">{list.name}</div>
            </Link>
          )
        })}
        <Link to="/lists/new">
          <div className="add-box">
            <div className="circle">+</div>
          </div>
        </Link>
      </div>
    )
  }
}

export default Lists
