import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Navbar extends Component {
  handleLogout = (e) => {
    const { dispatch } = this.props

    dispatch(setAuthedUser(null))
  }

  render() {
    const { name } = this.props

    return(
      <nav className='nav'>
        <div className='nav-links'>
          <ul>
            <li>
              <NavLink to='/' exact activeClassName='active-nav'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/add' activeClassName='active-nav'>
                Create Question
              </NavLink>
            </li>
            <li>
              <NavLink to='/leaderboard' activeClassName='active-nav'>
                Leaderboard
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='login-logout'>
          <div className='welcome-message'>Welcome, { name }</div>
          <button
            className='btn logout-btn'
            onClick={ this.handleLogout }>
            Logout
          </button>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  const { name } = users[authedUser]

  return {
    name
  }
}

export default connect(mapStateToProps)(Navbar)
