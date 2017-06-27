/* @flow */

import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'

type Props = {
  style : Object,
  onPress : Function,
}

const ButtonGift = (props: Props) => {
  const style = props.style || styles.giftButton
  return (
    <TouchableHighlight style={style} onPress={props.onPress} underlayColor={'#00000000'}>
      <Image
        style={styles.giftButtonImage}
        source={require('../../images/gift-icon-green.png')}
      />
    </TouchableHighlight>
  )
}

export default ButtonGift
