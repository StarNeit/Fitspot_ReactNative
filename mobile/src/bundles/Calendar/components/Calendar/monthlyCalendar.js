import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'

import {StyleSheet,Text,View,ScrollView,TouchableHighlight,Modal} from 'react-native';

import {FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG, FONT_DAYTONA_LIGHT} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'
import moment from 'moment'
import CONSTS from '@utils/Consts'

import Calendar from '@components/Calendar'
import AddAvailability from './addAvailability'

type Props = {
  availableItems: Array,
  appointmentItems: Array,
  onCreateAvailabilityPress: Function,
  onDeleteAvailabilityPress: Function,
  onEditAvailabilityPress: Function,
  availableItems: Array,
  currentAvailability: Object,
  createStatus: Object,
  deleteStatus: Object
}

class MonthlyCalendar extends Component {
  constructor(props) {
    super(props);

    var todayDate = moment().format("YYYY-MM-DDT00:00-05:00")
    var availableItem = this.props.availableItems.filter(function(obj) {
      return (moment(todayDate).isSame(obj["date"]))
    });
    var appointments = this.props.appointmentItems.filter(function(obj) {
      return (moment(todayDate).isSame(obj["date"]))
    });

    this.state = {
      selectedDate: todayDate,
      selectedDateAvailabilities: availableItem,
      selectedDateAppointments: appointments,
      modalVisible: false,
      selectedDateAndTime: Date.now(),
      curentTime: Date.now()
    };
  }

  componentDidMount() {
    //  setInterval( () => {
     //
    //       let d = new Date();
    //       this.setState({
    //           currentTime: d
    //       })
    //    }, 800);
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.state.modalVisible) {
      if ((this.props.deleteStatus === CONSTS.API_CALL_STATUS.DELETED &&
          prevProps.deleteStatus !== this.props.deleteStatus)
        ||
        (this.props.createStatus === CONSTS.API_CALL_STATUS.CREATED &&
            prevProps.createStatus !== this.props.createStatus)
       ) {

        this.setState({modalVisible: false, availableItems: []})

        this.updateSelectedDayItems(this.state.selectedDate)
        
      }
    }
  }



  setNewDate(date) {

    this.setState({selectedDate: date})
    this.updateSelectedDayItems(date)

  }

  updateSelectedDayItems(date) {

    var availableItem = this.props.availableItems.filter(function(obj) {
      return (moment(date).isSame(obj["date"]))
    });
    var appointments = this.props.appointmentItems.filter(function(obj) {
      return (moment(date).isSame(obj["date"]))
    });
    this.setState({selectedDate: date, selectedDateAvailabilities: availableItem, selectedDateAppointments: appointments})
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  renderAppointments(hour) {
    if (this.state.selectedDateAppointments == null) {
      return null;
    }

    for (var i = 0; i < this.state.selectedDateAppointments.length; i++) {

      var startMoment = moment(this.state.selectedDateAppointments[i].dtStart)
      var endMoment = moment(this.state.selectedDateAppointments[i].dtEnd)
      var startHour = startMoment.hour()
      var endHour = startMoment.add(1,'hour').hour()

      if ((hour + 1) == startHour) {
        var appointment = this.state.selectedDateAppointments[i]

        if(appointment.status === CONSTS.WORKOUT_STATUS.ACCEPTED){
          backgroundColor = DEFAULT_GREEN_COLOR
          backgroundColorDark = '#437D2B'
        }else if(appointment.status === CONSTS.WORKOUT_STATUS.PENDING){
          backgroundColor = '#F37C55'
          backgroundColorDark = '#CC6847'
        }

        var height = 60
        var topSpan = (60 * hour)

        return (
          <TouchableHighlight key={hour + `-appointments`} underlayColor={backgroundColor} onPress={() => Actions.confirmTrainerWorkout({workoutItem: appointment})} style={{
            position: 'absolute',
            left: 59,
            top: topSpan,
            right: 0,
            height: height,
            overflow: 'visible',
            backgroundColor: backgroundColor,
            borderTopWidth: 1,
            borderTopColor: backgroundColor,
            borderLeftWidth: 5,
            borderLeftColor: backgroundColorDark
          }}>
            <Text style={{
              marginLeft: 12,
              fontFamily: FONT_DAYTONA_REG,
              color: '#FFF',
              fontSize: 12
            }}>{appointment.user.firstName} {appointment.user.lastName} at {appointment.address}</Text>
          </TouchableHighlight>
        )
      }
    }
    return null;
  }
  pressOpenHour(hour) {
    var mDate = moment(this.state.selectedDate)
    var updatedDate = mDate.hour(hour)
    this.setState({modalVisible: true, selectedDateAndTime: updatedDate.toDate(), currentAvailability: null})
  }
  editAvailability(hour, selectedAvailability) {
    var mDate = moment(this.state.selectedDate)
    var updatedDate = mDate.hour(hour)
    this.setState({modalVisible: true, selectedDateAndTime: updatedDate.toDate(), currentAvailability: selectedAvailability})
  }
  renderAvailability(hour) {

    if (this.state.selectedDateAvailabilities == null) {
      return (
        <TouchableHighlight style={{
          flex: 1
        }} underlayColor={'#ffffff'} onPress={() => this.pressOpenHour(hour)}>
          <View style={styles.row}></View>
        </TouchableHighlight>
      )
    }
    for (var i = 0; i < this.state.selectedDateAvailabilities.length; i++) {
      var startHour = moment(this.state.selectedDateAvailabilities[i].dtStart).hour()
      var endHour = moment(this.state.selectedDateAvailabilities[i].dtEnd).hour()
      if (hour >= startHour && hour < endHour) {

        var topBorderWidth = 0
        var bottomBorderWidth = 0
        var availText = ''
        if (hour == startHour) {
          topBorderWidth = 1
          availText = 'Available around ' + this.state.selectedDateAvailabilities[i].address
        }
        if (hour == (endHour - 1)) {
          bottomBorderWidth = 1
        }
        return (
          <TouchableHighlight onPress={() => this.editAvailability(hour, this.state.selectedDateAvailabilities[i])} key={hour - `test`} style={{
            flex: 1,
            backgroundColor: '#E1F2DA',
            borderTopWidth: topBorderWidth,
            borderTopColor: '#294C1A',
            borderBottomWidth: bottomBorderWidth,
            borderBottomColor: '#294C1A'
          }}>
            <Text style={{
              marginLeft: 12,
              fontFamily: FONT_DAYTONA_REG,
              color: '#294C1A',
              fontSize: 12
            }}>{availText}</Text>
          </TouchableHighlight>
        )
      }
    }
    return (
      <TouchableHighlight style={{
        flex: 1
      }} underlayColor={'#ffffff'} onPress={() => this.pressOpenHour(hour)}>
        <View style={styles.row}></View>
      </TouchableHighlight>
    );
  }
  renderCurrentTime() {
    var now = moment();
    var time = now.hour() + ':' + now.minutes();
    var currentTimeLocation = ((now.hour()) * 60) + now.minutes()
    return (
      <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: currentTimeLocation,
        height: 1,
        backgroundColor: '#F5A623'
      }}>
        <Text style={{
          right: 15,
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0)',
          color: '#F5A623',
          fontSize: 12,
          fontFamily: FONT_DAYTONA_REG
        }}>{moment().format('h:mm')}</Text>
      </View>
    )
  }
  renderHours(hour) {
    var showBottom = (hour == 23)
      ? 1
      : 0;
    var timeText = 'AM'
    var timeHour = hour
    if (hour >= 12) {
      if (hour > 12) {
        timeHour -= 12
      }
      timeText = 'PM'
    } else if (hour == 0) {
      timeHour = '12'
    }
    timeHour = (timeHour < 10)
      ? ("0" + timeHour)
      : timeHour;
    return (
      <View key={hour} style={{
        flex: 1,
        flexDirection: 'row',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#c0c0c0',
        borderBottomWidth: showBottom,
        borderBottomColor: '#c0c0c0'
      }}>
        <View style={{
          height: 1,
          backgroundColor: '#F8F8F8',
          top: 30,
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute'
        }}></View>
        <View style={{
          borderRightColor: '#F8F8F8',
          borderRightWidth: 1
        }}>
          <Text style={{
            marginLeft: 10,
            marginTop: 1,
            borderRightColor: '#000000',
            borderRightWidth: 5,
            fontFamily: FONT_DAYTONA_REG
          }}>
            {timeHour}
            {timeText}
          </Text>
        </View>
        <View style={{
          flex: 1,
          alignSelf: 'stretch'
        }}>
          {this.renderAvailability(hour)}
        </View>
      </View>
    )
  }

  render() {

    return (
      <View style={{
        flex: 1,
        marginBottom: 10
      }}>
        <Modal animationType='slide' visible={this.state.modalVisible} onRequestClose={() => this._setModalVisible(false)} supportedOrientations={['portrait']}>
          <AddAvailability chosenDate={this.state.selectedDateAndTime} onClosePress={() => this.setState({modalVisible: false})} onCreatePress={this.props.onCreateAvailabilityPress} onDeletePress={this.props.onDeleteAvailabilityPress} onEditPress={this.props.onEditAvailabilityPress} currentAvailability={this.state.currentAvailability}/>
        </Modal>
        <Calendar customStyle={customStyle} scrollEnabled={true} weekStart={0} events={this.props.availableItems}
           calendarFormat='monthly' showEventIndicators={true} selectedDate={this.state.selectedDate} onDateSelect={(date) => this.setNewDate(date)}/>
        <View style={{
          flex: 1
        }}>
          <ScrollView>
            {hours.map((hour) => this.renderHours(hour))}
            {hours.map((hour) => this.renderAppointments(hour))}
            {this.renderCurrentTime()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
const customStyle = {
  calendarContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1
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

export default MonthlyCalendar;
