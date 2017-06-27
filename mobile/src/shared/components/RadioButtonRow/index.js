/* @flow */

import React from 'react'
import { TouchableOpacity, Text ,TouchableWithoutFeedback,View, Image} from 'react-native'
import HorizontalLine from '@components/HorizontalLine'
import styles from './styles'

type Props = {
  children?: string,
  onSelect: Function,
  index: number,
  option: string,
  selected: bool
}

const RadioButtonRow = (props: Props) => {
  
  const { onSelect,index, option, selected } = props
  const children = props.children || ''
  var icon = selected ? require('@images/radioButtonSelected.png') : require('@images/radioButtonUnselected.png');

  return (
    <View>
      <TouchableWithoutFeedback key={index} style={{width:200,height:100, backgroundColor:'green'}} onPress={onSelect} key={index}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Image source={icon} />
          <Text style={{marginLeft: 10,marginTop:15,marginBottom:15,fontFamily:'System',fontSize: 12}}>{option}</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.separator} />
    </View>
  )
}

export default RadioButtonRow
