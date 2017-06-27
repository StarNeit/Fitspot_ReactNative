/* @flow */
import React from 'react'
import {View, Text, TextInput, ScrollView, Platform} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import Link from '@components/Link'
import Button from '@components/Button'
import GreenBackButton from '@components/GreenBackButton'
import HorizontalLine from '@components/HorizontalLine'
import SegmentedControl from '@components/SegmentedControl'
import NavigationSteps from '@components/NavigationSteps'
import DatePicker from 'react-native-datepicker'
import styles from './styles'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import ImagePicker from 'react-native-image-picker'
import AwesomeButton from '@components/AwesomeButton';

import ApiUtils from '@utils/ApiUtils'

type Props = {
  onNextStepPress: Function
}

class TrainerAboutYou extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      btnLicenseState: 'idle',
      btnInsuranceState: 'idle',
      btnCertificationState: 'idle',
      driverLicId: 0,
      insuranceId: 0,
      certificationId: 0,
      driverLicState: 'NA',
      driverLicExpiry: moment().format('MM-DD-YYYY'),
      bio: '',
    }

  }

  nextStepsPress(){
    if(this.state.btnLicenseState !== 'success'
      || this.state.btnInsuranceState !== 'success'
    || this.state.btnCertificationState !== 'success'){
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Upload Error',
        detailsText: 'Please upload all documents.',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      return
    }
    var trainer = {
      driverLicId: this.state.driverLicId,
      insuranceId: this.state.insuranceId,
      certificationId: this.state.certificationId,
      driverLicState: this.state.driverLicState,
      driverLicExpiry: this.state.driverLicExpiry,
      bio: this.state.bio,
    }

    this.props.onNextStepPress(trainer)
    Actions.trainerInformation()
  }

  createUser(){
    var user = Object.assign({}, this.state)
    this.props.onCreateClick(user)
    // Actions.phoneVerify()
  }

  uploadLicense(){
    this.uploadDocument("license");
  }
  uploadInsurance(){
    this.uploadDocument("insurance");
  }
  uploadCertification(){
    this.uploadDocument("certification");
  }


  uploadDocument(btnType){

    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      quality: 1.0,
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
        let source;

        source = { uri: 'data:image/jpeg;base64,' + response.data };
        // Or a reference to the platform specific asset location
        if (Platform.OS === 'android') {
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri };
        }


        if(btnType === 'license'){
          this.setState({btnLicenseState: 'busy'})
        }else if(btnType === 'insurance'){
          this.setState({btnInsuranceState: 'busy'})
        }else{
          this.setState({btnCertificationState: 'busy'})
        }

        ApiUtils.postFile('files/upload', null,source).then(([response, jsonBody]) => {
          if (response.status == 200) {
            if(btnType === 'license'){
              this.setState({btnLicenseState: 'success', driverLicId: jsonBody.id})
            }else if(btnType === 'insurance'){
              this.setState({btnInsuranceState: 'success', insuranceId: jsonBody.id})
            }else{
              this.setState({btnCertificationState: 'success', certificationId: jsonBody.id})
            }
          } else {
            // dispatch(createAccountFailure(jsonBody.message))
            if(btnType === 'license'){
              this.setState({btnLicenseState: 'error'})
            }else if(btnType === 'insurance'){
              this.setState({btnInsuranceState: 'error'})
            }else{
              this.setState({btnCertificationState: 'error'})
            }
          }

        }).catch(err => {
          console.log('Error: ', err);
          if(btnType === 'license'){
            this.setState({btnLicenseState: 'error'})
          }else if(btnType === 'insurance'){
            this.setState({btnInsuranceState: 'error'})
          }else{
            this.setState({btnCertificationState: 'error'})
          }
        })


      }
    });
  }


  render(){
    return (
      <View style={styles.clientContainer}>
        <Text style={styles.headerText}>Create Your Account</Text>
        <NavigationSteps style={{marginTop:25}} currentNumber={2} numberOfSteps={3}  />
        <KeyboardAwareScrollView contentContainerStyle={{marginBottom:55}}>
            <Text style={[styles.headerText,{marginBottom: 30}]}>More Information</Text>
            <HorizontalLine/>
            <View style={styles.textInputContainer}>
              <TextInput style={styles.textInput} placeholder='Your City' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({email: text})}/>
            </View>
            <HorizontalLine/>
            <Text style={{color:'#AEAEAE',marginBottom:16,marginLeft: 32,marginTop:32,fontSize:12,fontFamily: 'System',fontWeight: 'bold',}}>Driver's License</Text>
            <View style={styles.nameEntryContainer}>
              <View>
                <TextInput style={styles.nameInput} placeholder='State' placeholderTextColor='#c0c0c0'onChangeText={(text) => this.setState({driverLicState: text})}/>
              </View>
              <View>
                <DatePicker
                date={this.state.driverLicExpiry}
                mode="date"
                placeholder="select date"
                format="MM-DD-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    height: 0
                  },
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-end'
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({driverLicExpiry: date})}}
              />
              </View>
            </View>
            <HorizontalLine/>
              <View style={{width: 270, height: 50, marginLeft: 32, flexDirection:'row'}}>

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
                              text: 'Uploaded',
                              backgroundColor: '#ffffff',
                              textColor: '#5fb13d',
                            },
                            error: {
                              text: 'Error Uploading',
                              backgroundColor: '#ff0000',
                              onPress: () => this.uploadLicense(),
                              textColor: '#ffffff'
                            }
                          }}
                          buttonState={this.state.btnLicenseState}
                          />
                        { this.state.btnLicenseState == 'success' ?   <Button buttonStyle={styles.deleteButton} buttonTextStyle={styles.deleteButtonText} onPress={()=> this.uploadInsurance()}>X</Button>
                      : null }
              </View>
              <View style={{width: 270, height: 50, marginLeft: 32, marginTop:30,flexDirection:'row'}}>
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
                              text: 'Uploaded',
                              backgroundColor: '#ffffff',
                              textColor: '#5fb13d',
                            },
                            error: {
                              text: 'Error Uploading',
                              backgroundColor: '#ff0000',
                              onPress: ()=> this.uploadInsurance(),
                              textColor: '#ffffff'
                            }
                          }}
                          buttonState={this.state.btnInsuranceState}
                          />
                          { this.state.btnInsuranceState == 'success' ?   <Button buttonStyle={styles.deleteButton} buttonTextStyle={styles.deleteButtonText} onPress={()=> this.uploadInsurance()}>X</Button>
                        : null }
              </View>
              <View style={{flex:1, height: 50, marginLeft: 32, marginTop: 30, marginBottom: 50,flexDirection:'row'}}>
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
                            text: 'Uploaded',
                            backgroundColor: '#ffffff',
                            textColor: '#5fb13d',
                          },
                          error: {
                            text: 'Error Uploading',
                            backgroundColor: '#ff0000',
                            onPress: ()=> this.uploadInsurance(),
                            textColor: '#ffffff'
                          }
                        }}
                        buttonState={this.state.btnCertificationState}
                        />
                        { this.state.btnCertificationState == 'success' ?   <Button buttonStyle={styles.deleteButton} buttonTextStyle={styles.deleteButtonText} onPress={()=> this.uploadInsurance()}>X</Button>
                      : null }
              </View>
              <HorizontalLine/>
              <Text style={styles.headerText}>Your Short Bio</Text>
              <Text style={{color:'#4C4C4C',fontFamily:'System', fontSize:11,marginLeft: 32,marginRight: 32,marginBottom: 20,marginTop: 20, textAlign:'center'}}>Write a short bio for your trainer card, highlighting your strengths and unique approach / experience. Clients will read this and use it to decide which trainer to pick.</Text>
              <HorizontalLine/>
              <Text style={{fontFamily:'System',fontWeight:'bold',fontSize:12,color:'#5A5A5A',marginTop: 12,marginLeft: 32}}>BIO</Text>
              <TextInput style={[{fontFamily:'System',fontWeight:'normal',color:'#4D4D4D', fontSize:12,marginLeft:32, marginRight: 32,height: 100}]} multiline={true} placeholder='Put your Bio Here' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({bio: text})}/>
              <HorizontalLine/>



            <Text style={styles.errorText}>{this.props.error}</Text>
            <Button onPress={() => this.nextStepsPress()} buttonStyle={styles.createAccountButton} buttonTextStyle={styles.createAccountButtonText}>Next Step</Button>
          </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default TrainerAboutYou
