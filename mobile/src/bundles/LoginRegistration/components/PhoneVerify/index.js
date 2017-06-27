import React from 'react'
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableHighlight,
  TextInput
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import GreenBackButton from '@components/GreenBackButton'
import styles from './styles'
import Button from '@components/Button'
import HorizontalLine from '@components/HorizontalLine'


type Props = {
  verifyCurrentUser: Function
}


class PhoneVerify extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      number: '',
    }
  }

    render(){
      return (
        <View style={styles.container}>
          <GreenBackButton/>
          <Text style={styles.headerText}>Verify Phone Number</Text>
          <Text style={styles.okText}>You should be getting a security code via SMS. Please enter it here. This helps us prevent fake accounts.</Text>
          <HorizontalLine/>
          <TextInput style={styles.textInput} placeholder='SMS Code (ex: 359 843)' keyboardType='numeric' placeholderTextColor='#3e3f3e' value={this.state.number} onChangeText={(text) => this.setState({number: text})}/>
          <HorizontalLine/>
          <Button onPress={() => this.props.verifyCurrentUser(this.state.number)} buttonStyle={styles.registerButton} buttonTextStyle={styles.registerButtonText}>Verify Number</Button>
        </View>
      )
    }

}

export default PhoneVerify
