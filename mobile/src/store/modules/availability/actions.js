import CONSTS from '@utils/Consts'
import moment from 'moment'
import ApiUtils from '@utils/ApiUtils'


export const CREATE_AVAILABILITY = "CREATE_AVAILABILITY"
export const CREATE_AVAILABILITY_SUCCESS = "CREATE_AVAILABILITY_SUCCESS"
export const CREATE_AVAILABILITY_FAIL = "CREATE_AVAILABILITY_FAIL"


export const GET_AVAILABILITY = "GET_AVAILABILITY"
export const GET_AVAILABILITY_SUCCESS = "GET_AVAILABILITY_SUCCESS"
export const GET_AVAILABILITY_FAIL = "GET_AVAILABILITY_FAIL"

export const DELETE_AVAILABILITY = "DELETE_AVAILABILITY"
export const DELETE_AVAILABILITY_SUCCESS = "DELETE_AVAILABILITY_SUCCESS"
export const DELETE_AVAILABILITY_FAIL = "DELETE_AVAILABILITY_FAIL"

export const AVAILABILITY_RESET_STATE = `AVAILABILITY_RESET_STATE`;


export function availabilityResetState() {
  return {type: AVAILABILITY_RESET_STATE, receivedAt: Date.now()};
}

export function createAvail(){
  return {type: CREATE_AVAILABILITY, receivedAt: Date.now()}
}

export function createAvailSuccess(item){
  return {type: CREATE_AVAILABILITY_SUCCESS,item:item, receivedAt: Date.now()}
}

export function createAvailFail(message){
  return {type: CREATE_AVAILABILITY_FAIL,errorMessage:message, receivedAt: Date.now()}
}

export function getAvailability(){
  return {type: GET_AVAILABILITY, receivedAt: Date.now()}
}

export function receiveGetAvailabilitySuccess(availableItems){
  return {type: GET_AVAILABILITY_SUCCESS,items:availableItems, receivedAt: Date.now()}
}

export function receiveGetAvailabilityFail(message){
  return {type: GET_AVAILABILITY_FAIL,errorMessage:message, receivedAt: Date.now()}
}

export function deleteAvail(){
  return {type: DELETE_AVAILABILITY, receivedAt: Date.now()}
}

export function receiveDeleteAvailabilitySuccess(availableItems){
  return {type: DELETE_AVAILABILITY_SUCCESS,items:availableItems, receivedAt: Date.now()}
}

export function receiveDeleteAvailabilityFail(message){
  return {type: DELETE_AVAILABILITY_FAIL,errorMessage: message, receivedAt: Date.now()}
}


export function createAvailability(availability) {
  return function(dispatch) {
    dispatch(createAvail())
    console.log('create availability')
    return ApiUtils.post('availability/new',availability)
    .then(([response, jsonBody]) => {
      // do stuff with both.
      if (response.status == 200) {
        var availabilityItem = jsonBody
        availabilityItem["date"] = moment(jsonBody.dtStart).format('YYYY-MM-DD')
        availabilityItem["dtStart"] = moment(jsonBody["dtStart"]).local().format()
        availabilityItem["dtEnd"] = moment(jsonBody["dtEnd"]).local().format()
        dispatch(getCurrentAvailability())
        dispatch(createAvailSuccess(availabilityItem))
      } else {
        dispatch(createAvailFail(response.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function deleteAvailability(availabilityId){
  console.log('delete availability')
  return function(dispatch) {
    dispatch(deleteAvail())
    return ApiUtils.delete('availability/delete/' + availabilityId)
    .then(([response, jsonBody]) => {
      // do stuff with both.
      if (response.status == 200) {
        var availabilityItems = jsonBody.map(function(availObj) {
           availObj["date"] = moment(availObj.dtStart).format('YYYY-MM-DD')
           availObj["dtStart"] = moment(availObj["dtStart"]).local().format()
           availObj["dtEnd"] = moment(availObj["dtEnd"]).local().format()
           return availObj
        });
        dispatch(receiveDeleteAvailabilitySuccess(availabilityItems))
      } else {
        dispatch(receiveDeleteAvailabilityFail(jsonBody.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function getCurrentAvailability(){
  return function(dispatch) {
    dispatch(getAvailability())
    return ApiUtils.get('availability/list')
    .then(([response, jsonBody]) => {
      // do stuff with both.
      if (response.status == 200) {
        var availabilityItems = jsonBody.map(function(availObj) {
           availObj["date"] = moment(availObj.dtStart).format('YYYY-MM-DD')
           availObj["dtStart"] = moment(availObj["dtStart"]).local().format()
           availObj["dtEnd"] = moment(availObj["dtEnd"]).local().format()
           return availObj
        });
        dispatch(receiveGetAvailabilitySuccess(availabilityItems))
      } else {
        dispatch(receiveGetAvailabilityFail(jsonBody.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}
