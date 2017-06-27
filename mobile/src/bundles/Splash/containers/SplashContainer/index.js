import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkAuth, checkLocationPermission, sendDeviceToken, getPaymentInformation, setAppAvailable} from '@store/modules/auth/actions'
import Splash from '@Splash/components/Splash'
import {Actions} from 'react-native-router-flux'
// import {NativeModules} from 'react-native'
import * as config from '@config';
import CONSTS from '@utils/Consts';
import ApiUtils from '@utils/ApiUtils';
var PushNotification = require('react-native-push-notification');


//we need to wait here untl we see wether we go to the login screen or home screen

type Props = {
  checkAuthCookie: Function,
  isLoggedIn: boolean,
  braintreeToken: String,
  updatePayTitle: Function,
  checkLocationPermission: Function,
  sendDeviceToken: Function,
  isFetching: boolean,
  user: Object,
  getPaymentInformation: Function,
  userProfileReady: boolean,
  error: String,
  setAppAvailable: Function
}

class SplashContainer extends Component {

  props : Props

  constructor(props) {
    super(props);
    this.state = {
      getLastPaymentType: true,
      isFetching: false,
      isLoggedIn: false,
      shownLaunch: false,
      userProfileReady: false,
      userDeviceToken: '',
      userDevicePlatform: 0,
    }
  }

  componentDidMount() {
    this.props.checkAuthCookie();
    this.props.checkLocationPermission();

    navigator.geolocation.getCurrentPosition((position) => {

      var payload = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        radius: 20,
      }

      var string = 'shared/app-availables?' + ApiUtils.parseJsonAsQueryString(payload)

      ApiUtils.get(string).then(([response, jsonBody]) => {
        if(jsonBody.message === 'No app availability was found'){
          this.props.setAppAvailable(false)
        }else{
          this.props.setAppAvailable(true)
        }

      })
    })


    var container = this
    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token);
        container.setState({userDeviceToken: token.token, userDevicePlatform: token.os === 'ios' ? 0 : 1})
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: config.GCMSenderId,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
      requestPermissions: true
    });

  }


  handleLoggedIn(user, userProfileReady, braintreeToken) {
    if (user.isVerified) {
      this.setState({shownLaunch: true, isLoggedIn: true, userProfileReady: userProfileReady})
      if(this.state.userDeviceToken !== ''){
        this.props.sendDeviceToken(this.state.userDeviceToken,this.state.userDevicePlatform);
        this.setState({userDeviceToken: '', userDevicePlatform: -1})
      }
      switch (user.userType) {
        case CONSTS.USER_TYPE.UNKNOWN:
          Actions.chooseUserType();
          break;
        case CONSTS.USER_TYPE.TRAINER:
          if (!user.userProfileReady) {
            Actions.trainerAboutYou();
          } else {
            Actions.home();
          }

          break;
        case CONSTS.USER_TYPE.CUSTOMER:
          if (!user.customer || !user.customer.customerProfileReady) {
            Actions.home();
            return;
          }
          Actions.home();
          break;
        default:
          Actions.userLogin();
          break;
      }
    } else {

      Actions.phoneVerify();
    }
    if (braintreeToken != null) {
      this.props.getPaymentInformation(braintreeToken)
      this.setState({getLastPaymentType: false})
    }
  }

  componentWillReceiveProps(nextProps) {
    const {isFetching, isLoggedIn, location, user} = nextProps;

    //we just finished getting something. lets see what it is.
    if (!nextProps.isFetching) {
      //we just logged in.
      if (nextProps.isLoggedIn && !this.state.isLoggedIn) {
        this.handleLoggedIn(user, nextProps.userProfileReady, nextProps.braintreeToken)
      } else if (!this.state.shownLaunch) { //we're not logged in, brand new.
        this.setState({shownLaunch: true})
        Actions.launch()
      } else if (!nextProps.isLoggedIn && this.state.isLoggedIn) {
        this.setState({getLastPaymentType: true, isFetching: false, isLoggedIn: false, shownLaunch: false, userProfileReady: false})
        Actions.launch()
      }
      if (nextProps.userProfileReady && !this.state.userProfileReady) {
        this.handleLoggedIn(user, nextProps.userProfileReady, nextProps.braintreeToken)
      } else {

        if(!isLoggedIn)
        {
          Actions.launch()
        }else{
          // console.log('we have been here before, ignore')
        }
      }
    }

  }

  render() {
    return (<Splash/>)
  }

}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    braintreeToken: state.auth.appSettings.braintreeClientToken,
    isFetching: state.auth.isFetching,
    user: state.auth.user,
    userProfileReady: state.auth.user.userProfileReady,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthCookie: () => {
      dispatch(checkAuth())
    },
    checkLocationPermission: () => {
      dispatch(checkLocationPermission())
    },
    getPaymentInformation: (token) => {
      dispatch(getPaymentInformation(token))
    },
    sendDeviceToken: (token,platform) => {
      dispatch(sendDeviceToken(token,platform))
    },
    setAppAvailable: (available) =>{
      dispatch(setAppAvailable(available))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashContainer)
