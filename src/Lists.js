import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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

  async componentDidMount() {
    const lists = await LISTS
    this.setState({ lists })
  }

  render() {
    console.log(this.state.lists)
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

Lists.contextTypes = {
  web3: PropTypes.object
}

export default Lists
