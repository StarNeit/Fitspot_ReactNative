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
  user: Object,
  onUpdateClick: Function,
}
const options = [
"Option 1",
"Option 2"
];

class TrainerStyles extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        selectedOption: 0,
        selectedGenderType: 'Any',
      };
    }

    setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    }

    setSelectedGender(selectedOption){
      this.setState({
        selectedGenderType:selectedOption
      });
    }

    renderOption(option, selected, onSelect, index){
      return <RadioButtonRow selected={selected} key={index} option={option} selected={selected} onSelect={onSelect} index={index} />;
    }

    renderContainer(optionNodes){
      return <View style={{marginBottom: 25}}>{optionNodes}</View>;
    }
    updateCustomer(){
      var user = this.props.user
      if(this.state.selectedGenderType === 'Any'){
        user.customer.preferredTrainerGender = 2
      }else if(this.state.selectedGenderType === 'Female'){
        user.customer.preferredTrainerGender = 1
      }else{
        user.customer.preferredTrainerGender = 0
      }
      this.props.onUpdateClick(user)
    }

    render() {
      const trainerOptions = [
        "A Drill Sergeant",
        "Supportive & Nurturing",
        "A Teach or Educator",
        "Other"
      ];
      const genderOptions = [
        "Any",
        "Male",
        "Female"
      ]

      return (
        <View style={{marginTop: 75}}>
          <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:35}}>Which trainer styles do you prefer?</Text>
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
        <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:25}}>Do you prefer a trainer gender?</Text>
        <View style={{marginLeft:25,marginRight: 25}}>
          <SegmentedControls
            tint={DEFAULT_GREEN_COLOR}
            selectedTint= {'white'}
            options={ genderOptions }
            allowFontScaling={ false } // default: true
            onSelection={ this.setSelectedGender.bind(this) }
            selectedOption={ this.state.selectedGenderType }
            optionStyles={{fontFamily: 'System',fontWeight: 'bold'}}
            optionContainerStyle={{flex: 1}}
          />
        </View>

        <Button buttonStyle={[styles.buttonStyle,{marginTop:45}]} buttonTextStyle={styles.buttonTextStyle} onPress={() => this.updateCustomer()}>
          Save Trainer Preference
        </Button>

        </View>
      );
    }
}

export default TrainerStyles
