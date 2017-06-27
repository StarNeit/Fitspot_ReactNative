/* @flow */
import React from 'react'
import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import Link from '@components/Link'
import Button from '@components/Button'
import GreenBackButton from '@components/GreenBackButton'
import HorizontalLine from '@components/HorizontalLine'
import SegmentedControl from '@components/SegmentedControl'
import styles from './styles'
import CONSTS from '@utils/Consts'
import NavigationSteps from '@components/NavigationSteps'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import  DeviceInfo  from 'react-native-device-info'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,AccessToken
} = FBSDK;



import Validators from '@utils/Validators'

type Props = {
  error: "",
  onCreateClick: Function,
  onFacebookLoginClick: Function,
  isCreated: boolean,
  userType:int,
  initialValues: Object,
  authToken: String,
}

class CreateAccount extends React.Component {

  constructor(props){
    super(props);

    var initialState = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      gender: 0,
      timezone: DeviceInfo.getTimezone(),
      userType: this.props.userType,
      btnSubmitState: 'idle',
      selectedGender: '',
      token: props.authToken

    }
    if(props.initialValues != null)
    {
      initialState = { ...initialState, ...props.initialValues }
    }


    this.state = initialState

  }

  componentWillUnmount(){
    this.setState({})
  }

  createUser(){

    if(!Validators.validEmail(this.state.email)){

      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Entry Error',
        detailsText: 'Please enter a valid email address.',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      return;
    }

    if(this.props.initialValues == null && !Validators.validPassword(this.state.password)){

      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Entry Error',
        detailsText: 'Please ensure password is at least 5 characters',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      return;
    }

    if(!Validators.validFirstOrLastName(this.state.firstName)){

      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Entry Error',
        detailsText: 'Please enter a valid first name.',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      return;
    }

    if(!Validators.validFirstOrLastName(this.state.lastName)){

      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Entry Error',
        detailsText: 'Please enter a valid last name.',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      return;
    }

    if(!Validators.validPhoneNumber(this.state.phone)){

      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Entry Error',
        detailsText: 'Please enter a valid phone number.',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      return;
    }
    this.setState({btnSubmitState:'busy'})
    if(this.state.selectedGender === 'Unspecified'){
      this.setState({gender:2})
    }else if(this.state.selectedGender === 'Female'){
      this.setState({gender:1})
    }else{
      this.setState({gender:0})
    }

    var user = Object.assign({}, this.state)
    if(this.props.initialValues == null){
      this.props.onCreateClick(user)
    }else{
      this.props.onFacebookLoginClick(this.state)
    }

    // Actions.phoneVerify()
  }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.isCreated && !this.props.isCreated){
      this.setState({btnSubmitState:'idle'})
      if(nextProps.userType != CONSTS.USER_TYPE.TRAINER){
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Registration Complete!',
          detailsText: 'Thank you for registering with FitSpot. We are sending a text message to confirm your phone number.',
          showSubDetails: false,
          onOkay: Actions.phoneVerify(),
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )

      }else{
        Actions.trainerAboutYou()
      }
    }
    if(nextProps.initialValues != null && this.props.initialValues == null){
      this.setState({...this.state, ...nextProps.initialValues, token: nextProps.authToken})
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Facebook Login Issue',
        detailsText: "We need a few more bits of information before we can create an account. Please fill the blank fields and click Create Account",
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
    }
    this.setState({btnSubmitState:'idle'})
  }

  renderNavSteps(){
    if(this.props.userType == CONSTS.USER_TYPE.TRAINER){
      return(
        <NavigationSteps style={{marginTop:25}} currentNumber={1} numberOfSteps={3}  />
      )
    }else{
      return null
    }
  }

  render(){
    return (
      <KeyboardAwareScrollView  contentContainerStyle={styles.clientContainer}>
        <GreenBackButton/>
        <Text style={styles.headerText}>Create Your Account</Text>
        { this.renderNavSteps() }
          <LoginButton
            style = {styles.facebookButton}
            readPermissions={["email","user_friends"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  Actions.mainAppModal(
                  {
                    uniqId: new Date().getTime(),
                    visible: true,
                    headerText: 'Login Failed',
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
        <HorizontalLine/>
        <View style={styles.textInputContainer}>
          <Text style={styles.okText}>Email</Text>
          <TextInput style={styles.textInput}  value={this.state.email} autoCorrect={false} keyboardType='email-address' autoCapitalize='none' placeholder='you@email.com' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({email: text})}/>
        </View>
        <HorizontalLine/>
        { this.props.initialValues == null ?
          <View>
          <View style={styles.passwordInputContainer}>
            <Text style={styles.okText}>Password</Text>
            <TextInput style={styles.textInput} secureTextEntry={true} placeholder='********' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({password: text})}/>
          </View>
          <HorizontalLine/>
          </View>
          :
          null
        }
        <View style={styles.nameEntryContainer}>
          <View>
            <Text style={styles.nameInputTitle}>FIRST NAME</Text>
            <TextInput style={styles.nameInput} placeholder='Johnny' value={this.state.firstName} autoCorrect={false} placeholderTextColor='#c0c0c0'onChangeText={(text) => this.setState({firstName: text})}/>
          </View>
          <View>
            <Text style={styles.nameInputTitle}>LAST NAME</Text>
            <TextInput style={styles.nameInput} placeholder='Appleseed' value={this.state.lastName} autoCorrect={false} placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({lastName: text})}/>
          </View>
        </View>
        <HorizontalLine/>

        <View style={styles.passwordInputContainer}>
          <Text style={styles.okText}>Phone Number</Text>
           <TextInput style={styles.textInput} autoCorrect={false} value={this.state.phone} keyboardType='phone-pad' placeholder='555-555-5555' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({phone: text})}/>
        </View>

        <HorizontalLine/>
          <View style={{width: 260}}>
          <SegmentedControl vals={['Male','Female','Unspecified']} color={'#5FB13D'} onChange={(event) => {this.setState({selectedGender: event.nativeEvent.selectedSegmentIndex})}} ></SegmentedControl>
        </View>
        <Text style={styles.errorText}>{this.props.error}</Text>
        <Button onPress={() => this.createUser()} buttonStyle={[styles.createAccountButton,this.state.btnSubmitState == 'idle' ? null : {backgroundColor:'#4c4c4c',borderColor:'#4c4c4c'}]} buttonTextStyle={styles.createAccountButtonText}>{this.state.btnSubmitState == 'idle' ? 'Create Account' : 'Creating Account...'}</Button>
      </KeyboardAwareScrollView>
    )
  }
}

export default CreateAccount
