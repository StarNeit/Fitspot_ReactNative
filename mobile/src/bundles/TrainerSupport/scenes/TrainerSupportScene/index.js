/* @flow */

import React, { Component } from 'react'
import TrainerSupportContainer from '@TrainerSupport/containers/TrainerSupportContainer'

type Props = {
  sessionId: String,
  name: String,
}


class TrainerSupportScene extends Component {

  props: Props


  render() {
    return (
      <TrainserSupportContainer { ...this.props}  />
    )
  }

}


export default TrainerSupportScene
