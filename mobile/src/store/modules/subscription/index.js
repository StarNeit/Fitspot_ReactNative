import * as Actions from "./actions"


const initialState = {
  isFetching: false,
  selectedPlanId: 0,
  planItem: {},
  error: ''
}

export default function auth(state = initialState,action){
  switch (action.type) {

    case Actions.SUBSCRIBE_PLAN:
    return Object.assign({}, state, {
        isFetching: true,
        error: ''
      })

    case Actions.SUBSCRIBE_PLAN_SUCCESS:
    return Object.assign({}, state, {
        isFetching: false,
        planItem: action.plan,
        error: ''
      })
    case Actions.SUBSCRIBE_PLAN_FAILURE:
    return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case Actions.SELECT_PLAN:
      return Object.assign({}, state, {
        selectedPlanId: action.planId,
      })
    default:
      return state
  }
  return state;
}
