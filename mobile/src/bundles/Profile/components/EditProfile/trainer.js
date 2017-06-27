import React from 'react'
import Platform from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {Actions} from 'react-native-router-flux'
import { View, ListView, StyleSheet, Text, ScrollView, Image, TextInput,TouchableOpacity,Switch, Alert} from 'react-native';
import styles from './styles'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import DatePicker from 'react-native-datepicker'
import AwesomeButton from '@components/AwesomeButton';

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'


type Props = {
  user: Object,
  allActivities: Array,
  editingStatus: String,
  deletingStatus: String,
  deleteAttachment: Function,
}

class EditTrainerProfile extends React.Component{

  constructor(props) {
      super(props);
      var activityArray = Array.from({ length: this.props.allActivities.length }, () => false)
      var i = 0;
      for (let activity of this.props.allActivities) {
        var result = props.user.trainer.activities.filter(function(item,index){
          return item.id === activity.id
        })
        if(result.length > 0){
          activityArray[i] = true
        }
        i++;
      }
      this.state = {
        user: props.user,
        btnLicenseState: props.user.trainer.driverLic !== null ? 'success' : 'idle',
        btnInsuranceState: props.user.trainer.insurance !== null ? 'success' : 'idle',
        btnCertificationState: props.user.trainer.certification !== null ? 'success' : 'idle',
        avatarSource: props.user.avatar !== null ? props.user.avatar.url : '',
        showInformation: true,
        activities: activityArray,
        deletingAttachment: '',
      }

      var activity_ids = []
      for(var i = 0; i < this.state.activities.length; i++){
        if(this.state.activities[i]){
          activity_ids.push({ id: this.props.allActivities[i].id})
        }
      }
      this.state.user.trainer.activities = activity_ids



      if(this.state.user.trainer == null){
        this.state.user.trainer = {}
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
      console.log('Response = ', response);

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

  updateText(property,value){
    const user = this.state.user
    user.trainer[property] = value;
    this.setState(user: user)
  }

  updateUserText(property,value){
    const user = this.state.user
    user[property] = value;
    this.setState(user: user)
  }

  onLocationEnter(){
    var address = this.state.locationStreet + ' ' + this.state.locationCity + ' ' + this.state.locationState + ' ' + this.state.locationZip
    Geocoder.geocodeAddress(address).then(res => {
        // res is an Array of geocoding object (see below)

        if(res[0] == null){
          //TODO handle no location found
          return;
        }else{
          var mapLatitude = res[0].position.lat,
          mapLongitude = res[0].position.lng,
          mapLatitudeDelta =  0.0090,
          mapLongitudeDelta = 0.0090
          this.setState({mapLongitude : mapLongitude,mapLatitude : mapLatitude,
            mapLongitudeDelta : mapLongitudeDelta, mapLatitudeDelta: mapLatitudeDelta, addressLookupResult : true})
        }


    })
    .catch(err => console.log(err))
  }

  deleteFile(id,type){
    Actions.mainAppModal(
      {
        uniqId: new Date().getTime() + Math.random(5),
        visible: true,
        headerText: 'Delete File',
        detailsText:'Are you sure you want to remove this file?',
        showSubDetails: false,
        onOkay:() => this.deleteConfirmation(type),
        okayButtonText: 'OK',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        onCancel: null,
      }
    )
  }
  deleteConfirmation(type){
    var user = this.state.user
    if(type === 'certification'){
      user.trainer.certificationId = null
    }else if(type === 'insurance'){
      user.trainer.insuranceId = null
    }else{
      user.trainer.driverLicId = null
    }
    this.setState({user: user})
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

  renderInformation(){
    var trainerPadding = 6;
    const { user } = this.state;
    return (
      <KeyboardAwareScrollView>
        <View style={{marginBottom: 20}}>
          { this.state.avatarSource === null ? <Text style={{color:'#000'}}>Select a Photo</Text> :
            <Image style={styles.avatar} source={{uri: this.state.avatarSource}} />
          }
          <Image style={{alignSelf: 'center',marginTop:20}} source={require('../../assets/editProfileCircle.png')} />
        </View>
        <Button buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={() => this.updatePhoto()}>
          Change Profile Picture
        </Button>
        <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:25}}>Your Bio</Text>
        <View>
        <HorizontalLine />
        <TextInput style={[styles.textInput, {height: 120}]} multiline={true} onChangeText={(text) => this.updateText("bio",text)} placeholder='Your short bio' value={user.trainer.bio}/>
        <HorizontalLine/>
        </View>
        <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:25, marginTop:25}}>More Information</Text>
          <HorizontalLine/>
            <View style={styles.locationEntryView}>
              <View style={styles.locationInputContainer}>
                <TextInput style={styles.locationTextInput} placeholder='Street' returnKeyType='search' placeholderTextColor='#c0c0c0'  onChangeText={(text) => this.updateText("address",text)} value={user.trainer.address}/>
                <View style={{flexDirection:'row',marginTop:6}}>
                  <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
                  fontSize: 12,
                  backgroundColor:'rgba(0,0,0,0)',height:45}} placeholder='City' returnKeyType='search' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.updateText("city",text)} value={user.trainer.city}/>
                </View>
                <View style={{flexDirection:'row',marginTop:6}}>
                <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
                fontSize: 12,
                backgroundColor:'rgba(0,0,0,0)',height:45}} placeholder='State' returnKeyType='search' placeholderTextColor='#c0c0c0'  onChangeText={(text) => this.updateText("state",text)} value={user.trainer.state}/>
                <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
                fontSize: 12,
                backgroundColor:'rgba(0,0,0,0)',height:45}} placeholder='Zip' returnKeyType='search' placeholderTextColor='#c0c0c0'  onEndEditing={() => this.onLocationEnter()} onChangeText={(text) => this.setState({locationZip: text})} value={user.trainer.zipcode}/>
                </View>
              </View>
            </View>
          <Text style={{color:'#AEAEAE',marginBottom:16,marginLeft: 32,marginTop:32,fontSize:12,fontFamily: 'System',fontWeight: 'bold',}}>Driver's License</Text>
          <View style={styles.nameEntryContainer}>
            <View>
              <TextInput style={styles.nameInput} placeholder='State' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.updateText("driverLicState",text)} value={user.trainer.driverLicState}/>
            </View>
            <View>
              <DatePicker date={moment(user.trainer.driverLicExpiry).format('MM-DD-YYYY')} mode="date" placeholder="select date" format="MM-DD-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateIcon: {height: 0},dateInput: {borderWidth: 0,alignItems: 'flex-end'}}}
              onDateChange={(date) => {this.updateText("driverLicExpiry",date)}}
            />
            </View>
          </View>
          <HorizontalLine/>
            <View style={{marginLeft: 32,marginRight:32,marginTop:24,marginBottom:15, flexDirection:'row',justifyContent:'center'}}>
                <AwesomeButton  backgroundStyle={styles.registerButton}
                        labelStyle={styles.registerButtonText}
                        transitionDuration={200}
                        states={{
                          idle: {
                            text: "Upload Driver's License",
                            onPress: () => this.uploadLicense(),
                            backgroundColor: '#ffffff',
                            textColor: '#5fb13d',
                          },
                          busy: {
                            text: 'Uploading',
                            backgroundColor: '#5fb13d',
                            spinner: true,
                            textColor: '#ffffff'
                          },
                          success: {
                            text: 'License Uploaded',
                            backgroundColor: '#ffffff',
                            textColor: '#5fb13d',
                          },
                          error: {
                            text: 'Error Uploading',
                            backgroundColor: '#ff0000',
                            textColor: '#ffffff'
                          }
                        }}
                        buttonState={this.state.btnLicenseState}
                        />
                      { this.state.btnLicenseState == 'success' ?
                        <Button buttonStyle={styles.deleteButton} buttonTextStyle={styles.deleteButtonText} onPress={()=> this.deleteFile(user.trainer.driverLic.id,'license')}>X</Button>
                    : null }
            </View>
            <View style={{marginRight:32, marginLeft: 32,marginBottom:15,flexDirection:'row'}}>
                <AwesomeButton  backgroundStyle={styles.registerButton}
                        labelStyle={styles.registerButtonText}
                        transitionDuration={200}
                        states={{
                          idle: {
                            text: "Upload Insurance",
                            onPress: ()=> this.uploadInsurance(),
                            backgroundColor: '#ffffff',
                            textColor:'#5fb13d'
                          },
                          busy: {
                            text: 'Uploading',
                            backgroundColor: '#5fb13d',
                            spinner: true,
                            textColor: '#ffffff'
                          },
                          success: {
                            text: 'Insurance Uploaded',
                            backgroundColor: '#ffffff',
                            textColor: '#5fb13d',
                          },
                          error: {
                            text: 'Error Uploading',
                            backgroundColor: '#ff0000',
                            textColor: '#ffffff'
                          }
                        }}
                        buttonState={this.state.btnInsuranceState}
                        />
                        { this.state.btnInsuranceState == 'success' ?
                          <Button buttonStyle={styles.deleteButton} buttonTextStyle={styles.deleteButtonText} onPress={()=>  this.deleteFile(user.trainer.insurance.id,'insurance')}>X</Button>
                      : null }
            </View>
            <View style={{marginRight:32, marginLeft: 32, marginBottom: 24,flexDirection:'row'}}>
              <AwesomeButton  backgroundStyle={styles.registerButton}
                      labelStyle={styles.registerButtonText}
                      transitionDuration={200}
                      states={{
                        idle: {
                          text: "Upload Certification",
                          onPress: () => this.uploadCertification(),
                          backgroundColor: '#ffffff',
                          textColor:'#5fb13d'
                        },
                        busy: {
                          text: 'Uploading',
                          backgroundColor: '#5fb13d',
                          spinner: true,
                          textColor: '#ffffff'
                        },
                        success: {
                          text: 'Certification Uploaded',
                          backgroundColor: '#ffffff',
                          textColor: '#5fb13d',
                        },
                        error: {
                          text: 'Error Uploading',
                          backgroundColor: '#ff0000',
                          textColor: '#ffffff'
                        }
                      }}
                      buttonState={this.state.btnCertificationState}
                      />
                      { this.state.btnCertificationState == 'success' ?
                         <Button buttonStyle={styles.deleteButton} buttonTextStyle={styles.deleteButtonText} onPress={()=>  this.deleteFile(user.trainer.certification.id,'certification')}>X</Button>
                    : null }
            </View>
            <Text style={{marginTop:24,marginBottom:24,alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,}}>Basic Information</Text>
            <HorizontalLine />
            <View>
            <TextInput style={styles.textInput} placeholder='Your Email' value={user.email} onChangeText={(text) => this.updateUserText("email",text)}/>
            </View>
            <HorizontalLine />
            <View style={styles.nameEntryContainer}>
              <View>
                <Text style={styles.nameInputTitle}>FIRST NAME</Text>
                <TextInput style={styles.nameInput} placeholder='Johnny' placeholderTextColor='#3e3f3e' value={user.firstName} onChangeText={(text) => this.updateUserText("firstName",text)}/>
              </View>
              <View>
                <Text style={styles.nameInputTitle}>LAST NAME</Text>
                <TextInput style={styles.nameInput} placeholder='Appleseed' placeholderTextColor='#3e3f3e' value={user.lastName} onChangeText={(text) => this.updateUserText("lastName",text)}/>
              </View>
            </View>
            <HorizontalLine />
            <View style={{marginLeft: 35,marginTop:12}}>
              <Text style={styles.nameInputTitle}>PHONE NUMBER</Text>
              <TextInput style={styles.nameInput} placeholder='4045481331' placeholderTextColor='#3e3f3e' value={user.phoneNumber} onChangeText={(text) => this.updateUserText("phoneNumber",text)}/>
            </View>
            <HorizontalLine />
            <Button buttonStyle={[styles.facebookButtonStyle,{marginTop:25}]} buttonTextStyle={styles.facebookButtonTextStyle} onPress={()=> alert('Need to Implement')}>
              Connect Facebook
            </Button>
            <Button buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={() => Actions.changePassword()}>
              Change Password
            </Button>
            </KeyboardAwareScrollView>
    )
  }

  doesTrainerHaveActivitySet(id){
    var result = this.state.user.trainer.activities.filter(function(item,index){
      return item.id === id
    })
    return result.length > 0
  }

  setSelected(index,value){
    var state = this.state;
    state.activities[index] = value

    var activity_ids = []
    for(var i = 0; i < this.state.activities.length; i++){
      if(this.state.activities[i]){
        activity_ids.push({ id: this.props.allActivities[i].id})
      }
    }

    state.user.trainer.activities = activity_ids

    this.setState(state)
  }

  renderActivities(){
    var me = this
    var switchList = this.props.allActivities.map(function(item,index){
      var name = item.name
      return (
        <View key={item.name} style={{marginLeft:32,marginRight:32,marginTop:6,marginBottom:6,flexDirection:'row', justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#fafafa'}}>
        <Text style={{textAlign:'left',alignSelf:'center',marginTop:6,marginBottom:6,fontFamily:'System'}}>{name}</Text>
        <Switch onValueChange={(value) => me.setSelected(index,value)} value={me.state.activities[index]}  style={{marginBottom:12}}/>
        </View>
      )
    })

    return(
      <View >
        { switchList }
        </View>
    )
  }

  renderTraining(){
    return(
      <View>
        { this.renderActivities() }
        </View>
    )
  }
  toggleInformation(status){
    this.setState({showInformation: status})
  }

  render(){

    return(
      <View style={{marginTop:63,marginBottom: 55}}>
        <View style={{flexDirection:'row',}}>
          <Button buttonStyle={[styles.topButtonStyle,{borderBottomWidth:1,borderBottomColor:this.state.showInformation ? DEFAULT_GREEN_COLOR : '#F2F2F2'}]} buttonTextStyle={[styles.topButtonTextStyle,{color:this.state.showInformation ? DEFAULT_GREEN_COLOR : '#E8E8E8'}]} onPress={() => this.toggleInformation(true)}>
            Information
          </Button>
          <Button buttonStyle={[styles.topButtonStyle,{borderBottomWidth:1,borderBottomColor:!this.state.showInformation ? DEFAULT_GREEN_COLOR : '#F2F2F2'}]} buttonTextStyle={[styles.topButtonTextStyle,{color:!this.state.showInformation ? DEFAULT_GREEN_COLOR : '#E8E8E8'}]} onPress={() => this.toggleInformation(false)}>
            Training
          </Button>
        </View>
        { this.state.showInformation ?
          this.renderInformation()
        :
          this.renderTraining()
        }
      </View>
      )
  }
}

export default EditTrainerProfile
