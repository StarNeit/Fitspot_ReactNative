import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrainerSupport from '@TrainerSupport/components/TrainerSupport'
import {Actions} from 'react-native-router-flux'
import { sendMessage, sendReadMessages } from '@store/modules/chat/actions'

type Props = {
  sessionId: String,
  name:String,
  messages: Array,
  sendMessage: Function,
  getOlderMessages: Function,
  userId: Integer,
  sendReadMessages:Function,
}


class TrainerSupportContainer extends Component {

  props: Props


  componentDidMount(){
    Actions.refresh({title: this.props.name})
    this.props.sendReadMessages();
  }

  render() {
    return (
      <TrainerSupport {...this.props}/>
    )
  }

}

const mapStateToProps = (state,ownProps) => {
  return {
    userId: state.auth.user.id,
    messages: state.chat.sessions[ownProps.sessionId]
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    sendMessage: (message) => {
      dispatch(sendMessage(message))
    },
    sendReadMessages: () => {
      dispatch(sendReadMessages(ownProps.sessionId))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TrainerSupportContainer)
