import React from 'react'
import {View, Image, Text, StatusBar, TouchableHighlight,TextInput} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import GreenBackButton from '@components/GreenBackButton'
import styles from './styles'
import Button from '@components/Button'
import HorizontalLine from '@components/HorizontalLine'
import ApiUtils from '@utils/ApiUtils'

type Props = {

}

class ForgotPassword extends React.Component{

  Props:props

  constructor(props){
    super(props)
    this.state = {
      emailValue : ''
    }
  }

  sendPasswordReset(){
    ApiUtils.post('auth/forgot-password',{email : this.state.emailValue}).then(([response, jsonBody]) => {
      // do stuff with both.
      // console.log(response)
      // console.log(jsonBody)
      if (response.status == 200) {
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Password reset request sent.',
          detailsText: 'Please check your email for instructions on how to reset your password.',
          showSubDetails: false,
          onOkay: () => Actions.popTo('loginRegister'),
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
      } else {
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Password request error',
          detailsText: jsonBody.message,
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
      }

    }).catch(err => {
      console.log('Error: ', err);
    })

  }
  render(){
    return (
      <View style={{flex:1}}>
        <GreenBackButton/>
        <Image source={require('../../assets/forgot-password-bg.jpg')} style={styles.clientContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.description}>Enter your email below and we will send you a link to reset your password.</Text>

          <View style={styles.textInputContainer}>
            <TextInput  autoCorrect={false} autoCapitalize='none' keyboardType='email-address' style={styles.textInput} placeholder= 'Your Email' placeholderTextColor='#3e3f3e'
              onChangeText={(text) => this.setState({emailValue: text})} value={this.state.emailValue}
              />
          </View>
          <Button onPress={() => this.sendPasswordReset()} buttonStyle={styles.clientButton} buttonTextStyle={styles.buttonText}>Reset Password</Button>
        </Image>
    </View>
  )
}
}
export default ForgotPassword
