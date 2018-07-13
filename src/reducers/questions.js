import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions'
import { VOTE_ON_QUESTION } from '../actions/shared'

export default function questions(state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      const { question } = action

      return {
        ...state,
        [question.id]: question,
      }
    case VOTE_ON_QUESTION:
      const { qid, answer, authedUser } = action

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    default:
      return state
  }
}
