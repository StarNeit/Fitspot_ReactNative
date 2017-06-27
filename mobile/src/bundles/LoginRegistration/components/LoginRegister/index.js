/* @flow */

import React from 'react'
import { KeyboardAvoidingView,View,Image,Text,StatusBar,TouchableHighlight,TextInput,TouchableOpacity,Dimensions} from 'react-native'

import {Actions} from 'react-native-router-flux'
import * as config from '@config';
import Title from '@components/Title'
import Link from '@components/Link'
import Logo from '@components/Logo'
import Button from '@components/Button'
import styles from './styles'
import Validators from '@utils/Validators'
import AwesomeButton from '@components/AwesomeButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,AccessToken
} = FBSDK;


type Props = {
  error: "",
  onLoginClick: Function,
  onFacebookLoginClick: Function,
};

class LoginRegister extends React.Component{
  constructor(props) {
      super(props);

      this.state = {
        email: '',
        password: '',
        btnSubmitState: 'idle',
        error: props.error,
      };
    }

  componentWillReceiveProps(nextProps){
    if(nextProps.error != this.error && this.state.btnSubmitState === 'busy'){
      this.setState({btnSubmitState:'idle'})
    }
  }

  login() {
    this.setState({btnSubmitState: 'busy'})
    if(!Validators.validEmail(this.state.email)){

      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Login Issue',
        detailsText: 'Please enter a valid email address.',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      this.setState({btnSubmitState: 'idle'})
      return;
    }

    if(!Validators.validPassword(this.state.password)){
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Login Issue',
        detailsText: 'Please ensure password is at least 5 characters',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )

      this.setState({btnSubmitState: 'idle'})
      return;
    }
    this.props.onLoginClick(this.state.email,this.state.password)
  }

  render(){
    const {onLoginClick} = this.props;

    return (
    <KeyboardAwareScrollView contentContainerStyle={styles.clientContainer}>
      <Image source={require('../../assets/login-registration-bg.jpg')} style={styles.clientContainer}>
        <Logo styles={styles.logoImage}/>
          <LoginButton
            style = {styles.facebookButton}
            readPermissions={config.facebookScopes}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  Actions.mainAppModal(
                  {
                    uniqId: new Date().getTime(),
                    visible: true,
                    headerText: 'Login Issue',
                    detailsText: result.error,
                    onOkay:null,
                    okayButtonText: 'OK',
                    showCancelButton: false,
                  }
                  )
                } else if (result.isCancelled) {

                } else {
                  AccessToken.getCurrentAccessToken().then(
                  (data) => {

                    this.props.onFacebookLoginClick({
            token: data.accessToken,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
                  })
                }
              }
            }
            />
          <Text style={styles.okText}>OR</Text>
          <View style={styles.textInputContainer}>
            <Text style={styles.errorText}>{this.props.error}</Text>
            <Text style={styles.headingText}>Email</Text>
             <TextInput style={styles.textInput} autoCorrect={false} autoCapitalize='none' keyboardType='email-address' placeholder='you@email.com' placeholderTextColor='#3e3f3e' onChangeText={(text) => this.setState({email: text})}  />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.headingText}>Password</Text>
            <TextInput style={styles.textInput} autoCapitalize='none' secureTextEntry={true} placeholder='********' placeholderTextColor='#3e3f3e' onChangeText={(text) => this.setState({password: text})}/>
          </View>
            <Button onPress={() => this.login()} buttonStyle={[styles.clientButton, this.state.btnSubmitState === 'busy' ? {  backgroundColor: '#4c4c4c',borderColor:'#4c4c4c'} : null]} buttonTextStyle={styles.buttonText}>{this.state.btnSubmitState === 'idle' ? 'Log In' : 'Logging In...'}</Button>
            <Link style={styles.forgotPWLink} onPress={Actions.forgotPassword}>Forgot Password?</Link>
        <View style={{width:Dimensions.get('window').width}}>
          <Button buttonStyle={styles.registerButton} onPress={Actions.createAccount} buttonTextStyle={styles.registerButtonText}>Register An Account</Button>
        </View>
      </Image>
    </KeyboardAwareScrollView>
  )
  }
}

export default LoginRegister;
