import moment from 'moment'

import ApiUtils from '@utils/ApiUtils'
import CONSTS from '@utils/Consts';

import { loggedIn } from '@store/modules/auth/actions'

export const FETCH_WORKOUTS = "FETCH_WORKOUTS"
export const FETCH_WORKOUTS_SUCCESS = "FETCH_WORKOUTS_SUCCESS"
export const FETCH_WORKOUTS_FAILURE = "FETCH_WORKOUTS_FAILURE"

export const REQUEST_NEW_WORKOUT = "REQUEST_NEW_WORKOUT"
export const REQUEST_NEW_WORKOUT_SUCCESS = "REQUEST_NEW_WORKOUT_SUCCESS"
export const REQUEST_NEW_WORKOUT_FAILURE = "REQUEST_NEW_WORKOUT_FAILURE"

export const TRAINER_CONFIRM = 'TRAINER_CONFIRM'
export const TRAINER_CONFIRM_SUCCESS = 'TRAINER_CONFIRM_SUCCESS'
export const TRAINER_CONFIRM_FAIL = 'TRAINER_CONFIRM_FAIL'

export const REQUEST_CHANGE_WORKOUT = "REQUEST_CHANGE_WORKOUT"
export const REQUEST_CHANGE_WORKOUT_SUCCESS = "REQUEST_CHANGE_WORKOUT_SUCCESS"
export const REQUEST_CHANGE_WORKOUT_FAIL = "REQUEST_CHANGE_WORKOUT_FAIL"

export const CANCEL_WORKOUT_SUCCESS = 'CANCEL_WORKOUT_SUCCESS'
export const CANCEL_WORKOUT_FAIL = 'CANCEL_WORKOUT_FAIL'


export const FETCH_TRAINER_PAYMENT_SUCCESS = 'FETCH_TRAINER_PAYMENT_SUCCESS';
export const FETCH_TRAINER_PAYMENT_FAIL = 'FETCH_TRAINER_PAYMENT_FAIL';

export const FETCH_UNRATED_WORKOUTS = 'FETCH_UNRATED_WORKOUTS';
export const FETCH_UNRATED_WORKOUTS_SUCCESS = 'FETCH_UNRATED_WORKOUTS_SUCCESS';
export const FETCH_UNRATED_WORKOUTS_FAIL = 'FETCH_UNRATED_WORKOUTS_FAIL';


export function requestWorkouts() {
  return { type: FETCH_WORKOUTS }
}

export function receiveWorkoutsSuccess(workouts){
  return { type: FETCH_WORKOUTS_SUCCESS, workouts, receivedAt: Date.now()}
}

export function receiveWorkoutsFail(error){
  return { type: FETCH_WORKOUTS_FAILURE, error, receivedAt: Date.now()}
}

export function requestNewWorkout() {
  return { type: REQUEST_NEW_WORKOUT }
}

export function receiveRequestWorkoutSuccess(workout){
  return { type: REQUEST_NEW_WORKOUT_SUCCESS, workout, receivedAt: Date.now()}
}

export function receiveRequestWorkoutFail(error){
  return { type: REQUEST_NEW_WORKOUT_FAILURE, error, receivedAt: Date.now()}
}

export function trainerConfirm(){
  return { type: TRAINER_CONFIRM,  receivedAt: Date.now()}
}

export function trainerConfirmSuccess(workout){
  return { type: TRAINER_CONFIRM_SUCCESS, workout, receivedAt: Date.now()}
}

export function trainerConfirmFail(){
  return { type: TRAINER_CONFIRM_FAIL, error, receivedAt: Date.now()}
}

export function requestChangeWorkout() {
  return { type: REQUEST_CHANGE_WORKOUT }
}

export function receiveChangeRequestWorkoutSuccess(workout){
  return { type: REQUEST_CHANGE_WORKOUT_SUCCESS, workout, receivedAt: Date.now()}
}

export function receiveChangeRequestWorkoutFail(error){
  return { type: REQUEST_CHANGE_WORKOUT_FAIL, error, receivedAt: Date.now()}
}

export function cancelWorkoutSuccess(workout){
  return { type: CANCEL_WORKOUT_SUCCESS, workout, receivedAt: Date.now()}
}

export function cancelWorkoutFail(error){
  return { type: CANCEL_WORKOUT_FAIL, error, receivedAt: Date.now()}
}

export function fetchTrainerPaymentSuccess(paymentInfo){
  return { type: FETCH_TRAINER_PAYMENT_SUCCESS, paymentInfo, receivedAt: Date.now()}
}

export function fetchTrainerPaymentFail(message){
  return { type: FETCH_TRAINER_PAYMENT_FAIL, message, receivedAt: Date.now()}
}

export function fetchUnratedSessionsSuccess(jsonBody){
  return { type: FETCH_UNRATED_WORKOUTS_SUCCESS, unratedSessions: jsonBody, receivedAt: Date.now()}
}

export function fetchUnratedSessionsFail(message){
  return { type: FETCH_UNRATED_WORKOUTS_FAIL, message, receivedAt: Date.now()}
}



export function fetchWorkouts() {
  return function(dispatch) {
    dispatch(requestWorkouts())

    var payload = {
      status : 1,
      dtStart: moment().subtract(1,'y').utc().format(),
      dtEnd: moment().add(1,'y').utc().format()
    }
    var string = 'customers/upcoming-sessions?' + ApiUtils.parseJsonAsQueryString(payload)
    return ApiUtils.get(string)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        var sessions = jsonBody.map(function(session) {
          session["dtStart"] = session.date
          session["date"] = moment(session.dtStart).format('YYYY-MM-DD')
          return session
        });
        dispatch(receiveWorkoutsSuccess(sessions))
      } else {
        dispatch(receiveWorkoutsFail(jsonBody.message))
      }
    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function fetchTrainerWorkouts() {
  return function(dispatch) {
    dispatch(requestWorkouts())

    var payload = {
      statuses : [0,1],
      dtStart: moment().subtract(1,'y').utc().format(),
      dtEnd: moment().add(1,'y').utc().format()
    }
    var string = 'trainers/sessions?' + ApiUtils.parseJsonAsQueryString(payload)
    return ApiUtils.get(string)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {

        var sessions = jsonBody.map(function(session) {
          session["dtStart"] = session.date
          session["date"] = moment(session.dtStart).format('YYYY-MM-DD')
          return session
        });
        dispatch(receiveWorkoutsSuccess(sessions))
      } else {
        dispatch(receiveWorkoutsFail(jsonBody.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function trainerConfirmWorkoutRequest(workoutId){
  return function(dispatch) {
    dispatch(trainerConfirm())
    return ApiUtils.patch('workouts/status/' + workoutId,{'status':CONSTS.WORKOUT_STATUS.ACCEPTED})
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(trainerConfirmSuccess(jsonBody))
      } else {
        dispatch(trainerConfirmFail(jsonBody.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }

}

export function requestWorkoutChange(workoutId,workoutTime){
  return function(dispatch) {
    dispatch(requestChangeWorkout())
    return ApiUtils.post('workouts/edit/' + workoutId,{'date': workoutTime })
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(receiveChangeRequestWorkoutSuccess(jsonBody))
      } else {
        dispatch(receiveChangeRequestWorkoutFail(jsonBody.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function cancelWorkout(workoutId){
  return function(dispatch){
    return ApiUtils.patch('workouts/cancel/' + workoutId)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        // dispatch(trainerConfirmSuccess(jsonBody))
        dispatch(cancelWorkoutSuccess(jsonBody))
      } else {
        // dispatch(trainerConfirmFail(jsonBody.message))
        dispatch(cancelWorkoutFail(jsonBody))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }

}

export function addWorkout(payload){
  return function(dispatch) {
    dispatch(requestNewWorkout())
    console.log(payload)
    return ApiUtils.post('workouts/book',payload)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        console.log(response)
        console.log(jsonBody)
        dispatch(receiveRequestWorkoutSuccess(jsonBody))
      } else {
        dispatch(receiveRequestWorkoutFail(jsonBody.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function fetchTrainerPayments(dtStart,dtEnd){
  return function(dispatch) {
    return ApiUtils.get('trainers/payment-history?dtStart=' + dtStart + '&dtEnd=' + dtEnd)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(fetchTrainerPaymentSuccess(jsonBody));
      } else {
        dispatch(fetchTrainerPaymentFail(jsonBody.message));
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function rateWorkout(sessionId,gymRating,trainerRating){
  return function(dispatch) {
    console.log('workouts/rate-session/' + sessionId)
    return ApiUtils.patch('workouts/rate-session/' + sessionId, {trainerRating: trainerRating, gymRating:gymRating})
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(rateWorkoutSuccess(jsonBody));
      } else {
        dispatch(rateWorkoutFail(jsonBody.message));
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}


export function fetchUnratedSessions(){
  return function(dispatch) {
    return ApiUtils.get('workouts/unrated-sessions')
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        //filter out any workouts that don't have both user and trainer.
        var results = jsonBody.filter(workout => (workout.userId != null && workout.trainerId != null))
        dispatch(fetchUnratedSessionsSuccess(results));
      } else {
        dispatch(fetchUnratedSessionsFail(jsonBody.message));
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}
