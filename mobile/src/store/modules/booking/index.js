import CONSTS from '@utils/Consts'
import * as actions from './actions';

const initialState = {
  isFetching: false,
  bookingType: CONSTS.BOOKING_TYPE.UNDEFINED,
  chosenTrainer: {},
  chosenLocation: {},
  chosenDate: '',
  chosenActivity: {},
  currentStep: 1,
  numFriends: 0,
  totalSteps: 4,
  isEditing: false,
  isSinglePurchase: false,
  singlePayNonce: '',
  singlePayDesc: '',
  trainers: [],
  gyms: [],
  subscriptionOption:{},
  trainerAvailability:[],
}

export default function auth(state = initialState,action){
  switch (action.type) {

    case actions.BEGIN_EDITING:
    return Object.assign({}, state, {
      isEditing: true
    })

    case actions.ACTIVATE_SINGLE_PURCHASE:
    return Object.assign({}, state, {
      isSinglePurchase: true,
      bookingType: CONSTS.BOOKING_TYPE.BY_ACTIVITY,
      subscriptionOption: {},
    })

    case actions.ADD_BOOKING_NONCE:
    return Object.assign({}, state, {
      singlePayNonce: action.nonce[0],
      singlePayDesc: action.nonce[1],
      isSinglePurchase: true,
    })

    case actions.ADD_FRIENDS:
    return Object.assign({}, state, {
      numFriends: action.numFriends
    })

    case actions.SET_SUBSCRIPTION_OPTION:
    return Object.assign({}, state, {
      subscriptionOption: action.option,
      isSinglePurchase: false,
    })

    case actions.BEGIN_EDITING:
    return Object.assign({}, state, {
      isEditing: false
    })

    case actions.FETCH_GYMS:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })
    case actions.FETCH_GYMS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      gyms: action.gyms
    })
    case actions.FETCH_GYMS_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    })
    case actions.FETCH_TRAINERS:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })
    case actions.FETCH_TRAINERS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      trainers: action.trainers
    })
    case actions.GET_TRAINER_AVAIL_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      trainerAvailability: action.availability
    })
    case actions.FETCH_TRAINERS_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    })
    case actions.SET_BOOKING_TYPE:
    return Object.assign({}, state, {
      bookingType: action.bookingType,
      isSinglePurchase: true,
    })

    case actions.SELECT_TRAINER:

    return Object.assign({}, state, {
      chosenTrainer: action.trainer,
    })

    case actions.SELECT_ACTIVITY:
    return Object.assign({}, state, {
      chosenActivity: action.activity,
    })

    case actions.SELECT_DATETIME:

    return Object.assign({}, state, {
      chosenDate: action.dateTime,
    })

    case actions.SELECT_LOCATION:
    return Object.assign({}, state, {
      chosenLocation: action.location,
    })




    default:
      return state
  }
  return state;
}
