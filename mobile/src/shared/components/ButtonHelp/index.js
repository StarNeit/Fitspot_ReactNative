/* @flow */

import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'

type Props = {
  style : Object,
  onPress : Function,
}

const ButtonHelp = (props: Props) => {
  const style = props.style || styles.backButton
  return (
    <TouchableHighlight style={style} onPress={props.onPress} underlayColor={'#00000000'}>
      <Image
        style={styles.backButtonImage}
        source={require('../../images/help-icon.png')}
      />
    </TouchableHighlight>
  )
}

export default ButtonHelp
