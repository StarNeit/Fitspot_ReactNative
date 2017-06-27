import React, {Component} from 'react'
import {View, Image, Text, StatusBar, TouchableHighlight,ListView} from 'react-native'


type Props = {
  sessionId: String,
  messages: Array,
  userId: Integer,
}

class TrainerSupport extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  componentDidMount(){
    console.log('mounted')
  }

  componentWillUnmount(){
    console.log('unmounted')
  }




  render() {
    return (
      <View style={{flex:1,marginBottom: 50,marginTop:65,backgroundColor:'green'}}>

      </View>
    );
  }
}
export default TrainerSupport
