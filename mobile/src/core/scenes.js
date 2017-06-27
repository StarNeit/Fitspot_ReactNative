/* @flow */

import React from 'react'
import {Image, Text} from 'react-native'
import { connect } from 'react-redux'
import {Actions, Scene, Schema, Modal, Switch} from 'react-native-router-flux'
import {LaunchScene} from '@Launch/scenes'
import {UserTypeChoiceScene, ForgotPasswordScene, LoginRegisterScene, CreateAccountScene, PhoneVerifyScene} from '@LoginRegistration/scenes'
import {TrainerAboutYouScene, TrainerInformationScene} from '@LoginRegistration/scenes'
import {FitnessGoalsScene,ProfileScene,EditProfileScene,TrainingCadenceScene,TrainerStylesScene,ChangePasswordScene} from '@Profile/scenes'
import {HomeScene} from '@Home/scenes'
import {SubscribeNowScene, BuySubscriptionScene} from '@Subscription/scenes'
import {CalendarScene, WorkoutSessionsScene} from '@Calendar/scenes'
import {ProfileSettingsScene} from '@Settings/scenes'
import {ChatListScene, ChatScene} from '@Chat/scenes'

import {BookingTrainerConfirmationScene, ChooseActivityScene, ChooseLocationScene, BookingWorkoutDetailsScene, BookingPastWorkoutScene, LocationDetailScene, ChooseTrainerScene, ChooseDateTimeScene, BookingConfirmationScene,BookingSubscriptionOptionsScene} from '@Booking/scenes'
import {SplashScene} from '@Splash/scenes'
import styles from './styles'
import TabIcon from '@components/TabIcon'
import MainAppModal from '@components/MainAppModal'
import RatingModal from '@components/RatingModal'
import {FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

export default Actions.create(
  <Scene key="root">
    <Scene key="modal" component={Modal} >
      <Scene  key="myTabBar" tabs tabBarStyle={{alignItems: 'center',justifyContent: 'center', alignSelf:'center',backgroundColor: '#ffffff'}}>
          <Scene key="splash" title='Splash' component={SplashScene} hideNavBar hideTabBar/>

          <Scene key="loginModal" direction="vertical">
            <Scene key="loginRegister" component={LoginRegisterScene} hideNavBar hideTabBar/>
            <Scene key="createAccountModal" schema='modal' component={CreateAccountScene} title='Create Account' titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
                fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}} hideTabBar/>
            <Scene key='phoneVerify' component={PhoneVerifyScene} title='Verify Phone' titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
                fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}}/>
            <Scene key="forgotPassword" title='Launch' component={ForgotPasswordScene} hideTabBar/>
            <Scene key='createAccount' component={CreateAccountScene} title='Create Account'  hideTabBar/>
              <Scene key="chooseUserType" title= 'Choose User Type' component={UserTypeChoiceScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
                  fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}}/>
          </Scene>

          <Scene key="launch" component={LaunchScene} title="Launch" hideNavBar hideTabBar/>

          <Scene key="trainerInformation" title='About You' component={TrainerInformationScene} hideNavBar hideTabBar/>
          <Scene key="trainerAboutYou" title='About You' component={TrainerAboutYouScene} hideNavBar hideTabBar/>
          <Scene key="loginRegisterScene" component={LoginRegisterScene} hideNavBar hideTabBar/>

          <Scene key="subscribe" tabIcon={TabIcon} icon={TabIcon} component={connect(state=>({userType:state.auth.user.userType}))(Switch)}
          tabs={true} selector={props=>props.userType == 2 ? "main" : "subscribe2"}  >
            <Scene key="subscribe2"  leftButtonIconStyle={{ tintColor: DEFAULT_GREEN_COLOR}} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
                fontSize: 14,color : "#000"}} >
              <Scene key="subscribeNow" renderBackButton={()=>(null)} title='Subscribe Now' component={SubscribeNowScene} navigationBarStyle={{backgroundColor: 'rgba(0,0,0,0)'}}/>
              <Scene key="buySubscription" title='Buy Subscription' component={BuySubscriptionScene} navigationBarStyle={{backgroundColor: 'white'}} titleStyle={{ color : "#000"}}/>
           </Scene>
            <Scene key="main" title='Settings' hideBackImage titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
                  fontSize: 14,color : "#000"}}  navigationBarStyle={{backgroundColor: 'rgba(0,0,0,0)'}}component={ProfileSettingsScene}/>
          </Scene>



          <Scene key="calendar" tabIcon={TabIcon} icon={TabIcon}>
            <Scene key="calendarScene" title='Calendar' component={CalendarScene} hideNavBar/>
            <Scene key="workoutSessionsScene" title='Workouts' component={WorkoutSessionsScene} onRight={ ()=> Actions.calendarScene()}
               rightButtonImage={require('../bundles/Calendar/assets/menu-icon.png')} backButtonImage ={null} hideNavBar={false}/>
            <Scene key="confirmTrainerWorkout" title= 'Confirm Workout' component={BookingTrainerConfirmationScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
                  fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar={false}/>
            <Scene key="bookingConfirmationCalendar" hideNavBar={false} title= 'Confirm Booking' component={BookingConfirmationScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
              fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}}/>
          </Scene>

          <Scene intial={true}  key="home" tabIcon={TabIcon} icon={TabIcon} leftButtonIconStyle={{ tintColor: DEFAULT_GREEN_COLOR}}>
            <Scene key="homescreen" title='' component={HomeScene} navigationBarStyle={{backgroundColor: 'rgba(0,0,0,1)', borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar/>
            <Scene key="confirmTrainerWorkoutHome" title= 'Confirm Workout' component={BookingTrainerConfirmationScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
                fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar={false}/>
            
            <Scene key="confirmPastWorkout" title= 'Past Corporate Workout' component={BookingPastWorkoutScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
              fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar={false} hideTabBar/>
            
            <Scene key="confirmDetailWorkout" title= 'Upcoming Corporate Workout' component={BookingWorkoutDetailsScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
              fontSize: 12,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar={false} hideTabBar/>  
            
            <Scene key="chooseActivity" title= 'Choose Activity' component={ChooseActivityScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
              fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar={false}/>
            <Scene key="chooseDateTime" title= 'Choose Date and Time' component={ChooseDateTimeScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
              fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}}/>
            <Scene key="chooseLocation" title= 'Choose Location' component={ChooseLocationScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
                fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}}/>
            <Scene key="chooseTrainer" title= 'Choose Trainer' component={ChooseTrainerScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
              fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar={false}/>
            <Scene key="bookingConfirmation" title= 'Confirm Booking' component={BookingConfirmationScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
              fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}}/>
            <Scene key="bookingSubscriptionOptions" title= 'Subscription Options' component={BookingSubscriptionOptionsScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
              fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}}/>


          </Scene>

          <Scene key="chat" tabIcon={TabIcon} icon={TabIcon} leftButtonIconStyle={{ tintColor: DEFAULT_GREEN_COLOR}}>

            <Scene key="chatListScene" title='Chats' component={ChatListScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
                  fontSize: 14,color : "#000"}}  navigationBarStyle={{backgroundColor: 'rgba(0,0,0,0)'}}/>

            <Scene key="chatScene" title='Chats' component={ChatScene}  titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
                  fontSize: 14,color : "#000"}}  navigationBarStyle={{backgroundColor: 'rgba(0,0,0,0)'}} />
          </Scene>




          <Scene key="profile" tabIcon={TabIcon}  icon={TabIcon} leftButtonIconStyle={{ tintColor: DEFAULT_GREEN_COLOR}}>

            <Scene key="profileScene" title='Profile' component={ProfileScene}   hideNavBar/>
            <Scene key="editProfileScene" title='Edit Profile' component={EditProfileScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
          fontSize: 14,color : "#000"}} hideNavBar={false}/>
          <Scene key="changePassword" title='Change Password' component={ChangePasswordScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
        fontSize: 14,color : "#000"}} />

            <Scene key="trainingCadence" title='Fitness Level' component={TrainingCadenceScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
          fontSize: 14,color : "#000"}} />
                <Scene key="trainerStyles" title='Trainer Preferences' component={TrainerStylesScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
          fontSize: 14,color : "#000"}} />
            <Scene key='fitnessGoals' component={FitnessGoalsScene} title='Fitness Goals' titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
          fontSize: 14,color : "#000"}}/>
            <Scene key="profileSettings" title='Edit Settings' component={ProfileSettingsScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
          fontSize: 14,color : "#000"}} hideNavBar={false}/>

          </Scene>
      </Scene>
    <Scene key="mainAppModal" component={MainAppModal} />
    <Scene key="ratingModal" component={RatingModal} />
    </Scene>
  </Scene>
)
