import ApiUtils from '@utils/ApiUtils'

export const SUBSCRIBE_PLAN = "SUBSCRIBE_PLAN"
export const SUBSCRIBE_PLAN_SUCCESS = "SUBSCRIBE_PLAN_SUCCESS"
export const SUBSCRIBE_PLAN_FAILURE = "SUBSCRIBE_PLAN_FAILURE"
export const SELECT_PLAN = "SELECT_PLAN";


export function requestPlanSubscription() {
  return { type: SUBSCRIBE_PLAN }
}

export function receivePlanSubscriptionSuccess(plan){
  return { type: SUBSCRIBE_PLAN_SUCCESS, plan, receivedAt: Date.now()}
}

export function receivePlanSubscriptionFail(error){
  return { type: SUBSCRIBE_PLAN_FAILURE, error, receivedAt: Date.now()}
}

export function selectPlan(planId){
  return { type: SELECT_PLAN, planId, receivedAt: Date.now()}
}

export function subscribePlan(planId, paymentNonce) {

  return function(dispatch) {
    dispatch(requestPlanSubscription())

    return ApiUtils.post('customers/purchase-plan', {planId: planId, paymentNonce: paymentNonce})
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(receivePlanSubscriptionSuccess(jsonBody))
      } else {
        dispatch(receivePlanSubscriptionFail(jsonBody.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}
