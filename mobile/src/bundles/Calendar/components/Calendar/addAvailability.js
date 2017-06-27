import React, {Component} from 'react';
import {StyleSheet, View,Text, TextInput,ScrollView, Alert} from 'react-native';
import MapView from 'react-native-maps';
import {Actions} from 'react-native-router-flux';
import moment from 'moment'

import Button from '@components/Button'
import HorizontalLine from '@components/HorizontalLine'
import DatePicker from 'react-native-datepicker'
import Geocoder from 'react-native-geocoder';

import CONSTS from '@utils/Consts'
import {FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG, FONT_DAYTONA_LIGHT} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

type Props = {
  chosenDate: Date,
  onClosePress: Function,
  onCreatePress: Function,
  onDeletePress: Function,
  onEditPress: Function,
  currentAvailability: Object,
}


class AddAvailability extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isEditing : this.props.currentAvailability !== null,
        chosenRadius: this.props.currentAvailability === null ? 2 : this.props.currentAvailability.radius,
        chosenRecurring: CONSTS.AVAILABILITY_RECURRING_OPTIONS.NO,
        chosenDays: [],
        chosenWeeks: [],
        chosenDailys: null,
        recurringDateText: '',
        recurringWeekText : '',
        chosenDate : this.props.chosenDate,
        startTime : this.props.currentAvailability === null ? moment(this.props.chosenDate).format('h:mm A') : moment(this.props.currentAvailability.dtStart).format('h:mm A'),
        endTime : this.props.currentAvailability === null ? moment(this.props.chosenDate).add(1,'hour').format('h:mm A') : moment(this.props.currentAvailability.dtEnd).format('h:mm A'),
        currentAvailability: this.props.currentAvailability,
        locationStreet : this.props.currentAvailability === null ? '' : this.props.currentAvailability.address,
        locationCity : this.props.currentAvailability  === null ? '' : this.props.currentAvailability.city,
        locationState: this.props.currentAvailability  === null ? '' : this.props.currentAvailability.state,
        locationZip : this.props.currentAvailability  === null ? '' : this.props.currentAvailability.zipcode,
        mapLatitude: this.props.currentAvailability === null ? 34.5133 : this.props.currentAvailability.lat,
        mapLongitude: this.props.currentAvailability === null ? -94.1629 : this.props.currentAvailability.lon,
        mapLatitudeDelta: this.props.currentAvailability === null ? 100 : 0.0090,
        mapLongitudeDelta: this.props.currentAvailability === null ? 100 : 0.0090,
        addressLookupResult: this.props.currentAvailability !== null,
      }
          }

    createAvailability(){
      var momentDate = moment(this.state.chosenDate)

      var hour = this.state.startTime.split(':')[0]
      if(this.state.startTime.split(' ')[1] === 'PM'){
        hour = parseInt(hour) + 12
      }
      var minute = this.state.startTime.split(':')[1].split(' ')[0]
      var momentStartTime = momentDate.hour(hour)
      momentStartTime = momentStartTime.minute(minute)

      momentDate = moment(this.state.chosenDate)
      hour = this.state.endTime.split(':')[0]
      if(this.state.endTime.split(' ')[1] === 'PM'){
        hour = parseInt(hour) + 12
      }
      minute = this.state.endTime.split(':')[1].split(' ')[0]
      var momentEndTime = momentDate.hour(hour)
      momentEndTime = momentEndTime.minute(minute)

      var recurring = 0
      if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.DAILY){
        recurring = 1
      }else if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.WEEKLY){
        recurring = 2
      }else if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.MONTHLY){
        recurring = 3
      }

      var availabilityItem = {
        lat : this.state.mapLatitude,
        lon : this.state.mapLongitude,
        radius : this.state.chosenRadius,
        address : this.state.locationStreet,
        city : this.state.locationCity,
        state : this.state.locationState,
        zipcode : this.state.locationZip,
        dtStart : momentStartTime.utc().format(),
        dtEnd : momentEndTime.utc().format(),
        recType: recurring,
        chosenDays: this.state.chosenDays,
        chosenDailys: this.state.chosenDailys,
        chosenWeeks : this.state.chosenWeeks,
      }




      this.props.onCreatePress(availabilityItem)
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

    renderMapAvailabilityMarker(){
      if(!this.state.addressLookupResult){
        return null
      }
      return (
        <MapView.Marker
           identifier="Marker1"
           coordinate={{
             latitude: this.state.mapLatitude,
             longitude: this.state.mapLongitude,
           }}
           title = "Availability Area" />

      )
    }

    onClosePress(){
      this.props.onClosePress();
    }

    changeColorIfRadiusSelected(radius){
      if(radius === this.state.chosenRadius){
        return { backgroundColor: DEFAULT_GREEN_COLOR}
      }
    }
    changeTextColorIfRadiusSelected(radius){
      if(radius === this.state.chosenRadius){
        return styles.buttonText
      }

    }
    selectRadius(radius){
      this.setState({chosenRadius: radius})
    }

    changeColorIfRecurringSelected(recurring){
      if(recurring === this.state.chosenRecurring){
        return { backgroundColor: DEFAULT_GREEN_COLOR}
      }
    }
    changeTextColorIfRecurringSelected(recurring){
      if(recurring === this.state.chosenRecurring){
        return styles.buttonText
      }

    }
    selectRecurring(recurring){
      this.setState({chosenRecurring: recurring})
    }


    changeColorIfDailySelected(day){
      if(this.state.chosenDailys === day){
        return { backgroundColor: DEFAULT_GREEN_COLOR}
      }
    }
    changeTextColorIfDailySelected(day){
      if(this.state.chosenDailys === day){
        return styles.buttonText
      }
    }
    selectDaily(day){
      this.setState({chosenDailys: day})
    }


    changeColorIfDaySelected(day){
      if(this.state.chosenDays.indexOf(day) != -1){
        return { backgroundColor: DEFAULT_GREEN_COLOR}
      }
    }
    changeTextColorIfDaySelected(day){
      if(this.state.chosenDays.indexOf(day) != -1){
        return styles.buttonText
      }
    }
    selectDay(day){
      var chosenDailys = this.state.chosenDays
      var index = chosenDailys.indexOf(day)
      if( index > -1){
        // we've found it, let's remove it.
        chosenDailys.splice(index,1)
      }else{
        chosenDailys.push(day)
      }
      this.setState({chosenDays: chosenDailys})
    }


    changeColorIfWeekSelected(week){
      if(this.state.chosenWeeks.indexOf(week) != -1){
        return { backgroundColor: DEFAULT_GREEN_COLOR}
      }
    }
    changeTextColorIfWeekSelected(week){
      if(this.state.chosenWeeks.indexOf(week) != -1){
        return styles.buttonText
      }

    }
    selectWeek(week){
      var chosenWeeks = this.state.chosenWeeks
      var index = chosenWeeks.indexOf(week)
      if( index > -1){
        // we've found it, let's remove it.
        chosenWeeks.splice(index,1)
      }else{
        chosenWeeks.push(week)
      }
      this.setState({chosenWeeks: chosenWeeks})
    }




    recurringDateText(){
      //this.state.recurringDateText
      var retString = ''
      if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.DAILY){
        switch (this.state.chosenDailys) {
          case 0:
            retString = 'Every day'
            break;
          case 1:
            retString = 'Every other day'
            break;
          case 2:
            retString = 'Every two days'
            break;
          case 3:
            retString = 'Every three days'
            break;
          case 4:
            retString = 'Every four days'
            break;
          case 5:
            retString = 'Every five days'
            break;
          case 6:
            retString = 'Every six days'
            break;
          default:
          retString ='broke'
            break;
        }

      }else
      if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.WEEKLY){
        retString = 'Every week on ' + this.state.chosenDays.join(' and ')

      }else
      if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.MONTHLY){
        retString = 'Every month on ' + this.state.chosenDays.join(' and ')
      }

      return retString
    }
    recurringWeekText(){
      if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.MONTHLY){
            return 'OF THE ' + this.state.chosenWeeks.join(' and ') + ' WEEK'
          }

    }

  renderDailyChoices(dailyChoice){
    return null; //right now the API doesn't handle complex booking options
    if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.DAILY){
      return (
        <Button key={dailyChoice} buttonStyle={[styles.timeOptionView,this.changeColorIfDailySelected(dailyChoice)]} buttonTextStyle={this.changeTextColorIfDailySelected(dailyChoice)} onPress={() => this.selectDaily(dailyChoice)}>{dailyChoice}</Button>
      )
    }
    return null
  }

  renderDayChoices(dayChoice){
    return null; //right now the API doesn't handle complex booking options
    if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.NO || this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.DAILY){
      return null
    }
    return (

      <Button key={dayChoice} buttonStyle={[styles.timeOptionView,this.changeColorIfDaySelected(dayChoice.toLowerCase())]} buttonTextStyle={this.changeTextColorIfDaySelected(dayChoice.toLowerCase())} onPress={() => this.selectDay(dayChoice.toLowerCase())}>{dayChoice}</Button>
    )
  }
  renderWeekChoices(weekChoice){
    return null; //right now the API doesn't handle complex booking options
    if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.MONTHLY){
      return (
        <Button key={weekChoice} buttonStyle={[styles.timeOptionView,this.changeColorIfWeekSelected(weekChoice.toLowerCase())]} buttonTextStyle={this.changeTextColorIfWeekSelected(weekChoice.toLowerCase())} onPress={() => this.selectWeek(weekChoice.toLowerCase())}>{weekChoice}</Button>
      )
    }
    return null
  }

  subRecurringOptionsStyle(){
    return {height: 0}; //right now the API doesn't handle complex booking options
    if(this.state.chosenRecurring !== CONSTS.AVAILABILITY_RECURRING_OPTIONS.NO){
      return null
    }else{
      return {height: 0}
    }
  }

  recurringDailyStyle(){
    if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.DAILY){
      return null
    }else{
      return {height: 0}
    }
  }

  recurringDayStyle(){
    if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.WEEKLY){
      return {marginBottom: 16}
    }else{
      return null
    }
  }
  recurringMonthStyle(){
    if(this.state.chosenRecurring === CONSTS.AVAILABILITY_RECURRING_OPTIONS.MONTHLY){
      return null
    }else{
      return {height:0}
    }
  }

  deleteConfirmation(){
    // needed to remove due
    // to this already being in a modal.
    // Actions.mainAppModal(
    //   {
    //     uniqId: new Date().getTime() + Math.random(5),
    //     visible: true,
    //     headerText: 'Delete Availability',
    //     detailsText:'Are you sure you want to remove your availability?',
    //     showSubDetails: false,
    //     onOkay: () => this.props.onDeletePress(this.state.currentAvailability.id),
    //     okayButtonText: 'OK',
    //     showCancelButton: true,
    //     cancelButtonText: 'Cancel',
    //     onCancel: null,
    //   }
    // )
    Alert.alert(
     'Delete Availability',
     'Are you sure you want to remove your availability?',
     [
       {text: 'Cancel',  style: 'cancel'},
       {text: 'OK', onPress: () => this.props.onDeletePress(this.state.currentAvailability.id)},
     ],
     { cancelable: false }
   )
  }


  render() {
    var dailyInfo = [1,2,3,4,5,6]
    var weekDayInfo = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Weekdays','Weekends'];
    var weekInfo = ['1st','2nd','3rd','4th','5th','Last'];
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerView}>

          <Text style={styles.headerText}>{moment(this.props.chosenDate).format("dddd MMMM Do")}</Text>
          <Button buttonStyle={styles.dismissButton} buttonTextStyle={styles.dismissButtonStyle} onPress={() => this.onClosePress()}>X</Button>
          <HorizontalLine fullWidth />
        </View>
        <Text style={styles.sectionTitle}>AVAILABLE BETWEEN</Text>
        <View style={styles.timeEntryView}>
          <View style={styles.textInputContainer}>
            <DatePicker
            date={this.state.startTime}
            mode="time"
            placeholder="start time"
            format="h:mm A"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                height: 0
              },
              dateInput: {
                borderWidth: 0,
                alignItems: 'flex-end'
              },
              placeholderText: {
                color: '#c0c0c0',
                fontFamily: FONT_DAYTONA_SEMIBOLD,
                fontSize: 16,
              },
              dateText: {
                color: DEFAULT_GREEN_COLOR,
                fontFamily: FONT_DAYTONA_SEMIBOLD,
                fontSize: 16,
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({startTime: date})}}
          />
        </View>
          <View style={styles.arrowStyle}><Text>-></Text></View>
          <View style={styles.textInputContainer}>
            <DatePicker
            date={this.state.endTime}
            mode="time"
            placeholder="end time"
            format="h:mm A"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                height: 0
              },
              dateInput: {
                borderWidth: 0,
                alignItems: 'flex-end'
              },
              placeholderText: {
                color: '#c0c0c0',
                fontFamily: FONT_DAYTONA_SEMIBOLD,
                fontSize: 16,
              },
              dateText: {
                color: DEFAULT_GREEN_COLOR,
                fontFamily: FONT_DAYTONA_SEMIBOLD,
                fontSize: 16,
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({endTime: date})}}
          />
            </View>
        </View>
        <Text style={styles.sectionTitle}>WILL TRAVEL AROUND THIS AREA</Text>
        <View style={styles.locationEntryView}>
          <View style={styles.locationInputContainer}>
            <TextInput style={styles.locationTextInput} placeholder='Street' returnKeyType='search' placeholderTextColor='#c0c0c0'  onChangeText={(text) => this.setState({locationStreet: text})} value={this.state.locationStreet}/>
            <View style={{flexDirection:'row',marginTop:6}}>
              <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
              fontSize: 12,
              backgroundColor:'rgba(0,0,0,0)',height:45}} placeholder='City' returnKeyType='search' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({locationCity: text})} value={this.state.locationCity}/>
            </View>
            <View style={{flexDirection:'row',marginTop:6}}>
            <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
            fontSize: 12,
            backgroundColor:'rgba(0,0,0,0)',height:45}} placeholder='State' returnKeyType='search' placeholderTextColor='#c0c0c0'  onChangeText={(text) => this.setState({locationState: text})} value={this.state.locationState}/>
            <TextInput style={{flex:1, backgroundColor:'red',fontFamily: 'System',
            fontSize: 12,
            backgroundColor:'rgba(0,0,0,0)',height:45}} placeholder='Zip' returnKeyType='search' placeholderTextColor='#c0c0c0'  onEndEditing={() => this.onLocationEnter()} onChangeText={(text) => this.setState({locationZip: text})} value={this.state.locationZip}/>
            </View>
          </View>
        </View>
          <MapView style= {styles.map}
          ref={ref => { this.map = ref; }}
          region={{
            latitude: this.state.mapLatitude,
            longitude:this.state.mapLongitude,
            latitudeDelta: this.state.mapLatitudeDelta,
            longitudeDelta: this.state.mapLongitudeDelta,
          }}
            >
            { this.renderMapAvailabilityMarker() }

          </MapView>
          <View style={{flex:1, flexDirection:'row', marginLeft:32,marginRight:32, marginBottom:32}}>
              <Button buttonStyle={[styles.recurringOptionButtonStyle, this.changeColorIfRadiusSelected(2)]} buttonTextStyle={this.changeTextColorIfRadiusSelected(2)} onPress={() => this.selectRadius(2)}>2 Miles</Button>
              <Button buttonStyle={[styles.recurringOptionButtonStyle, this.changeColorIfRadiusSelected(5)]} buttonTextStyle={this.changeTextColorIfRadiusSelected(5)} onPress={() => this.selectRadius(5)}>5 Miles</Button>
              <Button buttonStyle={[styles.recurringOptionButtonStyle, this.changeColorIfRadiusSelected(10)]} buttonTextStyle={this.changeTextColorIfRadiusSelected(10)}  onPress={() => this.selectRadius(10)}>10 Miles</Button>
          </View>
          <HorizontalLine fullWidth />
          <Text style={[styles.sectionTitle,{marginTop:39}]}>RECURRING</Text>
            <View style={styles.recurringContainer}>
                <Button buttonStyle={[styles.recurringOptionButtonStyle,this.changeColorIfRecurringSelected(CONSTS.AVAILABILITY_RECURRING_OPTIONS.NO)]} buttonTextStyle={this.changeTextColorIfRecurringSelected(CONSTS.AVAILABILITY_RECURRING_OPTIONS.NO)} onPress={() => this.selectRecurring(CONSTS.AVAILABILITY_RECURRING_OPTIONS.NO)}>No</Button>
                <Button buttonStyle={[styles.recurringOptionButtonStyle,this.changeColorIfRecurringSelected(CONSTS.AVAILABILITY_RECURRING_OPTIONS.DAILY)]} buttonTextStyle={this.changeTextColorIfRecurringSelected(CONSTS.AVAILABILITY_RECURRING_OPTIONS.DAILY)} onPress={() => this.selectRecurring(CONSTS.AVAILABILITY_RECURRING_OPTIONS.DAILY)}>Daily</Button>
                <Button buttonStyle={[styles.recurringOptionButtonStyle,this.changeColorIfRecurringSelected(CONSTS.AVAILABILITY_RECURRING_OPTIONS.WEEKLY)]} buttonTextStyle={this.changeTextColorIfRecurringSelected(CONSTS.AVAILABILITY_RECURRING_OPTIONS.WEEKLY)} onPress={() => this.selectRecurring(CONSTS.AVAILABILITY_RECURRING_OPTIONS.WEEKLY)}>Weekly</Button>
                <Button buttonStyle={[styles.recurringOptionButtonStyle,this.changeColorIfRecurringSelected(CONSTS.AVAILABILITY_RECURRING_OPTIONS.MONTHLY)]} buttonTextStyle={this.changeTextColorIfRecurringSelected(CONSTS.AVAILABILITY_RECURRING_OPTIONS.MONTHLY)} onPress={() => this.selectRecurring(CONSTS.AVAILABILITY_RECURRING_OPTIONS.MONTHLY)}>Monthly</Button>
            </View>
            <View style={this.subRecurringOptionsStyle()}>
              <Text style={[styles.sectionTitle]}>{ this.recurringDateText() }</Text>
              <View style={[styles.dayChooseContainer,this.recurringDailyStyle()]}>
                  { dailyInfo.map((dailyChoice) => this.renderDailyChoices(dailyChoice)) }
              </View>
              <View style={[styles.dayChooseContainer, this.recurringDayStyle()]}>
                  { weekDayInfo.map((dayChoice) => this.renderDayChoices(dayChoice)) }
              </View>
              <View style={this.recurringMonthStyle()}>
                <Text style={[styles.sectionTitle]}>{this.recurringWeekText()}</Text>
                <View style={styles.weekChooseContainer}>
                  { weekInfo.map((weekInfo) => this.renderWeekChoices(weekInfo)) }
                </View>
              </View>
            </View>
            <HorizontalLine fullWidth />

            { this.state.isEditing ?
              <View>
                <Button onPress={() => this.deleteConfirmation()} buttonStyle={styles.facebookButton} buttonTextStyle={styles.buttonText}>Delete Available Time</Button>
              </View>
            :
              <Button onPress={() => this.createAvailability() } buttonStyle={styles.facebookButton} buttonTextStyle={styles.buttonText}>Create Available Time</Button>
            }



      </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  headerView: {
    marginTop: 30,
  },
  dismissButton: {
    position:'absolute',
    width:40,
    height:40,
    top:5,
    left: 10
  },
  headerText: {
    fontSize: 14,
    fontFamily: FONT_DAYTONA_BOLD,
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 12,
    color: '#4c4c4c',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  dayChooseContainer: {
    justifyContent:'center',flex:1,marginLeft:32,marginRight:32,marginTop:16,flexDirection:'row',flexWrap: 'wrap'},
  weekChooseContainer: {justifyContent:'center',flex:1,marginLeft:32,marginRight:32,marginBottom:32,flexDirection:'row',flexWrap: 'wrap'},
  recurringContainer: {flex:1, flexDirection:'row', marginLeft:32,marginRight:32, marginBottom:16},
  arrowStyle: {
    alignSelf:'stretch',
    justifyContent: 'center',
  },
   timeEntryView: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginLeft:32,
     marginRight: 32,
    //  alignItems: 'center'
   },
   textInputContainer :{
     borderTopWidth: 2,
     borderBottomWidth: 1,
     borderColor:'#E6E6E6',
     height:45
   },
   textInput: {
     height: 45,
     width: 145,
     color: DEFAULT_GREEN_COLOR,
     fontFamily: FONT_DAYTONA_SEMIBOLD,
     fontSize: 16,
     backgroundColor:'rgba(0,0,0,0)',
     textAlign:'center',
   },
   locationEntryView: {
    //  alignItems: 'center'
   },
   locationInputContainer :{
     borderTopWidth: 1,
     borderBottomWidth: 1,
     borderColor:'#E6E6E6',
     marginLeft:32,
     marginRight: 32,
   },
   locationTextInput: {
     height: 45,
     color: '#4B4B4C',
     fontFamily: 'System',
     fontSize: 12,
     backgroundColor:'rgba(0,0,0,0)',
   },
   map: {
     flex: 1,
     marginTop: 20,
     marginBottom: 20,
     alignSelf: 'center',
     borderRadius: 128,
     width: 256,
     height: 256,
   },
   recurringOptionButtonStyle: {
     height: 33,
     width: 124,
     flex: 1,
     flexDirection: 'row',
     backgroundColor: 'rgba(0,0,0,0)',
     borderColor: DEFAULT_GREEN_COLOR,
     borderWidth: 1,
     alignSelf: 'stretch',
     justifyContent: 'center'
   },
   timeOptionView: {
     height: 33,
     width: 85,
    //  flex: 1,
    //  flexDirection: 'row',
     backgroundColor: 'rgba(0,0,0,0)',
     borderColor: DEFAULT_GREEN_COLOR,
     borderWidth: 1,
     alignSelf: 'stretch',
     justifyContent: 'center'
   },
   facebookButton: {
     height: 50,
     width: null,
     marginLeft:32,
     marginRight: 32,
     flexDirection: 'row',
     backgroundColor: DEFAULT_GREEN_COLOR,
     borderColor: DEFAULT_GREEN_COLOR,
     borderWidth: 1,
     justifyContent: 'center',
     marginTop: 16,
     marginBottom: 16,
   },
   buttonText: {
     fontSize: 12,
     color: 'white',
     alignSelf: 'center',
     fontFamily: 'System',
     fontWeight: 'bold'
   },
});

export default AddAvailability
