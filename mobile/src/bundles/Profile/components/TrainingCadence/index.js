import { RadioButtons } from 'react-native-radio-buttons'
import React from 'react'
import {Actions,TouchableWithoutFeedback} from 'react-native-router-flux'
import { View, ListView, StyleSheet, Text, ScrollView, Image, TextInput } from 'react-native';
import styles from './styles'

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

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

class TrainingCadence extends React.Component{

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
      return <View>{optionNodes}</View>;
    }

    render() {
      const options = [
        "I Never Work Out",
        "It's Been A While",
        "A Few Times A Week",
        "Almost Every Day"
      ];

      return (
        <View style={{marginTop: 75}}>
          <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:25}}>How Often Do You Work Out?</Text>
          <HorizontalLine lineStyle={{backgroundColor:'#F8F8F8'}} />
          <View style={{marginLeft:35}} >
          <RadioButtons
            options={ options }
            onSelection={ this.setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption }
            renderOption={ this.renderOption.bind(this) }
            renderContainer={ this.renderContainer.bind(this) }
          />
        </View>
        <Button buttonStyle={[styles.buttonStyle,{marginTop:25}]} buttonTextStyle={styles.buttonTextStyle} onPress={Actions.chooseLocation}>
          Save Fitness Level
        </Button>

        </View>
      );
    }
}

export default TrainingCadence
