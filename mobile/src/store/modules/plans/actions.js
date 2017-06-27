import ApiUtils from '@utils/ApiUtils'

export const FETCH_PLANS = "FETCH_PLANS"
export const FETCH_PLANS_SUCCESS = "FETCH_PLANS_SUCCESS"
export const FETCH_PLANS_FAILURE = "FETCH_PLANS_FAILURE"



export function requestPlans() {
  return { type: FETCH_PLANS }
}

export function receivePlansSuccess(plans){
  return { type: FETCH_PLANS_SUCCESS, plans, receivedAt: Date.now()}
}

export function receivePlansFail(error){
  return { type: FETCH_PLANS_FAILURE, error, receivedAt: Date.now()}
}

export function fetchPlans() {

  return function(dispatch) {
    dispatch(requestPlans())
    return ApiUtils.get('customers/plans-available')
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(receivePlansSuccess(jsonBody))
      } else {
        dispatch(receivePlansFail(jsonBody.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}
