import CONSTS from '@utils/Consts';

import * as actions from './actions';

const initialState = {
  loggedIn: false,
  user: { userType: 0 },
  isFetching: false,
  error: '',
  token: '',
  appSettings: {},
  isCreated: null,
  deletingFileStatus: 'idle',
  updatingStatus: 'idle',
  inVerify: false,
  locationPermission: false,
  requestingLocationPermission: false,
  lastPaymentString:'',
  appAvailable: true,
};


export default function auth(state = initialState, action) {
  switch (action.type) {
    // State
    case actions.APP_AVAILABLE_SET:
    return {
      ...state,
      appAvailable: action.appAvailable
    }
    case actions.AUTH_RESET_STATE:
      return {
        ...state,
        initialState,
        isFetching: false,
        error: null,
      };
    // Login and register
    case actions.LOGIN_START:
      return {
        ...state,
        isFetching: true,
        needMoreInfo: false,
        error: null,
      };
    case actions.LOGIN_SUCCESS: {
      const { user, appSettings } = action;
      return {
        ...state,
        isFetching: false,
        error: null,
        loggedIn: true,
        user,
        appSettings,
        // TODO: do we need isCreated?
        isCreated: true,
      };
    }
    case actions.LOGIN_FAIL:
      var error = action.error;
      if(error === 'Missing authentication token'){
        error = ''; //don't need to display this to the user,
                    //its an internal error.
      }
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
        error: error,
      };
    case actions.LOGIN_NEED_MORE_INFO:
      return {
        ...state,
        isFetching: false,
        needMoreInfo: true,
        authToken: action.token,
        needMoreInfoData: action.error,
      };
    // Account approval
    case actions.USER_RESEND_VERIFY_CODE_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actions.USER_RESEND_VERIFY_CODE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case actions.USER_RESEND_VERIFY_CODE_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.USER_VERIFY_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actions.USER_VERIFY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.user,
        error: null,
      };
    case actions.USER_VERIFY_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

      // Account approval
      case actions.USER_FORGOT_PASSWORD_START:
        return {
          ...state,
          isFetching: true,
          error: null,
        };
      case actions.USER_FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: null,
        };
      case actions.USER_FORGOT_PASSWORD_FAIL:
        return {
          ...state,
          isFetching: false,
          error: action.error,
        };

    // Update account
    case actions.USER_UPDATE_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actions.USER_UPDATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        user: action.user,
      };
    case actions.USER_UPDATE_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    // Refresh user
    case actions.USER_REFRESH_START:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case actions.USER_REFRESH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        user: action.user,
      };
    case actions.USER_REFRESH_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    // User types
    case actions.SET_USER_TYPE_TRAINER: {
      // TODO: use immutablity-helpers
      const user = state.user;
      user.userType = CONSTS.USER_TYPE.TRAINER;

      return {
        ...state,
        user,
      };
    }
    case actions.SET_USER_TYPE_CUSTOMER: {
      // TODO: use immutablity-helpers
      const user = state.user;
      user.userType = CONSTS.USER_TYPE.CUSTOMER;

      return {
        ...state,
        user,
      };
    }
    // Misc
    case actions.UPDATE_TRAINER_ABOUT_YOU:
      return {
        ...state,
        trainerInfo: action.trainer,
      };

    case actions.LOGOUT_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case actions.LOGOUT_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.LOGGED_OUT:
      return {
        ...state,
        ...initialState,
      };

    case actions.RECEIVED_WORKOUT_COUNT: {
      // TODO: refactor
      const user = state.user;
      user.workoutInfo = action.workouts;

      return {
        ...state,
        user
      };
    }

    case actions.UPDATE_PAYMENT_TITLE: {
          const user = state.user;
          user.lastPaymentString = action.paymentTitle;

      return {
        ...state,
        user,
      };
    }


    // Subscription plans
    case actions.CANCEL_PLAN_SUCCESS: {
      const user = state.user;
      user.workoutInfo = action.newPlanInfo;

      return {
        ...state,
        user,
      };
    }
    case actions.CANCEL_PLAN_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // Get user account
    case actions.GET_USER_ACCT_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actions.GET_USER_ACCT_SUCCESS:
      return {
        ...state,
      };

    // Permissions
    case actions.REQUEST_LOCATION_PERMISSION:
      return Object.assign({}, state, {
        requestingLocationPermission: true,
      });
    case actions.RECEIVE_LOCATION_PERMISSION_SUCCESS:
      return Object.assign({}, state, {
        locationPermission: action.value,
        requestingLocationPermission: false,
      });
    case actions.RECEIVE_LOCATION_PERMISSION_FAIL:
      return Object.assign({}, state, {
        locationPermission: false,
        requestingLocationPermission: false,
      });

    default:
      return state;
  };

  return state;
}
