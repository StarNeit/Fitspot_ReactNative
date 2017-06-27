/* @flow <HomeViewWorkoutInfo chatSessions={this.props.chatSessions} eventInfo={ nextWorkout } activities={this.props.activities}/> */
import React from 'react'
import {View, Text, Image, Modal, TouchableHighlight, StatusBar, Dimensions, ListView} from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'
import Title from '@components/Title'
import Button from '@components/Button'
import Logo from '@components/Logo'
import ButtonHelp from '@components/ButtonHelp'
import ButtonGift from '@components/ButtonGift'
import ButtonHelpWhite from '@components/ButtonHelpWhite'
import ButtonGiftWhite from '@components/ButtonGiftWhite'
import ButtonSettings from '@components/ButtonSettings'
import PopupModal from '@components/PopupModal'
import HomeHelpModalPopup from '@components/PopupHelpModal/modalPopup'
import HomeGiftModalPopup from '@components/PopupGiftModal/modalPopup'
import TrainerModalPopup from '@components/PopupTrainer/modalPopup'
import styles from './styles'
import CONSTS from '@utils/Consts'
import moment from 'moment'
import HomeViewWorkoutInfo from '@components/HomeViewWorkoutInfo'

import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import { FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_FAT,FONT_DAYTONA_REG,FONT_DAYTONA_SEMIBOLD } from '@theme/fonts'

type Props = {
  userType: int,
  setBookingType: Function,
  workoutInfo: Object,
  activities: Array,
  userAvatar: Object,
  chatSessions: Array,
  loggedIn: boolean,
  user:Object,
}

class Home extends React.Component {

  constructor(props){
    super(props);
    var upcomingWorkouts = props.workoutInfo.workoutItems.filter( workoutItem => (moment(workoutItem.dtStart).isAfter(moment().utc()) && workoutItem.status === CONSTS. WORKOUT_STATUS.ACCEPTED))
    var pendingWorkouts = props.workoutInfo.workoutItems.filter( workoutItem => (moment(workoutItem.dtStart).isAfter(moment().utc()) && workoutItem.status === CONSTS. WORKOUT_STATUS.PENDING))

    var upcomingSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });


    var pendingSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      helpModalVisible: false,
      giftModalVisible: false,
      isVisible: false,
      workoutItems: this.props.workoutInfo.workoutItems,
      upcomingWorkouts: upcomingWorkouts,
      pendingWorkouts: pendingWorkouts,
      ds: this.props.events,
      upcomingDataSource: upcomingSource,
      pendingDataSource: pendingSource,
      upcomingActive: true,
    }
  }

  componentDidMount() {
    this.setState({
      pendingDataSource: this.state.pendingDataSource.cloneWithRows(this.state.pendingWorkouts),
      upcomingDataSource: this.state.upcomingDataSource.cloneWithRows(this.state.upcomingWorkouts)
    })
  }

  gotoDetails(){
    Actions.chooseActivity()
  }
  componentWillReceiveProps(nextProps){

      var upcomingWorkouts = nextProps.workoutInfo.workoutItems.filter( workoutItem => (moment(workoutItem.dtStart).isAfter(moment().utc()) && workoutItem.status === CONSTS. WORKOUT_STATUS.ACCEPTED))
      var pendingWorkouts = nextProps.workoutInfo.workoutItems.filter( workoutItem => (moment(workoutItem.dtStart).isAfter(moment().utc()) && workoutItem.status === CONSTS. WORKOUT_STATUS.PENDING))
      this.setState({workoutItems : nextProps.workoutInfo.workoutItems, upcomingWorkouts: upcomingWorkouts, pendingWorkouts:pendingWorkouts,
        pendingDataSource: this.state.pendingDataSource.cloneWithRows(pendingWorkouts),
        upcomingDataSource: this.state.upcomingDataSource.cloneWithRows(upcomingWorkouts)})

      if(!this.state.upcomingActive && pendingWorkouts.length == 0){
        this.setState({upcomingActive: true})
      }


  }

  setHelpModalVisible(visible) {
    this.setState({helpModalVisible: visible});
  }

  setGiftModalVisible(visible) {
    this.setState({giftModalVisible: visible});
  }

  setBookingType(bookingType){
    this.props.setBookingType(bookingType)
    if(bookingType === CONSTS.BOOKING_TYPE.BY_TRAINER){
      Actions.chooseTrainer()
    }else{
      Actions.chooseActivity()
    }
  }
  getNextWorkout(){
    var today =  new Date()
    var afterdates = this.state.workoutItems.filter(function(workoutItem) {
      var date = workoutItem.dtStart == null ? workoutItem.date : workoutItem.dtStart
      return moment(date).isAfter(moment().utc());
    });
    return afterdates[0]
  }

  renderTopView(){

    var nextWorkout = this.getNextWorkout()
    nextWorkout = 'defined'
    if(typeof nextWorkout == "undefined"){
      return(
        <View style={{alignItems: 'center'}}>
        <Logo styles={styles.logoStyle} useGreen/>
        <Text style={styles.headerText}>Welcome! A fitter, healthier and more motivated lifestyle awaits!</Text>
        </View>
      )
    }else{

     return(
       <View style={{alignItems:'center'}}>
         <Logo styles={styles.logoStyle} useGreen/>
         <Text style={styles.headerTextWorkout}>Tinder Workout Plan</Text>
         <Text style={styles.contentTextWorkout}>Croup workouts every Monday & Friday</Text>
      </View>
      )
    }

  }


  renderTrainers(){
    var nextWorkout = this.getNextWorkout()
    nextWorkout = 'defined'
    if(typeof nextWorkout == "undefined"){
      return(
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
            <Image source={require('../../../../shared/images/trainer1.png')}/>
            <Image source={require('../../../../shared/images/trainer2.png')}/>
            <Image source={require('../../../../shared/images/trainer3.png')}/>
            <Image source={require('../../../../shared/images/trainer4.png')}/>
            <Image source={require('../../../../shared/images/trainer5.png')}/>
          </View>
        </View>
      )
    }else{
     return null
    }
  }
/* ------------------------------ Upcoming WorkOutSession------------------------ */
  renderCustomerWithWorkOut(){
    var workoutInfo = this.props.user !== null ? this.props.user.workoutInfo : null
    var nextWorkout = this.getNextWorkout();
    // nextWorkout = 'defined';
    if(typeof nextWorkout == "undefined"){
      return (
        <Image source={require('../../assets/newHeader.jpg')} style={styles.clientContainer}>
          <StatusBar barStyle='dark-content'/>

          <ButtonGift onPress={() => this.setGiftModalVisible(true)} />
            <PopupModal title="Give the Gift of Fit" visible={this.state.giftModalVisible} onDismiss={ () => this.setGiftModalVisible(false)}>
              <HomeGiftModalPopup />
            </PopupModal>

          <ButtonHelp onPress={() => this.setHelpModalVisible(true) }/>
            <PopupModal visible={this.state.helpModalVisible} onDismiss={ () => this.setHelpModalVisible(false)}>
              <HomeHelpModalPopup />
          </PopupModal>

          { this.renderTopView() }
         
           <HomeViewWorkoutInfo chatSessions={this.props.chatSessions} eventInfo={ nextWorkout } activities={this.props.activities}/>
         
          <View style={styles.bottomViewContainer}>
            <Text style={styles.bottomTextWorkout}>Book Single Workout</Text>
            <Button buttonStyle={styles.bookActivityButtonWorkOut} buttonTextStyle={styles.bookActivityButtonTextWorkOut} onPress={() => this.setBookingType(CONSTS.BOOKING_TYPE.BY_ACTIVITY)}>Book an Activity</Button>
          </View>
        
         
        {this.renderTrainers()}
      </Image>
    )
    }else{
      return (
        <Image source={require('../../assets/newHeader.jpg')} style={styles.clientContainer}>
          <StatusBar barStyle='dark-content'/>

          <ButtonGift onPress={() => this.setGiftModalVisible(true)} />
            <PopupModal visible={this.state.giftModalVisible} onDismiss={ () => this.setGiftModalVisible(false)}>
              <TrainerModalPopup />
            </PopupModal>

          <ButtonHelp onPress={() => this.setHelpModalVisible(true) }/>
            <PopupModal visible={this.state.helpModalVisible} onDismiss={ () => this.setHelpModalVisible(false)}>
             <HomeHelpModalPopup />
           </PopupModal>

          <View style={{alignItems:'center', marginBottom: 40}}>
            <Logo styles={styles.logoStyle} useGreen/>
          </View>
         
           <HomeViewWorkoutInfo chatSessions={this.props.chatSessions} eventInfo={ nextWorkout } activities={this.props.activities}/>
         
          <View style={styles.bottomViewContainerSingle}>
            <Button buttonStyle={styles.bookActivityButton} buttonTextStyle={styles.bookActivityButtonText} onPress={() => this.setBookingType(CONSTS.BOOKING_TYPE.BY_ACTIVITY)}>Book an Activity</Button>
            <Button buttonStyle={[styles.bookActivityButton, {marginTop: 20}]} buttonTextStyle={styles.bookActivityButtonText} onPress={() => this.setBookingType(CONSTS.BOOKING_TYPE.BY_TRAINER)}>Browse Trainers</Button>
          </View>
        
         
        {this.renderTrainers()}
      </Image>
    )
    }
    
  }

  renderCustomerWithOutWorkOut(){
    var workoutInfo = this.props.user !== null ? this.props.user.workoutInfo : null
    return (
      <Image source={require('../../assets/newHeader.jpg')} style={styles.clientContainer}>
        <StatusBar barStyle='dark-content'/>

        <ButtonGift onPress={() => this.setGiftModalVisible(true)}/>
          <PopupModal title="Give the Gift of Fit" visible={this.state.giftModalVisible} onDismiss={ () => this.setGiftModalVisible(false)}>
            <HomeGiftModalPopup />
          </PopupModal>

        <ButtonHelp onPress={() => this.setHelpModalVisible(true) }/>
          <PopupModal visible={this.state.helpModalVisible} onDismiss={ () => this.setHelpModalVisible(false)}>
            <HomeHelpModalPopup />
          </PopupModal>

        { this.renderTopView() }
        <Button buttonStyle={styles.bookActivityButton} buttonTextStyle={styles.bookActivityButtonText} onPress={() => this.setBookingType(CONSTS.BOOKING_TYPE.BY_ACTIVITY)}>Book an Activity</Button>
        { (typeof nextWorkout !== "undefined") ?
          <Text style={{backgroundColor:'rgba(0,0,0,0)',fontSize:12, fontFamily: 'System', }}>{workoutInfo.numWorkoutsLeft} out of {workoutInfo.plan.numWorkouts} workouts remaining</Text>
          :
          null
        }

        {this.renderTrainers()}

        <Button buttonStyle={styles.registerButton} buttonTextStyle={styles.registerButtonText} onPress={() => this.setBookingType(CONSTS.BOOKING_TYPE.BY_TRAINER)}>Browse Trainers</Button>
      </Image>
    )
  }
  renderCustomer(){
    
    var nextWorkout = this.getNextWorkout();
    nextWorkout = 'defined';
    if(typeof nextWorkout == "undefined"){
      return this.renderCustomerWithOutWorkOut()
    }else{
      return this.renderCustomerWithWorkOut()
    }
  }

  renderRow(rowData){
    var selectedActivity = this.props.activities.filter(function(activity){
      if(activity.id === rowData.activityId){
        return true
      }else{
        false
      }
    })[0]

    var gymInfo = rowData.gymId === null ? rowData.address + ' ' + rowData.city : rowData.gym.name + ' ' + rowData.gym.city + ' ' + rowData.gym.zipcode

    return (
      <TouchableHighlight onPress={() => Actions.confirmTrainerWorkoutHome({workoutItem: rowData})}>
        <View style={{backgroundColor:'black', flexDirection:'row',borderTopColor:'#4a4a4a',borderTopWidth:1,alignItems:'center'}}>
          { rowData.user.avatar === null ?
            <Image style={{
              borderRadius: 25,
              width:50,
              height: 50,
              marginTop:15,
              marginBottom:15,
              marginRight: 10,
              marginLeft: 16,
              }}

              source={require('@images/default-avatar.png')} />

            :
            
          <Image style={{
            borderRadius: 25,
            width:50,
            height: 50,
            marginTop:15,
            marginBottom:15,
            marginRight: 10,
            marginLeft: 16,
            // position:'absolute'
          }} source={{uri: rowData.user.avatar.url}} />
        }
        <View>
          <Text style={{fontFamily:'System',fontWeight:'500',fontSize:7,letterSpacing:.93,color:'white'}}>{selectedActivity.name.toUpperCase()}</Text>
          <Text style={{fontFamily:FONT_DAYTONA_SEMIBOLD,fontSize:12,letterSpacing:-.1,color:'white'}}>{moment(rowData.dtStart).format('hA ddd')} with {rowData.user.firstName} {rowData.user.lastName}</Text>
          <Text style={{fontFamily:'System',fontSize:9,letterSpacing:-.1,color:'white'}}>{gymInfo}</Text>
        </View>
        </View>
      </TouchableHighlight>
    )
  }

  chooseUpcoming(show){
    this.setState({upcomingActive : show});
  }
  goToCalendar(){
    Actions.jump({key: 'calendar'})
        // Actions.calendarHomeScene()
  }

  renderTrainer(){
    return (
      <View style={styles.clientContainer}>

          <Image style={{
           //  borderRadius: 75,
            width: Dimensions.get('window').width,
            backgroundColor:'rgba(255,255,255,1)',
          }} source={{uri: this.props.userAvatar != null ? this.props.userAvatar.url : 'http://www.google.com'}}>
          { this.props.userAvatar != null ?
            <View style={{marginTop:70,marginBottom:70}}></View> :
            <View>
            <Text style={[styles.headerText,{marginTop:70,fontSize:11,fontFamily:'System',marginBottom:12}]}>Clients are much more likely to choose a coach with a great profile photo. Please do not upload logos or other images.</Text>
            <Button buttonStyle={styles.registerButton} buttonTextStyle={styles.registerButtonText} onPress={ ()=> Actions.editProfileScene() }>Upload Profile Picture</Button>
            </View>
          }


          <View style={{paddingBottom:20,backgroundColor:'rgba(255,255,255,.2)',flexDirection:'row',justifyContent:'space-around', width:Dimensions.get('window').width, marginBottom: 20}}>
            <View>
              <Text style={{color:'white',textAlign:'center', fontFamily: FONT_DAYTONA_LIGHT, fontSize: 24}}>{this.props.workoutInfo.paymentHistory.numWorkouts}</Text>
              <Text style={{color:'white',textAlign:'center', fontFamily: 'System', fontWeight:'bold',fontSize: 8}}>WORKOUTS</Text>
            </View>
            <View>
              <Text style={{color:'white',textAlign:'center',fontFamily: FONT_DAYTONA_LIGHT, fontSize: 24}}>{this.props.workoutInfo.paymentHistory.totalEarned}</Text>
              <Text style={{color:'white',textAlign:'center', fontFamily: 'System', fontWeight:'bold',fontSize: 8}}>EARNED</Text>
            </View>
            <View>
              <Text style={{color:'white',textAlign:'center',fontFamily: FONT_DAYTONA_LIGHT, fontSize: 24}}>{this.props.workoutInfo.paymentHistory.numClients}</Text>
              <Text style={{color:'white',textAlign:'center', fontFamily: 'System', fontWeight:'bold',fontSize: 8}}>CLIENTS</Text>
            </View>
          </View>
        </Image>
        { (this.state.pendingWorkouts.length + this.state.upcomingWorkouts.length) === 0 ?
          <View style={{ alignItems: 'center',alignSelf:'stretch'}}>
            <Text style={{textAlign:'center',marginBottom:12,fontFamily: FONT_DAYTONA_BOLD, fontSize: 20, color: DEFAULT_GREEN_COLOR}}>Welcome to Fitspot!</Text>
            <Text style={{textAlign:'center',marginBottom:12, fontFamily: FONT_DAYTONA_LIGHT, fontSize: 14, color: '#4a4a4a'}}>To get clients, you need to tell them when you’re available.</Text>
            <Button buttonStyle={[styles.registerButton,{marginBottom: 100}]} buttonTextStyle={styles.registerButtonText} onPress={ this.props.loggedIn ? ()=> this.goToCalendar() : () => alert('Create an Account First to set Availability')}>Set Your Availability!</Button>
          </View>
          :
          <View style={{ flex:1,alignItems: 'center',alignSelf:'stretch',backgroundColor:'black'}}>
            {this.state.pendingWorkouts.length > 0 ?
              <View style={{flexDirection:'row', alignSelf:'stretch'}}>
                <Button buttonStyle={[styles.workoutListButton,{borderBottomColor : !this.state.upcomingActive ? '#4a4a4a' : DEFAULT_GREEN_COLOR}]} buttonTextStyle={styles.registerButtonText} onPress={() => this.chooseUpcoming(true)}>Upcoming</Button>
                <Button buttonStyle={[styles.workoutListButton,{borderBottomColor : this.state.upcomingActive ? '#4a4a4a' : DEFAULT_GREEN_COLOR}]} buttonTextStyle={styles.requestNumberTextStyle} onPress={() => this.chooseUpcoming(false)}>{this.state.pendingWorkouts.length} Request{this.state.pendingWorkouts.length == 1 ? '' : 's'}</Button>
              </View>
              :
              null
            }
            <View style={{alignSelf:'stretch'}}>
              <ListView enableEmptySections={true} style={[styles.workoutRow,{height: this.state.upcomingActive ? null : 0}]} dataSource={this.state.upcomingDataSource} renderRow={this.renderRow.bind(this)}></ListView>
              <ListView enableEmptySections={true} style={[styles.workoutRow,{height: this.state.upcomingActive ? 0 : null}]} dataSource={this.state.pendingDataSource} renderRow={this.renderRow.bind(this)}></ListView>
            </View>
          </View>
        }

      </View>
    )
  }

  render() {
    if(this.props.userType != CONSTS.USER_TYPE.TRAINER){
      return this.renderCustomer()
    }else{
      return this.renderTrainer()
    }
  }
}

export default Home
