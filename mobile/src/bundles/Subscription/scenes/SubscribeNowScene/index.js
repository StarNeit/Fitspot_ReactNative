/* @flow */

import React from 'react'
import SubscribeNowContainer from '@Subscription/containers/SubscribeNowContainer'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

type Props = {
  loggedIn: Boolean,
}

class SubscribeNowScene extends React.Component{
  props: Props

  constructor(props){
    super(props)
  }
  render(){
    return (
      <SubscribeNowContainer />
    )
  }
}

export default SubscribeNowScene
