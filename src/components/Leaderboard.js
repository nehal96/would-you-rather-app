import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeaderProfile from './LeaderProfile'
import Navbar from './Navbar'
import Footer from './Footer'

class Leaderboard extends Component {
  render() {
    const { uids, authedUser } = this.props

    if (authedUser === null) {
      return <Redirect to='/login' />
    }

    return(
      <Fragment>
        <Navbar />
        <div className='container'>
          <div className='dashboard-container'>
            <h1 className='text-center'>Leaderboard</h1>
            {uids.map((uid) => (
              <LeaderProfile key={ uid } uid={ uid } />
            ))}
          </div>
        </div>
        <Footer />
      </Fragment>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  const uids = Object.keys(users)
    .sort((a, b) => {
      const scoreA = Object.keys(users[a].answers).length +
        Object.keys(users[a].questions).length

      const scoreB = Object.keys(users[b].answers).length +
        Object.keys(users[b].questions).length

      return scoreB - scoreA
    })

  return {
    uids,
    authedUser
  }
}

export default connect(mapStateToProps)(Leaderboard)
