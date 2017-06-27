import {FETCH_CHAT, FETCH_CHAT_SUCCESS,FETCH_CHAT_FAILURE} from "./actions"
import {ADD_MESSAGE, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE} from "./actions"
import {CHAT_RESET_STATE,FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_SUCCESS,FETCH_CHAT_MESSAGES,READ_MESSAGES_FAIL,READ_MESSAGES_SUCCESS} from './actions'

const initialState = {
  sessionList: [],
  sessions: {},
}

export default function auth(state = initialState,action){
  switch (action.type) {

    case CHAT_RESET_STATE:
      return {
        ...state,
        initialState,
        isFetching: false,
        error: null,
      };

    case FETCH_CHAT_SUCCESS:
    return Object.assign({}, state, {
        isFetching: false,
        sessionList: action.sessions
      })

      case ADD_MESSAGE:

      return Object.assign({}, state, {
          isFetching: false,
        })

      case ADD_MESSAGE_SUCCESS:

      var currentSessions = state.sessions
      var messageSession = currentSessions[action.message.sessionId].slice()
      if(messageSession == null){
        messageSession = []
      }
      messageSession.unshift(action.message)
      // can't do. currentSessions[action.message.sessionId] = messageSession
      var sessionList = state.sessionList.slice()
      for (session of sessionList) {
        if(session.sessionId == action.message.sessionId){
          session.lastMessageDate = action.message.createdAt
          session.lastReadDate = action.message.createdAt
          break;
        }

      }

      return {
        ... state,
        sessionList: sessionList,
        sessions : {
          ...state.sessions,
          [action.message.sessionId]: [
            ...messageSession
          ]
        }
      }

      case ADD_MESSAGE_FAILURE:

      return Object.assign({}, state, {
          isFetching: false,
        })


        case FETCH_CHAT_MESSAGES:

        return Object.assign({}, state, {
            isFetching: false,
          })

        case FETCH_CHAT_MESSAGES_SUCCESS:
        var currentSessions = state.sessions
        var messageSession = currentSessions[action.sessionId]
        if(messageSession == null){
          messageSession = action.messages
        }else{
          messageSession.concat(action.messages)
        }

        currentSessions[action.sessionId] = messageSession

        return Object.assign({}, state, {
            isFetching: false,
            sessions: currentSessions
          })

        case FETCH_CHAT_MESSAGES_FAILURE:

        return Object.assign({}, state, {
            isFetching: false,
            sessions: action.sessions
          })

    default:
      return state
  }
  return state;
}
