/* @flow */

import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import styles from './styles'

type Props = {
  children?: string,
  onPress: Function,
  buttonStyle: Object,
  buttonTextStyle: Object
}

const Button = (props: Props) => {
  const { onPress } = props
  const children = props.children || ''
  const style = props.buttonStyle || styles.buttonStyle
  const textStyle = props.buttonTextStyle || styles.buttonTextStyle

  return (
    <TouchableHighlight style={style} onPress={() => onPress()}  underlayColor={'#00000000'}>
      <Text style={textStyle}>{children}</Text>
    </TouchableHighlight>
  )
}

export default Button
