/* @flow */
import React from 'react'
import {View, Text, TextInput, ScrollView, Switch,KeyboardAvoidingView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import Link from '@components/Link'
import Button from '@components/Button'
import GreenBackButton from '@components/GreenBackButton'
import HorizontalLine from '@components/HorizontalLine'
import SegmentedControl from '@components/SegmentedControl'
import NavigationSteps from '@components/NavigationSteps'
import styles from './styles'
import Geocoder from 'react-native-geocoder';
import AwesomeButton from '@components/AwesomeButton';
import moment from 'moment'


type Props = {
  onFinishClick: Function,
  activities: Array,
  baseTrainerInfo:Object,
  currentUser:Object
}

class TrainerInformation extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activities: props.activities == null ? null : Array.from({ length: this.props.activities.length }, () => false),
      radius: [2, 5, 10, 20],
      selectedRadius: -1,
      locationStreet: '',
      locationCity: '',
      locationZip: '',
      locationState:'',
      btnSubmitState: 'idle',
    }

  }

  setSelected(index,value){
    var state = this.state;
    state.activities[index] = value
    this.setState(state)
  }

  createUser(){
    var activity_ids = []
    for(var i = 0; i < this.state.activities.length; i++){
      if(this.state.activities[i]){
        activity_ids.push(this.props.activities[i].id)
      }
    }
    this.setState({btnSubmitState: 'busy'})

    var address = this.state.locationStreet + ' ' + this.state.locationCity + ' ' + this.state.locationState + ' ' + this.state.locationZip
    Geocoder.geocodeAddress(address).then(res => {
        // res is an Array of geocoding object (see below)

        if(res[0] == null){
          //TODO handle no location found

          Actions.mainAppModal(
          {
            uniqId: new Date().getTime(),
            visible: true,
            headerText: 'GPS Issue',
            detailsText: 'Could not find a location please enter a different address.',
            onOkay:null,
            okayButtonText: 'OK',
            showCancelButton: false,
          }
          )
          this.setState({btnSubmitState: 'idle'})
          return;
        }
        let locationInfo = res[0]


        this.props.baseTrainerInfo.home_radius = this.state.radius[this.state.selectedRadius]
        this.props.baseTrainerInfo.lat = locationInfo.position.lat
        this.props.baseTrainerInfo.lon = locationInfo.position.lng
        this.props.baseTrainerInfo.activity_ids = activity_ids
        var utcTime = moment(this.props.baseTrainerInfo.driverLicExpiry,"MM-DD-YYYY").utc().format();
        this.props.baseTrainerInfo.driverLicExpiry = utcTime
        this.props.baseTrainerInfo.address = this.state.locationStreet
        this.props.baseTrainerInfo.city = this.state.locationCity
        this.props.baseTrainerInfo.state = this.state.locationState
        this.props.baseTrainerInfo.zipcode = this.state.locationZip

        this.props.currentUser.trainer = this.props.baseTrainerInfo

        this.props.onFinishClick(this.props.currentUser)
    })
    .catch(err => {
    this.setState({btnSubmitState: 'idle'})
      console.log(err)
    })
  }

  updateText(property,value){
    const user = this.state.user
    user.trainer[property] = value;
    this.setState(user: user)
  }

  renderActivities(){
    if(this.props.activities == null)
    return null

    var me = this
    var switchList = this.props.activities.map(function(item,index){
      var name = item.name
      return (
        <View key={item.name} style={{marginTop:6,marginBottom:6,flexDirection:'row', justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#fafafa'}}>
        <Text style={{textAlign:'left',alignSelf:'center',marginTop:6,marginBottom:6}}>{name}</Text>
        <Switch onValueChange={(value) => me.setSelected(index,value)} value={me.state.activities[index]} style={{marginBottom:12}}/>
        </View>
      )
    })

    return(
      <View>
        { switchList }
        </View>
    )
  }

  renderTrainingStyles(){
    return(
      <Text>Oh Hey</Text>
    )
  }

  render(){
    var choices = this.state.radius.map(function(item) { return item + ' Miles' })
    return (
      <View style={styles.clientContainer}>
        <GreenBackButton/>
        <Text style={styles.headerText}>Training Information</Text>
        <NavigationSteps style={{marginTop:25}} currentNumber={3} numberOfSteps={3}  />
        <ScrollView style={{marginBottom:55}} >
          <KeyboardAvoidingView   behavior='position' style={{marginLeft:32,marginRight:32, marginBottom: 20}}>
            <Text style={[styles.headerText,{marginBottom: 30}]}>What activities do you train?</Text>
            { this.renderActivities() }
            {/* this.renderTrainingStyles() */}
            <Text style={[styles.headerText,{marginTop:18,marginBottom: 6}]}>Where will you consider your home base?</Text>
              <View style={styles.locationEntryView}>
                <View style={styles.locationInputContainer}>
                  <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
                  fontSize: 12,
                  backgroundColor:'rgba(0,0,0,0)',height:45}} placeholder='Street' returnKeyType='search' placeholderTextColor='#c0c0c0'  onChangeText={(text) => this.setState({locationStreet: text})} value={this.state.locationStreet}/>
                  <View style={{flexDirection:'row',marginTop:6}}>
                    <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
                    fontSize: 12,
                    backgroundColor:'rgba(0,0,0,0)',height:45}} placeholder='City' returnKeyType='search' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({locationCity: text})} value={this.state.locationCity}/>
                  </View>
                  <View style={{flexDirection:'row',marginTop:6}}>
                  <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
                  fontSize: 12,
                  backgroundColor:'rgba(0,0,0,0)',height:45}} maxLength={2} placeholder='State' returnKeyType='search' placeholderTextColor='#c0c0c0'  onChangeText={(text) => this.setState({locationState: text})} value={this.locationState}/>
                  <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
                  fontSize: 12,
                  backgroundColor:'rgba(0,0,0,0)',height:45}} maxLength={5} placeholder='Zip' returnKeyType='search' placeholderTextColor='#c0c0c0'   onChangeText={(text) => this.setState({locationZip: text})} value={this.locationState}/>
                  </View>
                </View>
              </View>
            <Text style={[styles.headerText,{marginBottom: 12}]}>How Far Away are you willing to travel?</Text>
            <SegmentedControl vals={choices} color={'#5FB13D'} onChange={(event) => {this.setState({selectedRadius: event.nativeEvent.selectedSegmentIndex})}} ></SegmentedControl>

            </KeyboardAvoidingView>
            <Button onPress={() => this.createUser()} buttonStyle={[styles.createAccountButton,this.state.btnSubmitState == 'idle' ? null : {backgroundColor:'#4c4c4c',borderColor:'#4c4c4c'}]} buttonTextStyle={styles.createAccountButtonText}>{this.state.btnSubmitState == 'idle' ? 'Create Account' : 'Creating Account...'}</Button>
          </ScrollView>
      </View>
    )
  }
}

export default TrainerInformation
