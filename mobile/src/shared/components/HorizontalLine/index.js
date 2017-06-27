/* @flow */

import React from 'react'
import { View } from 'react-native'
import styles from './styles'

type Props = {
  children?: string,
  onPress: Function,
  fullWidth: bool,
  lineStyle: Object,
}

const HorizontalLine = (props: Props) => {
  const { fullWidth, lineStyle } = props
  return (
    <View style={[styles.separator,fullWidth ? styles.fullWidth : {},lineStyle]} />
  )
}

export default HorizontalLine
