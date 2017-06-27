import {FETCH_PLANS, FETCH_PLANS_SUCCESS, FETCH_PLANS_FAILURE} from "./actions"


const initialState = {
  isFetching: false,
  planItems: [],
  error: ''
}

export default function auth(state = initialState,action){
  switch (action.type) {

    case FETCH_PLANS:
    return Object.assign({}, state, {
        isFetching: true,
        error: ''
      })

    case FETCH_PLANS_SUCCESS:
    return Object.assign({}, state, {
        isFetching: false,
        planItems: action.plans,
        error: ''
      })
    case FETCH_PLANS_FAILURE:
    return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })

    default:
      return state
  }
  return state;
}
