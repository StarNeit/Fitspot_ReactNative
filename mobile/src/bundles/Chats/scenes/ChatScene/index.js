/* @flow */

import React, { Component } from 'react'
import ChatContainer from '@Chat/containers/ChatContainer'

type Props = {
  sessionId: String,
  name: String,
}


class ChatScene extends Component {

  props: Props


  render() {
    return (
      <ChatContainer { ...this.props}  />
    )
  }

}


export default ChatScene
