import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

// Use constant until I figure out how to connect login

export const VOTE_ON_QUESTION = 'VOTE_ON_QUESTION'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(null))
        dispatch(hideLoading())
      })
  }
}

function voteOnQuestion({ qid, answer, authedUser }) {
  return {
    type: VOTE_ON_QUESTION,
    qid,
    answer,
    authedUser
  }
}

export function handleVoteOnQuestion(questionID, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const voteInfo = {
      authedUser,
      qid: questionID,
      answer
    }

    dispatch(voteOnQuestion(voteInfo))

    return saveQuestionAnswer(voteInfo)
  }
}
