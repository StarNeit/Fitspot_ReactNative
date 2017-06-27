/* @flow */

import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import styles from './styles'

import {DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'

type Props = {
  numberOfSteps: number,
  currentNumber: number,
  style: Object,
}

class NavigationSteps extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { numberOfSteps, currentNumber,style } = this.props


    var widthOfScreen = Dimensions.get('window').width;

    //calculate the amount of padding we'll need for all of the steps,
    //we need at LEAST 1 px on each side. (with 6 on the left and right)
    var amountOfMarginNeeded = (numberOfSteps * 2) + 12 ;

    //see how much room is left to create the actual lines for the steps
    var amountOfSpaceLeft = widthOfScreen - amountOfMarginNeeded;

    //calculate the actual size of the lines
    var lineWidth = (amountOfSpaceLeft / numberOfSteps);
    var Arr = [];

    for (var index = 0; index < numberOfSteps; index++) {
      var color = index <= (currentNumber-1) ? DEFAULT_GREEN_COLOR : DEFAULT_GREY_COLOR;
      Arr.push(<View key={index} style={{ marginLeft: 1, marginRight: 1, width: lineWidth, height: 2, backgroundColor:color}}></View>);
    }

    return (
      <View style={[styles.stepsContainer,style]}>
        { Arr }
      </View>
    )
  }
}

export default NavigationSteps
