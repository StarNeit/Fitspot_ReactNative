/* @flow */

import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'

type Props = {
  styles : Object,
  onPress: Function,
}

const ButtonSettings = (props: Props) => {
  const { onPress } = props
  const style = props.style || styles.backButton
  return (
    <TouchableHighlight onPress={() => onPress()} style={style}>
      <Image
        style={styles.backButtonImage}
        source={require('../../images/settings-icon.png')}
      />
    </TouchableHighlight>
  )
}

export default ButtonSettings
