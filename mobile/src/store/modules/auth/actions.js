import AsyncStorage from '@platform/asyncStorage';
import Permissions from '@platform/store/permissions';
//import BrainTree from '@platform/braintree'


import CONSTS from '@utils/Consts';
import moment from 'moment'

import { getCurrentAvailability } from '@store/modules/availability/actions';


import { fetchWorkouts, fetchTrainerWorkouts, fetchTrainerPayments, fetchUnratedSessions } from '@store/modules/workouts/actions';
import { fetchChats } from '@store/modules/chat/actions'


import ApiUtils from '@utils/ApiUtils';

// Constants
const NAMESPACE = 'AUTH';

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_TYPE_KEY = 'userType';

export const AUTH_RESET_STATE = `${NAMESPACE}/AUTH_RESET_STATE`;

export const LOGIN_START = `${NAMESPACE}/LOGIN_START`;
export const LOGIN_SUCCESS = `${NAMESPACE}/LOGIN_SUCCESS`;
export const LOGIN_FAIL = `${NAMESPACE}/LOGIN_FAIL`;
export const LOGIN_NEED_MORE_INFO = `${NAMESPACE}/LOGIN_NEED_MORE_INFO`;

export const USER_RESEND_VERIFY_CODE_START = `${NAMESPACE}/USER_RESEND_VERIFY_CODE_START`;
export const USER_RESEND_VERIFY_CODE_SUCCESS = `${NAMESPACE}/USER_RESEND_VERIFY_CODE_SUCCESS`;
export const USER_RESEND_VERIFY_CODE_FAIL = `${NAMESPACE}/USER_RESEND_VERIFY_CODE_FAIL`;

export const USER_VERIFY_START = `${NAMESPACE}/USER_VERIFY_START`;
export const USER_VERIFY_SUCCESS = `${NAMESPACE}/USER_VERIFY_SUCCESS`;
export const USER_VERIFY_FAIL = `${NAMESPACE}/USER_VERIFY_FAIL`;

export const USER_FORGOT_PASSWORD_START = `${NAMESPACE}/USER_FORGOT_PASSWORD_START`;
export const USER_FORGOT_PASSWORD_SUCCESS = `${NAMESPACE}/USER_FORGOT_PASSWORD_SUCCESS`;
export const USER_FORGOT_PASSWORD_FAIL = `${NAMESPACE}/USER_FORGOT_PASSWORD_FAIL`;

export const USER_UPDATE_START = `${NAMESPACE}/USER_UPDATE_START`;
export const USER_UPDATE_SUCCESS = `${NAMESPACE}/USER_UPDATE_SUCCESS`;
export const USER_UPDATE_FAIL = `${NAMESPACE}/USER_UPDATE_FAIL`;

export const SET_USER_TYPE_CUSTOMER = `${NAMESPACE}/SET_USER_TYPE_CUSTOMER`;
export const SET_USER_TYPE_TRAINER = `${NAMESPACE}/SET_USER_TYPE_TRAINER`;

export const UPDATE_TRAINER_ABOUT_YOU = `${NAMESPACE}/UPDATE_TRAINER_ABOUT_YOU`;

export const LOGGED_OUT = `${NAMESPACE}/LOGGED_OUT`;

export const LOGOUT_START = `${NAMESPACE}/LOGOUT_START`;
export const LOGOUT_SUCCESS = `${NAMESPACE}/LOGOUT_SUCCESS`;
export const LOGOUT_FAIL = `${NAMESPACE}/LOGOUT_FAIL`;

export const RECEIVED_WORKOUT_COUNT = `${NAMESPACE}/RECEIVED_WORKOUT_COUNT`;

export const UPDATE_PAYMENT_TITLE = `${NAMESPACE}/UPDATE_PAYMENT_TITLE`;

export const CANCEL_PLAN_SUCCESS = `${NAMESPACE}/CANCEL_PLAN_SUCCESS`;
export const CANCEL_PLAN_FAILURE = `${NAMESPACE}/CANCEL_PLAN_FAILURE`;

export const USER_REFRESH_START = `${NAMESPACE}/USER_REFRESH_START`;
export const USER_REFRESH_SUCCESS = `${NAMESPACE}/USER_REFRESH_SUCCESS`;
export const USER_REFRESH_FAIL = `${NAMESPACE}/USER_REFRESH_FAIL`;

//ANDROID PERMISSIONS
export const CHECK_LOCATION_PERMISSION = `${NAMESPACE}/CHECK_LOCATION_PERMISSION`;

export const REQUEST_LOCATION_PERMISSION = `${NAMESPACE}/REQUEST_LOCATION_PERMISSION`;
export const RECEIVE_LOCATION_PERMISSION_SUCCESS = `${NAMESPACE}/RECEIVE_LOCATION_PERMISSION_SUCCESS`;
export const RECEIVE_LOCATION_PERMISSION_FAIL = `${NAMESPACE}/RECEIVE_LOCATION_PERMISSION_FAIL`;

export const APP_AVAILABLE_SET = `${NAMESPACE}/APP_AVAILABLE_SET`;


export function setUserTypeCustomer(){
  return {type: SET_USER_TYPE_CUSTOMER, receivedAt: Date.now()};
}

export function setUserTypeTrainer(){
  return {type: SET_USER_TYPE_TRAINER, receivedAt: Date.now()};
}


// Login
function loginStart() {
  return {type: LOGIN_START, receivedAt: Date.now()};
}

function loginSuccess(user, appSettings) {
  return {type: LOGIN_SUCCESS, user, appSettings, receivedAt: Date.now()};
}

export function loginFail(error) {
  return {type: LOGIN_FAIL, error, receivedAt: Date.now()};
}

export function authResetState() {
  return {type: AUTH_RESET_STATE, receivedAt: Date.now()};
}

function handleFBError(error, token) {
  if (error.needMoreInfo) {
    return {type: LOGIN_NEED_MORE_INFO, error, token, receivedAt: Date.now()};
  } else {
    return loginFail(error.message);
  }
}

// User verification

function userResendVerifyCodeStart() {
  return {type: USER_RESEND_VERIFY_CODE_START, receivedAt: Date.now()};
}

function userResendVerifyCodeSuccess(user) {
  return {type: USER_RESEND_VERIFY_CODE_SUCCESS, receivedAt: Date.now()};
}

function userResendVerifyCodeFail(error) {
  return {type: USER_RESEND_VERIFY_CODE_FAIL, error, receivedAt: Date.now()};
}


function userVerifyStart() {
  return {type: USER_VERIFY_START, receivedAt: Date.now()};
}

function userVerifySuccess(user) {
  return {type: USER_VERIFY_SUCCESS, user, receivedAt: Date.now()};
}

function userVerifyFail(error) {
  return {type: USER_VERIFY_FAIL, error, receivedAt: Date.now()};
}

// User forgot password
function userForgotPasswordStart() {
  return {type: USER_FORGOT_PASSWORD_START, receivedAt: Date.now()};
}

function userForgotPasswordSuccess(user) {
  return {type: USER_FORGOT_PASSWORD_SUCCESS, user, receivedAt: Date.now()};
}

function userForgotPasswordFail(error) {
  return {type: USER_FORGOT_PASSWORD_FAIL, error, receivedAt: Date.now()};
}

// Update account
function userUpdateStart() {
  return {type: USER_UPDATE_START, receivedAt: Date.now()};
}

function userUpdateSuccess(user) {
  return {type: USER_UPDATE_SUCCESS, user: user, receivedAt: Date.now()};
}

function userUpdateFail(error) {
  return {type: USER_UPDATE_FAIL, error: error, receivedAt: Date.now()};
}

export function setAppAvailable(appAvailable) {
  return {type: APP_AVAILABLE_SET, appAvailable, receivedAt: Date.now()};
}

// Logout
function logoutStart() {
  return {type: LOGOUT_START, receivedAt: Date.now()};
}

function logoutSuccess(error) {
  return {type: LOGGED_OUT, receivedAt: Date.now()};
}

function logoutFail(error) {
  return {type: LOGOUT_FAIL, error, receivedAt: Date.now()};
}

export function loggedOut() {
  return {type: LOGGED_OUT, receivedAt: Date.now()};
}

export function updateUserTrainerAboutYou(trainer) {
  return {type: UPDATE_TRAINER_ABOUT_YOU, trainer: trainer, receivedAt: Date.now()};
}

export function receivedWorkoutCount(workouts) {
  return {type: RECEIVED_WORKOUT_COUNT, workouts: workouts, receivedAt: Date.now()};
}

// TODO: What's this?
// TODO: This is where we call to braintree to get the
// last card used in mobile. i.e. Visa ending in 1144
export function updatePaymentTitle(title){
  return {type: UPDATE_PAYMENT_TITLE, paymentTitle: title, recievedAt: Date.now()};
}

export function cancelledPlan(newPlanInfo){
  return { type: CANCEL_PLAN_SUCCESS, newPlanInfo, receivedAt: Date.now()};
}

export function failedCancelledPlan(error){
  return { type: CANCEL_PLAN_FAILURE, error, receivedAt: Date.now()};
}

export function deletingFile(){
  return { type: DELETE_FILE, receivedAt: Date.now()};
}
export function deletingFileSuccess(message){
  return { type: DELETE_FILE_SUCCESS, message, receivedAt: Date.now()};
}
export function deletingFileFailed(error){
  return { type: DELETE_FILE_FAIL, error, receivedAt: Date.now()};
}

export function refreshUserStart() {
  return { type: USER_REFRESH_START, receivedAt: Date.now()};
}

export function refreshUserSuccess(user) {
  return { type: USER_REFRESH_SUCCESS, user, receivedAt: Date.now()};
}

export function refreshUserFail(error) {
  return { type: USER_REFRESH_FAIL, error, receivedAt: Date.now()};
}

export function requestLocationPermission() {
  return {type: REQUEST_LOCATION_PERMISSION, receivedAt: Date.now()};
}

export function receiveLocationPermission(value) {
  return {type: RECEIVE_LOCATION_PERMISSION_SUCCESS, value, receivedAt: Date.now()};
}

export function receiveLocationPermissionFail(error) {
  return {type: RECEIVE_LOCATION_PERMISSION_FAIL, error, receivedAt: Date.now()};
}

// Login with password
function userLoggedIn(user) {
  return function(dispatch) {
    // TODO: Check if user is verified and finished the profile before pulling
    switch (user.userType) {
      case CONSTS.USER_TYPE.TRAINER:
        dispatch(getCurrentAvailability());
        dispatch(fetchTrainerWorkouts());
        dispatch(fetchTrainerPayments(moment().subtract(1,'months').utc().format(),moment().utc().format()));
        break;
      case CONSTS.USER_TYPE.CUSTOMER:
        dispatch(fetchWorkoutsAvailable());
        dispatch(fetchUnratedSessions());
        break;
    }

    dispatch(fetchChats());
  };
}

function loginWithUser(user) {
  return function(dispatch) {
    return ApiUtils.get('users/app-settings')
      .then(([response, appSettings]) => {
        if (response.status == 200) {
          dispatch(loginSuccess(user, appSettings));

          // Refresh token after every successful login
          dispatch(getAuthToken());

          // Fetch additional info
          dispatch(userLoggedIn(user));
        } else {
          dispatch(loginFail(appSettings.message));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(loginFail(err.message));
      });
  };
}

export function loginUser(email, password) {
  return function(dispatch) {
    dispatch(loginStart());

    return ApiUtils.post('auth/login', {email, password})
      .then(([response, user]) => {
        if (response.status == 200) {
          dispatch(loginWithUser(user));
        } else {
          dispatch(loginFail(user.message));
        }
      }).catch(err => {
        dispatch(loginFail(err.message));
      });
  };
}

export function loginUserViaToken(token) {
  return function(dispatch) {
    dispatch(loginStart());

    return ApiUtils.post('auth/token', {token})
      .then(([response, user]) => {
        if (response.status == 200) {
          dispatch(loginWithUser(user));
        } else {
          dispatch(loginFail(user.message));
        }

      }).catch(err => {
        dispatch(loginFail(err.message));
      });
  };
}

export function getAuthToken() {
  return (dispatch) => {
    return ApiUtils.get('auth/token')
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          AsyncStorage.setItem(ACCESS_TOKEN_KEY, jsonBody.token).catch(err => {
            console.log('AsyncStorage error: ' + err.message);
          });
        }
      }).catch(err => {
        console.log('Error: ', err);
      });
  };
}

export function checkAuth() {

  return (dispatch) => {
    dispatch(loginStart());

    return AsyncStorage.getItem(ACCESS_TOKEN_KEY)
      .then((token) => {
        ApiUtils.get('users/me')
          .then(([response, user]) => {
            if (response.status == 200) {
              dispatch(loginWithUser(user));
            } else {
              if (token) {
                dispatch(loginUserViaToken(token));
              } else {
                dispatch(loginFail('Missing authentication token'));
              }
            }
          })
          .catch(err => {
            dispatch(loginFail(err.message));
          });
      })
      .catch(err => {
        dispatch(loginFail(err.message));
      });
  };
}

export function resendVerifyCode(user_id) {
  return function(dispatch) {
    dispatch(userResendVerifyCodeStart());

    ApiUtils.post(`auth/resend-confirm`, {user_id})
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(userResendVerifyCodeSuccess(jsonBody));
        } else {
          dispatch(userResendVerifyCodeFail(jsonBody.message));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(userResendVerifyCodeFail(err.message));
      });
  };
}

export function verifyCurrentUser(code) {
  return function(dispatch) {
    dispatch(userVerifyStart());

    ApiUtils.post(`auth/confirm`, {code})
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(userVerifySuccess(jsonBody));
        } else {
          dispatch(userVerifyFail(jsonBody.message));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(userVerifyFail(err.message));
      });
  };
}

export function forgotPassword(email) {
  return function(dispatch) {
    dispatch(userForgotPasswordStart());
    ApiUtils.post(`auth/forgot-password`, {email})
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(userForgotPasswordSuccess(jsonBody));
        } else {
          dispatch(userForgotPasswordFail(jsonBody.message));
        }
      })
      .catch(err => {
        dispatch(userForgotPasswordFail(err.message));
      });
  };
}

export function createUser(user) {
  return function(dispatch) {
    dispatch(loginStart());

    ApiUtils.post('auth/register', user)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(loginWithUser(jsonBody));
        } else {
          dispatch(loginFail(jsonBody.message));
        }

      }).catch(err => {
        dispatch(loginFail(err.message));
      });
  };
}

export function createUserFB(payload) {
  return (dispatch) => {
    dispatch(loginStart());

    ApiUtils.post('auth/facebook-login', payload)
      .then(([response, jsonBody]) => {
        if (response.status === 200) {
          dispatch(loginWithUser(jsonBody));
        } else {
          dispatch(handleFBError(jsonBody, payload.token));
        }
      }).catch((err) => {
        dispatch(loginFail(err.message));
      });
  };
}

// Update user
export function updateCustomer(customer) {
  return function(dispatch) {

    // we have new avatar to upload
    // we'll call this,
    // because after we successfully upload
    // we update again anyways
    // TODO: refactor
    if (customer.avatarSource != null) {
      dispatch(updateUserAvatar(customer));
    }else{
      dispatch(userUpdateStart());

      if (customer.userType != CONSTS.USER_TYPE.CUSTOMER) {
        customer.userType = CONSTS.USER_TYPE.CUSTOMER;
      }

      if (customer.hasOwnProperty('trainer')) {
        console.log('removing trainer as we dont share accounts as of right now');
        delete customer.trainer;
      }


      ApiUtils.patch('users/edit', customer)
        .then(([response, jsonBody]) => {
          if (response.status == 200) {
            dispatch(userUpdateSuccess(jsonBody));
            //we need to do this in case the user
            //is just now updating their info, we need to get
            //the braintree token.
            dispatch(loginWithUser(customer));
          } else {
            dispatch(userUpdateFail(jsonBody.message));
          }
      }).catch(err => {
        dispatch(userUpdateFail(err.message));
      });
    }

  };
}

export function updateUserAvatar(customer) {
  return function(dispatch) {
    var fileInfo = { uri: customer.avatarSource.replace('file://', '') };
    ApiUtils.postFile('files/upload', customer, fileInfo)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          customer.avatarSource = null
          customer.avatarId = jsonBody.id
          if(customer.userType === CONSTS.USER_TYPE.CUSTOMER){
            dispatch(updateCustomer(customer));
          }else{
            dispatch(updateTrainer(customer));
          }
        } else {
          dispatch(userUpdateFail(err.message));
        }

      }).catch(err => {
        dispatch(userUpdateFail(err.message));
      });
  };
}

// Update trainer
export function updateTrainerAboutYou(trainer){
  return function(dispatch) {
    dispatch(updateUserTrainerAboutYou(trainer));
  };
}

export function updateTrainer(trainer){
  return function(dispatch) {


    // we have new avatar to upload
    // we'll call this,
    // because after we successfully upload
    // we update again anyways
    // TODO: refactor
    if (trainer.avatarSource != null) {
      dispatch(updateUserAvatar(trainer));
    }else{

      dispatch(userUpdateStart());

      if(trainer.userType != CONSTS.USER_TYPE.TRAINER){
        trainer.userType = CONSTS.USER_TYPE.TRAINER;
      }

      if(trainer.hasOwnProperty('customer')){
        console.log('removing customer as we dont share accounts as of right now');
        delete trainer.customer;
      }

      ApiUtils.patch('users/edit', trainer)
        .then(([response, jsonBody]) => {
          if (response.status == 200) {
            dispatch(userUpdateSuccess(jsonBody));
          } else {
            dispatch(userUpdateFail(jsonBody.message));
          }

        }).catch(err => {
          console.log('Error: ', err);
          dispatch(userUpdateFail(err.message));
        });
    }
  };
}

export function logout(){
  // TODO: API call to logout
  return function(dispatch) {
    AsyncStorage.removeItem('accessToken')
      .then(() => {
        return AsyncStorage.removeItem('user');
      })
      .then(() => {
        //we are completely removed from the storage
        dispatch(loggedOut());
      })
      .catch(err => {
        // TODO: Make this error message great again
        console.log(err);
        console.log('whoops!');
      });
    dispatch(logoutStart());
    ApiUtils.post(`auth/logout`, {})
      .then(([response, jsonBody]) => {

        if (response.status == 200) {
          dispatch(logoutSuccess(jsonBody));
        } else {
          dispatch(logoutFail(jsonBody.message));
        }
      })
      .catch(err => {
        dispatch(logoutFail(err.message));
      });
  };
}


export function fetchWorkoutsAvailable(){
  return function(dispatch) {
    // TODO: Error handling
    ApiUtils.get('customers/subscription-status')
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(fetchWorkouts());
          dispatch(receivedWorkoutCount(jsonBody));
        } else {
          //not authorized, maybe haven't finished account.
          console.log('Error: ', jsonBody);
        }

      }).catch(err => {
        console.log('Error: ', err);
      });
  };
}

export function cancelSubscription() {
  return function(dispatch) {
    return ApiUtils.patch('customers/cancel-plan')
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(cancelledPlan(jsonBody));
        } else {
          dispatch(failedCancelledPlan(jsonBody.message));
        }

      }).catch(err => {
        console.log('Error: ', err);
        dispatch(failedCancelledPlan(err.message));
      });
  };
}

export function refreshUser() {
  return function(dispatch) {
    dispatch(refreshUserStart());

    return ApiUtils.get(`users/me`)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(refreshUserSuccess(jsonBody));
        } else {
          dispatch(refreshUserFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
        dispatch(refreshUserFail(err.message));
      });
  };
}

export function getPaymentInformation(token) {
  return function(dispatch) {
    console.log('calling')
    BrainTree.getPaymentInformation(token).then(value => {
      dispatch(updatePaymentTitle(value));
    });
  };
}

export function checkLocationPermission() {
  return function(dispatch) {
    Permissions.checkLocationPermission().then(value => {
      dispatch(receiveLocationPermission(value));
    });
  };
}

export function getLocationPermission() {
  return function(dispatch){
    dispatch(requestLocationPermission());

    Permissions.requestLocationPermission().then(value => {
      dispatch(receiveLocationPermission(value));
    })
    .catch(err => {
      dispatch(receiveLocationPermissionFail(err));
    });
  };
}

export function sendDeviceToken(token, platform){
  return function(dispatch) {
    dispatch(refreshUserStart());

    return ApiUtils.post(`auth/device-token`, {token, platform})
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          // dispatch(refreshUserSuccess(jsonBody));
        } else {
          // dispatch(refreshUserFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
        dispatch(refreshUserFail(err.message));
      });
  };
}
