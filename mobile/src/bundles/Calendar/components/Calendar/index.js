import React from 'react'
import {
  View,Text,Image,TouchableWithoutFeedback
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import Calendar from '@components/Calendar'
import styles from './styles'

import Button from '@components/Button'
import Link from '@components/Link'
import {SegmentedControls } from 'react-native-radio-buttons'

import NotLoggedInView from '@components/NotLoggedInView'

import {FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG, FONT_DAYTONA_LIGHT} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'
import moment from 'moment'

import EventsListView from './eventsListView'
import TrainerCalendar from './trainerCalendar'
import MonthlyCalendar from './monthlyCalendar'
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OctIcon from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';


type Props = {
  user: Object,
  isLoggedIn: boolean,
  onCreateAvailabilityPress : Function,
  onDeleteAvailabilityPress : Function,
  onEditAvailabilityPress : Function,
  availableItems: Array,
  createStatus: Object,
  deleteStatus: Object,
  sessionItems: Array,
  activities: Array,
  getUserInfo: Function,
  editEvent:Function,
  chatSessions: Array,
}



class CalendarView extends React.Component{


  constructor(props) {
     super(props);
     this.state = {
       selectedDate: moment().format(),
       selectedFormat: 'weekly',
     };
   }

   selectFormat(format){
     this.setState({selectedFormat: format})
   }
   goToWorkoutSession(){
      Actions.workoutSessionsScene();
   }

  render(){
    var customStyle = {
      calendarContainer: {
        flex: this.state.selectedFormat === 'weekly' ? .3 : 0,
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
      },
      currentDayCircle: {
        backgroundColor: '#006362'
      },
      day: {
        fontSize: 14,
        fontFamily: FONT_DAYTONA_SEMIBOLD,
        textAlign: 'center'
      },
      title: {
        fontSize: 14,
        fontFamily: FONT_DAYTONA_BOLD
      },
      selectedDayCircle: {
        backgroundColor: DEFAULT_GREEN_COLOR
      },
      currentDayCircle: {
        backgroundColor: DEFAULT_GREEN_COLOR
      },
      currentDayText: {
        color: DEFAULT_GREEN_COLOR
      },
      calendarHeading: {
        borderTopWidth: 0,
        // borderBottomColor: '#E6E6E6'
      },
      weekendHeading: {
        fontSize: 10,
        fontFamily: FONT_DAYTONA_REG
      },
      dayHeading: {
        fontSize: 10,
        fontFamily: FONT_DAYTONA_REG
      },
      eventIndicator: {
        backgroundColor: DEFAULT_GREEN_COLOR,
        width: 5,
        height: 5
      },
      dayButton: {
        borderTopWidth: 0
      }
    }

    if(!this.props.isLoggedIn || !this.props.user.isVerified){
      return (
        <NotLoggedInView getUserInfo={this.props.getUserInfo} loggedIn={this.props.isLoggedIn} image={require('../../assets/calendar-icon.png')} headerText='Workout Calendar' descriptionText='This screen will show your completed and upcoming workouts.' />
      )
    }else{
      if(this.props.user.userType == 2){
        return (
          <View style={{flex:1, marginTop:22,marginBottom:40}}>
          <MonthlyCalendar onDeleteAvailabilityPress={ this.props.onDeleteAvailabilityPress}
            onCreateAvailabilityPress={ this.props.onCreateAvailabilityPress }  availableItems={this.props.availableItems}
            createStatus={this.props.createStatus} deleteStatus={this.props.deleteStatus}
             appointmentItems={this.props.sessionItems} />
          </View>
        )
      }else{
      return (

        <View style={styles.container}>
          <View style={{flexDirection:'row', position:'absolute', top:5,zIndex:5}}>
            <TouchableWithoutFeedback style={{marginLeft:10,marginRight:10,}} onPress={() => this.selectFormat('weekly')} >
              <MCIIcon key={Math.random(5)} name="calendar-range" style={{marginLeft:15,marginRight:25,backgroundColor:'rgba(0,0,0,0)'}} size={30} color="black" />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={{paddingLeft:10,marginRight:10,}} onPress={() => this.selectFormat('monthly')}>
              <OctIcon key={Math.random(5)} name="calendar" size={27} style={{backgroundColor:'rgba(0,0,0,0)'}} color="black" />
            </TouchableWithoutFeedback>

            <TouchableOpacity style={{paddingLeft:280,marginRight:5}} onPress={ this.goToWorkoutSession }>
              <Icon key={Math.random(5)} name="list" size={23}  style={{backgroundColor:'rgba(0,0,0,0)'}} color={DEFAULT_GREEN_COLOR}/>
            </TouchableOpacity>
          </View>
         <Calendar customStyle={customStyle} scrollEnabled={true} weekStart={0} events={this.props.sessionItems} calendarFormat={this.state.selectedFormat}
          showEventIndicators={true} onDateSelect={(date) => this.setState({ selectedDate: date })}/>
        <EventsListView chatSessions={this.props.chatSessions} events={this.props.sessionItems} editEvent={this.props.editEvent} activities={this.props.activities} selectedDate={this.state.selectedDate}/>
        </View>

      )
      }
    }
  }
}



export default CalendarView
