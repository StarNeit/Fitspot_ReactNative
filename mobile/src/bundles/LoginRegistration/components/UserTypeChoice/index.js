/* @flow */

import React from 'react'
import {View, Image, Text, StatusBar, TouchableHighlight} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import GreenBackButton from '@components/GreenBackButton'
import styles from './styles'
import Button from 'react-native-button'


type Props = {
  setUserTypeCustomer: Function,
  setUserTypeTrainer: Function,
}

class UserTypeChoice  extends React.Component{

  constructor(props){
    super(props)
  }
  userTypeUser(){
    this.props.setUserTypeCustomer()
    Actions.home();
  }
  userTypeTrainer(){
    this.props.setUserTypeTrainer()
    Actions.trainerAboutYou();
  }
  render(){
    return (
      <View style={{flex:1}}>
        <Image source={require('../../assets/client-bg.jpg')} style={styles.clientContainer}>
          <Text style={styles.title}>I'm a Client</Text>
            <TouchableHighlight style={styles.clientButton} onPress={() => this.userTypeUser()}>
              <Text style={styles.buttonText}>Start Here</Text>
            </TouchableHighlight>
        </Image>
        <Image source={require('../../assets/trainer-bg.jpg')} style={styles.trainerContainer}>
          <Text style={styles.title}>I'm a Trainer</Text>
            <TouchableHighlight style={styles.trainerButton}  onPress={() => this.userTypeTrainer()}>
              <Text style={styles.buttonText}>Start Here</Text>
            </TouchableHighlight>
        </Image>
    </View>
  )
  }
}

export default UserTypeChoice
