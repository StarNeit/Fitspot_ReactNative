import React from 'react'
import {View, Image, Text, StatusBar, TouchableHighlight,ListView, TouchableOpacity, Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import styles from './styles'
import NavigationSteps from '@components/NavigationSteps'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import CONSTS from '@utils/Consts'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import EventsListView from '../Calendar/eventsListView'

type Props = {
  activities: Array,
  bookingState: Object,
  selectActivity: Function,
}

class WorkoutSessions extends React.Component{

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(this.convertSessionItemsToMap()),
    };
  }

  componentDidMount() {
    Actions.refresh({ renderRightButton: this.renderRightButton})
  }

  convertSessionItemsToMap() {
    var sessionItemsMap = {'Upcoming': [], 'Past' : [] };
    //if(this.props.sessionItems[0]) this.props.sessionItems[0].dtStart= moment("2017-03-15T19:00:00 Z")
    this.props.sessionItems.map(function(item) {
      if(moment(item.dtStart).isAfter(moment())) {
        sessionItemsMap['Upcoming'].push(item);
      } else {
        sessionItemsMap['Past'].push(item);
      }
    });

    return sessionItemsMap;

  }
  renderRightButton = () => {
    var imgLocation;

    if(this.showListView){
      imgLocation = require('@Booking/assets/choose-location-map-icon.png');
    }else{
      imgLocation = require('@Booking/assets/choose-location-list-icon.png');
    }

    return (
      <TouchableOpacity onPress={ this.goToCalendarScene }>
          <Icon key={0} name="calendar" size={20} color={DEFAULT_GREEN_COLOR}/>
      </TouchableOpacity>
    )
  }

  renderSectionHeader(sectionData, category) {
    var width = Dimensions.get('window').width -50;

    return (
      <View style= {{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch', backgroundColor: 'white', margin: 10}}>
        <Text style={{alignSelf: 'center', marginRight: 10, color: DEFAULT_GREEN_COLOR, fontWeight: 'bold'}}>{category}</Text>
        <View style={{ marginLeft: 1, marginRight: 1, justifyContent: 'center', alignSelf: 'center', width: width , height: 4, backgroundColor: DEFAULT_GREEN_COLOR}}></View>
      </View>
    )
  }
  renderEnterpriseRow(rowData) {
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{moment(rowData.dtStart).format('ddd MMM DD')}</Text>
        </View>
        <View style={styles.trainerInfoContainer}>
            <View style={styles.trainerContainer}>

              <View style={styles.avatarContainer} >
                <Image source={{uri: rowData.trainer.avatar.url }}
                  style={styles.avatarImage} resizeMode='contain'/>
              </View>
              <View style={styles.namePlusContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{rowData.trainer.firstName} {rowData.trainer.lastName.slice(0,1)}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Avg Rating</Text>
                  <View style={styles.startContainer}>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.timeContainer}>
              <Icon name="clock-o" size={15} color={DEFAULT_GREEN_COLOR}/>
              <Text style={styles.timeText}>{moment(rowData.dtStart).format('hh:mm A')}</Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row',alignItems: 'flex-start',justifyContent: 'flex-start', backgroundColor:'rgb(255,192,1)', padding: 10}}>
              <Image source={require('../../../../shared/images/trainer1.png')} style={styles.avatarImage} resizeMode='contain'/>
              <Image source={require('../../../../shared/images/trainer2.png')} style={styles.avatarImage} resizeMode='contain'/>
              <Image source={require('../../../../shared/images/trainer3.png')} style={styles.avatarImage} resizeMode='contain'/>
              <Image source={require('../../../../shared/images/trainer4.png')} style={styles.avatarImage} resizeMode='contain'/>
              <Image source={require('../../../../shared/images/trainer5.png')} style={styles.avatarImage} resizeMode='contain'/>
              <View style= {{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
                <Text style={styles.coWorkerText} numberOfLines={2}>20 Co-Workers Attending</Text>
              </View>
            </View>
            {moment(rowData.dtStart).isAfter(moment()) ?
              <View style={styles.buttonParentContainer}>
                  <View style={styles.buttonContainer}>
                    <Button underlayColor={'rgba(0,0,0,0)'}
                    buttonStyle={{ backgroundColor: DEFAULT_GREEN_COLOR,
                      height: 30,  width: 100,  justifyContent: 'center'}}
                      buttonTextStyle={{color: 'white', alignSelf:'center',
                      fontWeight: 'bold', fontFamily: FONT_DAYTONA_BOLD}}>
                      RSVP
                    </Button>
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button underlayColor={'rgba(0,0,0,0)'}
                      buttonStyle={styles.button} buttonTextStyle={styles.buttonText}>
                    Skip
                    </Button>
                  </View>

              </View> :
              <View style={styles.buttonParentContainer}>
                  <View style={styles.buttonContainer}>
                    <Button underlayColor={'rgba(0,0,0,0)'}
                    buttonStyle={{ backgroundColor: DEFAULT_GREEN_COLOR,
                      height: 30,  width: 200,  justifyContent: 'center'}}
                      buttonTextStyle={{color: 'white', alignSelf:'center',
                      fontWeight: 'bold', fontFamily: FONT_DAYTONA_BOLD}}>
                      Rebook
                    </Button>
                  </View>
              </View>
            }
        </View>
      </View>
    )
  }
  chat = (rowData) => {
    var chatSession = this.props.chatSessions.filter( chatSession => {
      if(chatSession.customer.id === rowData.userId &&
        chatSession.trainer.id === rowData.trainerId)
        return chatSession;
    })
    if(chatSession.length > 0){
      Actions.chatScene({sessionId: chatSession[0].sessionId, name: rowData.trainer.firstName + ' ' + rowData.trainer.lastName})
    }else{
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'No Chat Available',
        detailsText: "We're sorry, but you must have a trainer accept a workout before chatting.",
        showSubDetails: false,
        onOkay: null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
    }
  }

  renderPersonalRow = (rowData) => {
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{moment(rowData.dtStart).format('ddd MMM DD')}</Text>
        </View>
        <View style={styles.trainerInfoContainer}>
            <View style={styles.trainerContainer}>

              <View style={styles.avatarContainer} >
                <Image source={{uri: rowData.trainer.avatar.url }}
                  style={styles.avatarImage} resizeMode='contain'/>
              </View>
              <View style={styles.namePlusContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{rowData.trainer.firstName} {rowData.trainer.lastName.slice(0,1)}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Avg Rating</Text>
                  <View style={styles.startContainer}>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                    <Icon key={Math.random(5)} name="star" size={15} color="#F6A623"/>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.timeContainer}>
              <Icon name="clock-o" size={15} color={DEFAULT_GREEN_COLOR}/>
              <Text style={styles.timeText}>{moment(rowData.dtStart).format('hh:mm A')}</Text>
            </View>
            {moment(rowData.dtStart).isAfter(moment()) ?
              <View style={styles.buttonParentContainer}>
                  <View style={styles.buttonContainer}>
                    <Button underlayColor={'rgba(0,0,0,0)'}
                    buttonStyle={{ backgroundColor: DEFAULT_GREEN_COLOR,
                      height: 30,  width: 100,  justifyContent: 'center'}}
                      buttonTextStyle={{color: 'white', alignSelf:'center',
                      fontWeight: 'bold', fontFamily: FONT_DAYTONA_BOLD}}
                      onPress={() => Actions.confirmTrainerWorkout({workoutItem: rowData})}>
                      Edit
                    </Button>
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button underlayColor={'rgba(0,0,0,0)'}
                      buttonStyle={styles.button} buttonTextStyle={styles.buttonText}
                      onPress={() => this.chat(rowData)}>
                      Chat
                    </Button>
                  </View>

              </View> :
              <View style={styles.buttonParentContainer}>
                  <View style={styles.buttonContainer}>
                    <Button underlayColor={'rgba(0,0,0,0)'}
                    buttonStyle={{ backgroundColor: DEFAULT_GREEN_COLOR,
                      height: 30,  width: 200,  justifyContent: 'center'}}
                      buttonTextStyle={{color: 'white', alignSelf:'center',
                      fontWeight: 'bold', fontFamily: FONT_DAYTONA_BOLD}}>
                      Rebook
                    </Button>
                  </View>
              </View>
            }
        </View>
      </View>
    )
  }
  renderRow = (rowData) => {
    //TODO: INZ: Hookup rating, show enterprise bar if type is enterprise
    if(rowData.isEnterprise) {
      return this.renderEnterpriseRow(rowData)
    } else {
      return this.renderPersonalRow(rowData)
    }
  }
  renderNoResults(){
      return (
        <View style={{justifyContent:'center', flex: 1}}>
          <Text style={{textAlign: 'center',fontFamily:FONT_DAYTONA_BOLD, fontSize:20, color:'#4C4C4C',marginTop: 24}}>No Booked Sessions</Text>
          <Text style={{textAlign: 'center',fontFamily:FONT_DAYTONA_REG, fontSize:14, color:'#4C4C4C', marginTop: 12,marginBottom: 24,marginLeft:24,marginRight:24,}}>Book some sessions and they will show here on your calendar.</Text>
            <Button buttonStyle={styles.bookButtonStyle} buttonTextStyle={styles.bookButtonTextStyle} onPress={Actions.chooseActivity}>
              Book Your First Workout!
            </Button>

        </View>
      )
  }
  renderListView() {
    return (
        <View style= {styles.listContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSectionHeader = {this.renderSectionHeader}/>
        </View>
      )
  }
  render() {
    // if (this.activities.length > 0) {
    //   return (
    //     <View style= {styles.listContainer}>
    //       <ListView
    //         dataSource={this.state.dataSource}
    //         renderRow={this.renderRow}
    //         renderSectionHeader = {this.renderSectionHeader}/>
    //     </View>
    //   );
    // }else {
      return this.renderNoResults()
    // }
    
  }
}

export default WorkoutSessions
