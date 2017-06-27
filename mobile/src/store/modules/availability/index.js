import CONSTS from '@utils/Consts'

import {CREATE_AVAILABILITY,CREATE_AVAILABILITY_SUCCESS,CREATE_AVAILABILITY_FAIL,GET_AVAILABILITY, GET_AVAILABILITY_SUCCESS,GET_AVAILABILITY_FAIL} from "./actions"
import {AVAILABILITY_RESET_STATE,DELETE_AVAILABILITY, DELETE_AVAILABILITY_SUCCESS,DELETE_AVAILABILITY_FAIL} from "./actions"

const initialState = {
  items: [],
  createStatus: CONSTS.API_CALL_STATUS.IDLE,
  deleteStatus: CONSTS.API_CALL_STATUS.IDLE,
  errorMessage: '',
}

export default function auth(state = initialState,action){
  switch (action.type) {
    // State
    case AVAILABILITY_RESET_STATE:
      return {
        ...state,
        initialState,
        isFetching: false,
        error: null,
      };

    case CREATE_AVAILABILITY:
    return Object.assign({}, state, {
      createStatus: CONSTS.API_CALL_STATUS.IN_PROGRESS,
      errorMessage: ''
      })

    case CREATE_AVAILABILITY_SUCCESS:
    var currentItems = state.items
    currentItems.push(action.item)
    return Object.assign({}, state, {
      createStatus: CONSTS.API_CALL_STATUS.CREATED,
      items : currentItems
      })

    case CREATE_AVAILABILITY_FAIL:
    return Object.assign({}, state, {
      createStatus: CONSTS.API_CALL_STATUS.FAILED,
      errorMessage: action.errorMessage
      })

    case GET_AVAILABILITY:
    return Object.assign({}, state, {
      })

    case GET_AVAILABILITY_SUCCESS:
    return Object.assign({}, state, {
        items: action.items
      })

    case GET_AVAILABILITY_FAIL:
    return Object.assign({}, state, {
        error: action.error
      })

    case DELETE_AVAILABILITY:
    return Object.assign({}, state, {
        deleteStatus: CONSTS.API_CALL_STATUS.IN_PROGRESS,
      })

    case DELETE_AVAILABILITY_SUCCESS:
    return Object.assign({}, state, {
        deleteStatus: CONSTS.API_CALL_STATUS.DELETED,
        items: action.items
      })

    case DELETE_AVAILABILITY_FAIL:
    return Object.assign({}, state, {
        deleteStatus: CONSTS.API_CALL_STATUS.FAILED,
        errorMessage: action.error
      })

    default:
      return state
  }
  return state;
}
