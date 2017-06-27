/* @flow */

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

type Props = {
  children?: string,
  onPress: Function,
  style: Object
}

const Link = (props: Props) => {
  const { onPress } = props
  const children = props.children || ''
  const style = props.style || styles.main
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Link
