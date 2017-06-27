
import CONSTS from '@utils/Consts'

import * as actions from './actions';

const initialState = {
  isFetching: false,
  isAdding: false,
  workoutItems: [],
  confirmingStatus: CONSTS.API_CALL_STATUS.IDLE,
  error: '',
  paymentHistory: {},
  unratedSessions: [],
}

export default function auth(state = initialState,action){
  switch (action.type) {

    case actions.FETCH_WORKOUTS:
    return Object.assign({}, state, {
        isFetching: true,
      })

    case actions.FETCH_WORKOUTS_SUCCESS:
    var items = state.workoutItems.slice()
    items.push(action.workouts)

    return Object.assign({}, state, {
        isFetching: false,
        workoutItems: action.workouts
      })
    case actions.FETCH_WORKOUTS_FAILURE:
    return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })

    case actions.REQUEST_NEW_WORKOUT:
    return Object.assign({}, state, {
        isAdding: true,
      })

    case actions.REQUEST_NEW_WORKOUT_SUCCESS:
    var items = state.workoutItems.slice()

    items.push(action.workout)
    return Object.assign({}, state, {
        isAdding: false,
        error: '',
        workoutItems: items
      })
    case actions.REQUEST_NEW_WORKOUT_FAILURE:
    return Object.assign({}, state, {
        isAdding: false,
        error: action.error
      })

    case actions.TRAINER_CONFIRM:
    return Object.assign({}, state, {
      confirmingStatus: CONSTS.API_CALL_STATUS.IN_PROGRESS,
      })

    case actions.TRAINER_CONFIRM_SUCCESS:

    return {
        ...state,
        confirmingStatus: CONSTS.API_CALL_STATUS.UPDATED,
        workoutItems: state.workoutItems.map(workoutItem => workoutItem.id === action.workout.id ?
            // transform the one with a matching id
            { ...workoutItem, status: CONSTS.WORKOUT_STATUS.ACCEPTED } :
            // otherwise return original todo
            workoutItem
        )
    };

    case actions.TRAINER_CONFIRM_FAIL:
    return Object.assign({}, state, {
    confirmingStatus: CONSTS.API_CALL_STATUS.FAILED,
      })


    case actions.REQUEST_CHANGE_WORKOUT:
    return Object.assign({}, state, {
      confirmingStatus: CONSTS.API_CALL_STATUS.IN_PROGRESS,
      })

    case actions.REQUEST_CHANGE_WORKOUT_SUCCESS:

    return {
        ...state,
        confirmingStatus: CONSTS.API_CALL_STATUS.UPDATED,
        workoutItems: state.workoutItems.map(workoutItem => workoutItem.id === action.workout.id ?
            // transform the one with a matching id
             action.workout :
            // otherwise return original todo
            workoutItem
        )
    };

    case actions.REQUEST_CHANGE_WORKOUT_FAIL:
    return Object.assign({}, state, {
    confirmingStatus: CONSTS.API_CALL_STATUS.FAILED,
      })


      case actions.CANCEL_WORKOUT_SUCCESS:

      return {
          ...state,
          confirmingStatus: CONSTS.API_CALL_STATUS.DELETED,
          workoutItems: state.workoutItems.map(workoutItem => workoutItem.id === action.workout.id ?
              // transform the one with a matching id
              action.workout :
              // otherwise return original todo
              workoutItem
          )
      };

      case actions.CANCEL_WORKOUT_FAIL:
      return Object.assign({}, state, {
      confirmingStatus: CONSTS.API_CALL_STATUS.FAILED,
        })

      case actions.FETCH_TRAINER_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
      paymentHistory: action.paymentInfo,
        })

      case actions.FETCH_UNRATED_WORKOUTS_SUCCESS:
      return Object.assign({}, state, {
      unratedSessions: action.unratedSessions,
        })

      case actions.FETCH_TRAINER_PAYMENT_FAIL:

    default:
      return state
  }
  return state;
}
