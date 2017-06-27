/* @flow */

import React from 'react'
import {View, SegmentedControlIOS} from 'react-native'
import styles from './styles'

type Props = {
  selectedIndex: int,
  color?: string,
  vals : Object,
  onChange: Function
}

const SegmentedControl = (props : Props) => {
  const color = props.color || ''

  return (
    <View style={{marginBottom: 10}}>
          <SegmentedControlIOS values={ props.vals } tintColor={color} selectedIndex={props.selectedIndex}
            onChange={props.onChange}/>
        </View>
  )
}

export default SegmentedControl
