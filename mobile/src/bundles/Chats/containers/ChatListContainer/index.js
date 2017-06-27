import React, { Component } from 'react'
import { TouchableOpacity ,Text, Image} from 'react-native'
import ChatList from '@Chat/components/ChatList'
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { getUserInfo } from '@store/modules/auth/actions'

type Props = {
  user: Object,
  isLoggedIn: boolean,
  refreshUser: Function,
  chatSessions: Array,
  chatMessages: Object,
}

class ChatListContainer extends Component {

  props: Props

  render() {
    return (
      <ChatList {...this.props} />
    )
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.chatMessages.length != this.props.chatMessages.length){
      this.setState({chatMessages: nextProps.chatMessages, chatSessions: nextProps.chatSessions})
    }
  }


}



const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoggedIn: (state.auth.loggedIn == null) ? false : state.auth.loggedIn,
    chatSessions: state.chat.sessionList,
    chatMessages: state.chat.sessions
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    refreshUser: () => {
      dispatch(refreshUser())
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ChatListContainer)
