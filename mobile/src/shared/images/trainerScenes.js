import React from 'react'
import {Image, Text} from 'react-native'
import {Actions, Scene, Schema, Modal} from 'react-native-router-flux'
import {LaunchScene} from '@Launch/scenes'
import {UserTypeChoiceScene, ForgotPasswordScene, LoginRegisterScene, CreateAccountScene, PhoneVerifyScene} from '@LoginRegistration/scenes'
import {TrainerAboutYouScene, TrainerInformationScene} from '@LoginRegistration/scenes'
import {FitnessGoalsScene,ProfileScene,EditProfileScene,TrainingCadenceScene,TrainerStylesScene} from '@Profile/scenes'
import {HomeScene} from '@Home/scenes'
import {SubscribeNowScene, BuySubscriptionScene} from '@Subscription/scenes'
import {CalendarScene} from '@Calendar/scenes'
import {ProfileSettingsScene} from '@Settings/scenes'
import {ChatListScene, ChatScene} from '@Chat/scenes'
import {BookingTrainerConfirmationScene, ChooseActivityScene, ChooseLocationScene, LocationDetailScene, ChooseTrainerScene, ChooseDateTimeScene, BookingConfirmationScene,BookingSubscriptionOptionsScene} from '@Booking/scenes'
import {SplashScene} from '@Splash/scenes'
import styles from './styles'
import TabIcon from '@components/TabIcon'
import MainAppModal from '@components/MainAppModal'
import {FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'



module.exports =
      <Scene  key="myTabBar" tabs tabBarStyle={{alignItems: 'center',justifyContent: 'center', alignSelf:'center',backgroundColor: '#ffffff'}}>

          <Scene intial={true}  key="home" tabIcon={TabIcon} icon={TabIcon} leftButtonIconStyle={{ tintColor: DEFAULT_GREEN_COLOR}}>
            <Scene key="homescreen" title='' component={HomeScene} navigationBarStyle={{backgroundColor: 'rgba(0,0,0,1)', borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar/>
            <Scene key="confirmTrainerWorkoutHome" title= 'Confirm Workout' component={BookingTrainerConfirmationScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
                fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar={false}/>
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

          <Scene key="calendar" tabIcon={TabIcon} icon={TabIcon}>
            <Scene key="calendarScene" title='Calendar' component={CalendarScene} hideNavBar/>
            <Scene key="confirmTrainerWorkout" title= 'Confirm Workout' component={BookingTrainerConfirmationScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
                  fontSize: 14,color : "#000"}} navigationBarStyle={{backgroundColor: 'white',borderBottomColor: 'transparent', borderBottomWidth: 65}} hideNavBar={false}/>
            <Scene key="bookingConfirmationCalendar" hideNavBar={false} title= 'Confirm Booking' component={BookingConfirmationScene} titleStyle={{    fontFamily: FONT_DAYTONA_BOLD,
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

              <Scene key="trainingCadence" title='Fitness Level' component={TrainingCadenceScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
            fontSize: 14,color : "#000"}} />
                  <Scene key="trainerStyles" title='Trainer Preferences' component={TrainerStylesScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
            fontSize: 14,color : "#000"}} />
              <Scene key='fitnessGoals' component={FitnessGoalsScene} title='Fitness Goals' titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
            fontSize: 14,color : "#000"}}/>

          </Scene>


          <Scene key="chat" tabIcon={TabIcon} icon={TabIcon} leftButtonIconStyle={{ tintColor: DEFAULT_GREEN_COLOR}}>
            <Scene key="profileSettings" title='Edit Settings' component={ProfileSettingsScene} titleStyle={{fontFamily: FONT_DAYTONA_BOLD,
          fontSize: 14,color : "#000"}} hideNavBar={false}/>
          </Scene>

      </Scene>
;
