import React, {Component} from 'react'
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Image, Text, StatusBar, TouchableHighlight,ListView} from 'react-native'


type Props = {
  sessionId: String,
  messages: Array,
  userId: Integer,
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  compon

  onSend(messages = []) {
    this.props.sendMessage({sessionId:this.props.sessionId, message: messages[0].text})
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  }
  render() {
    return (
      <View style={{flex:1,marginBottom: 50,marginTop:65}}>
        <GiftedChat messages={this.state.messages} onSend={this.onSend.bind(this)} user={{_id: this.props.userId}} />
      </View>
    );
  }
}

export default Chat
