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

  render() {
    return (
      <div className="flexcontainer" style={{ margin: '50px 0' }}>
        {this.state.lists.map(list => {
          return (
            <Link to={`/lists/${list.contractAddress}`}>
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
