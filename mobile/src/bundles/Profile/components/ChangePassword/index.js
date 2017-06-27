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

class ChangePassword extends React.Component{

  Props:props

  constructor(props){
    super(props)
    this.state = {
      oldPassword : '',
      newPassword : '',
      newPasswordConfirm : '',
    }
  }

  sendPasswordReset(email){

    if(this.state.newPassword !== this.state.newPasswordConfirm){
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Passwords do not match',
        detailsText: "New Password and Confirmation Password do not match.",
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )

      return;
    }
    if(this.state.newPassword.length < 5){
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Passwords not long enough',
        detailsText: "Passwords must be longer than 5 characters.",
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      return
    }

    ApiUtils.patch('auth/reset-password',{oldPassword: this.state.oldPassword, newPassword : this.state.newPassword}).then(([response, jsonBody]) => {
      // do stuff with both.
      if (response.status == 200) {

        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Password Changed.',
          detailsText: 'Your password has been changed..',
          showSubDetails: false,
          onOkay: () => Actions.popTo('editProfileScene'),
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
      } else {
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Reset password error',
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
        <View style={styles.clientContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.description}>Enter your old pasword and desired new password to change it.</Text>

          <View style={styles.textInputContainer}>
            <HorizontalLine fullWidth/>

            <TextInput style={styles.textInput} placeholder= 'Your Current Password' placeholderTextColor='#3e3f3e'
              secureTextEntry={true} onChangeText={(text) => this.setState({oldPassword: text})} value={this.state.oldPassword}
              />
          </View>
          <View style={styles.textInputContainer}>
            <HorizontalLine fullWidth/>
            <TextInput style={styles.textInput} placeholder= 'Desired New Password' placeholderTextColor='#3e3f3e'
              secureTextEntry={true} onChangeText={(text) => this.setState({newPassword: text})} value={this.state.newPassword}
              />
          </View>
          <View style={styles.textInputContainer}>
            <HorizontalLine fullWidth/>
            <TextInput style={styles.textInput} placeholder= 'Confirm New Password' placeholderTextColor='#3e3f3e'
              secureTextEntry={true} onChangeText={(text) => this.setState({newPasswordConfirm: text})} value={this.state.newPasswordConfirm}
              />
          </View>
          <Button onPress={() => this.sendPasswordReset()} buttonStyle={styles.clientButton} buttonTextStyle={styles.buttonText}>Reset Password</Button>
        </View>
    </View>
  )
}
}
export default ChangePassword
