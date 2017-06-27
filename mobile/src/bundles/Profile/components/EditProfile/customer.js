import React from 'react'
import Platform from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {Actions} from 'react-native-router-flux'
import { View, ListView, StyleSheet, Text, ScrollView, Image, TextInput } from 'react-native';
import styles from './styles'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import {SegmentedControls } from 'react-native-radio-buttons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'


type Props = {
  user: Object,
  onUpdateClick: Function
}

const genderOptions = [
  "Male",
  "Female",
    "Any",
]

class EditCustomerProfile extends React.Component{

  constructor(props) {
      super(props);

      this.state = {
        user: props.user,
        avatarSource: props.user.avatar !== null ? props.user.avatar.url : '',
        selectedGenderType: props.user.customer !== null ? genderOptions[props.user.customer.preferredTrainerGender] : genderOptions[0],
      }

      if(this.state.user.customer == null){
        this.state.user.customer = {}
      }
  }

  updatePhoto(){

    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      quality: 1.0,
      maxWidth: 540,
      maxHeight: 175,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const user = this.state.user
        user.avatarSource = response.uri;
        this.setState(user: user)
      }
    });
  }

  setSelectedGender(selectedOption){
    const user = this.state.user
    var gender = 0
    if(selectedOption === 'Any'){
      gender = 2
    }else if(selectedOption === 'Female'){
      gender = 1
    }
    user.customer['preferredTrainerGender'] = gender;
    this.setState({user: user, selectedGenderType:selectedOption})
  }

  updateText(property,value){
    const user = this.state.user
    user.customer[property] = value;
    this.setState(user: user)
  }

  changeDate(date){
    const user = this.state.user

    user.customer['birthday'] = moment(date).utc().format('YYYY-MM-DD');
    this.setState(user: user)

  }


  renderInfoLine(headerTitle,information){
    return (
      <View style={{marginTop:15}}>
        <View style={{marginBottom: 15, marginLeft: 25}}>
          <Text style={{fontFamily: 'System' ,fontWeight:'bold',fontSize:8,color:'#4C4C4C',marginBottom: 1}}>{headerTitle}</Text>
          <Text style={{fontFamily: FONT_DAYTONA_LIGHT ,fontSize:14,color:'#4B4B4C'}}>{information}</Text>
        </View>
        <HorizontalLine fullWidth={true} />
      </View>
    )
  }
  renderStatLine(number,shortCode,title,property,value){
    return(
      <View>
        <TextInput style={{fontFamily:FONT_DAYTONA_REG,color:'#5D5D5F',fontSize:24, width: 50, height: 30,textAlign:'center'}} placeholder={number} value={value.toString()}
          onChangeText={(text) => this.updateText(property,text) }
          />
        <Text style={{fontFamily: 'System' ,fontWeight:'bold',fontSize:8,color:'#4C4C4C', alignSelf:'center'}}>{title}</Text>
      </View>
    )
  }
  render (){
    var trainerPadding = 6;
    const { user } = this.state;

    var age = user.customer.birthday == null ? '0' : String(moment().diff(moment(user.customer.birthday),'years'))

    return (
      <KeyboardAwareScrollView style={{marginBottom:55}} contentContainerStyle={{marginTop:63,marginBottom: 55}}>
        <View style={{marginBottom: 20}}>
          { this.state.avatarSource === null ? <Text style={{color:'#000'}}>Select a Photo</Text> :
            <Image style={styles.avatar} source={{uri: this.state.avatarSource}} />
          }
          <Image style={{alignSelf: 'center',marginTop:20}} source={require('../../assets/editProfileCircle.png')} />

        </View>
        <Button buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={() => this.updatePhoto()}>
          Change Profile Picture
        </Button>
        <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:25}}>More About You</Text>
        <View>
        <HorizontalLine />
        <TextInput style={styles.textInput} placeholder='Medical Issues'/>
        </View>
        <HorizontalLine />
          <View style={{flexDirection:'row',justifyContent: 'space-around',marginTop:15,marginBottom: 15}}>
            <View>
              <DatePicker
              mode="date"
              style={{backgroundColor:'rgba(0,0,0,0)',width:50,height:30,padding:0,}}
              placeholder={age}
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  height: 0,width:0,padding:0,
                },
                dateInput: {
                  flex:1,
                  // width: 40,
                  // height:30,
                  borderWidth: 0,
                  marginBottom:10,
                  marginLeft:6,
                  // alignItems: 'flex-end'
                },
                placeholderText: {fontFamily:FONT_DAYTONA_REG,color:'#5D5D5F',fontSize:24, width: 50, height: 30,textAlign:'center'},
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.changeDate(date)}}
            />
              <Text style={{fontFamily: 'System' ,fontWeight:'bold',fontSize:8,color:'#4C4C4C', alignSelf:'center'}}>Age (y)</Text>
            </View>

              {this.renderStatLine('6',"m","Height (feet)","height", user.customer.height == null ? 0 : user.customer.height)}
              {this.renderStatLine('110',"kg","Weight (lbs)","weight", user.customer.weight == null ? 0 : user.customer.weight)}
          </View>
        <HorizontalLine/>
          <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginTop:25,marginBottom:25}}>Do you prefer a trainer gender?</Text>
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
        {/*
        <Button buttonStyle={[styles.buttonStyle,{marginTop:25}]} buttonTextStyle={styles.buttonTextStyle} onPress={Actions.fitnessGoals}>
          Change Fitness Goals
        </Button>
        <Button buttonStyle={[styles.buttonStyle,{marginTop:25}]} buttonTextStyle={styles.buttonTextStyle} onPress={Actions.trainerStyles}>
          Change Trainer Preferences
        </Button>
        {/*
        <Button buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={Actions.trainingCadence}>
          Change Fitness Level
        </Button>*/}
        <Text style={{marginTop:24,marginBottom:24,alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,}}>Basic Information</Text>
        <HorizontalLine />
        <View>
        <TextInput style={styles.textInput} placeholder='Your Email' value={user.email}/>
        </View>
        <HorizontalLine />
        <View style={styles.nameEntryContainer}>
          <View>
            <Text style={styles.nameInputTitle}>FIRST NAME</Text>
            <TextInput style={styles.nameInput} placeholder='Johnny' placeholderTextColor='#3e3f3e' value={user.firstName}/>
          </View>
          <View>
            <Text style={styles.nameInputTitle}>LAST NAME</Text>
            <TextInput style={styles.nameInput} placeholder='Appleseed' placeholderTextColor='#3e3f3e' value={user.lastName}/>
          </View>
        </View>
        <HorizontalLine />
        <View style={{marginLeft: 32,marginTop:12}}>
          <Text style={styles.nameInputTitle}>PHONE NUMBER</Text>
          <TextInput style={styles.nameInput} placeholder='4045481331' placeholderTextColor='#3e3f3e' value={user.phoneNumber}/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

export default EditCustomerProfile
