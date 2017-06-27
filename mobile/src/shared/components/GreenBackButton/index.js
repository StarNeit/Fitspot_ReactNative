/* @flow */

import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'

type Props = {
  styles : Object,
  onPress : Function,
}

const GreenBackButton = (props: Props) => {
  const style = props.style || styles.backButton
  // const action =  props.onPress || Actions.pop();
  // you cannot assign a function in the declaration, it will fire off.

  return (
    <TouchableHighlight onPress={() => props.onPress == null ? Actions.pop() : props.onPress} style={style}>
      <Image
        style={styles.backButtonImage}
        source={require('../../images/Back.png')}
      />
    </TouchableHighlight>
  )
}

export default GreenBackButton
