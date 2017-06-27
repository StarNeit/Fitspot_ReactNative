import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import React from 'react'
import {Actions,TouchableWithoutFeedback} from 'react-native-router-flux'
import { View, ListView, StyleSheet, Text, ScrollView, Image, TextInput } from 'react-native';
import styles from './styles'

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'
import RadioButtonRow from '@components/RadioButtonRow'


type Props = {
}
const options = [
"Option 1",
"Option 2"
];

class FitnessGoals extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        selectedOption: 0
      };
    }

    setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    }

    renderOption(option, selected, onSelect, index){
      return <RadioButtonRow selected={selected} key={index} option={option} selected={selected} onSelect={onSelect} index={index} />;
    }

    renderContainer(optionNodes){
      return <View style={{marginBottom: 25}}>{optionNodes}</View>;
    }

    render() {
      const trainerOptions = [
        "Lose Weight",
        "Get Stronger",
        "Get Healthier & Feel Better",
        "Prepare for an Event",
        "Recover & Rehab",
      ];

      return (
        <View style={{marginTop: 75}}>
          <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:35}}>What Do You Want To Achieve?</Text>
          <HorizontalLine lineStyle={{backgroundColor:'#F8F8F8'}} />
          <View style={{marginLeft:35}} >
          <RadioButtons
            options={ trainerOptions }
            onSelection={ this.setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption }
            renderOption={ this.renderOption.bind(this) }
            renderContainer={ this.renderContainer.bind(this) }
          />
        </View>
        <Button buttonStyle={[styles.buttonStyle,{marginTop:45}]} buttonTextStyle={styles.buttonTextStyle} onPress={Actions.chooseLocation}>
          Save Fitness Goals
        </Button>
        </View>
      );
    }
}

export default FitnessGoals
