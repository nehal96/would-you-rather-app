import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    uid: this.props.userIDs[0]
  }

  handleChange = (e) => {
    this.setState({
      uid: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { uid } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(uid))
  }

  render() {
    const { userIDs, authedUser } = this.props

    if (authedUser !== null) {
      return <Redirect to='/' />
    }

    return(
      <div className='login container'>
        <div className='login-container'>
          <div className='login-header'>
            <h3 className='text-center'>Psuedo-Login</h3>
          </div>
          <hr></hr>
          <div className='login-body'>
            <p>Select your username..</p>
            <form className='login-form' onSubmit={ this.handleSubmit }>
              <select value={ this.state.uid } onChange={ this.handleChange }>
                { userIDs.map((userID) =>(
                  <option value={ userID } key={ userID }>{ userID }</option>
                )) }
              </select>
              <button className='btn login-btn' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    userIDs: Object.keys(users).sort(),
    authedUser
  }
}

export default connect(mapStateToProps)(Login)
