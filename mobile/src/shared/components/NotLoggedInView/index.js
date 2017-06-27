import React from 'react'
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableHighlight,
  ListView
} from 'react-native'
import Button from '@components/Button'
import Link from '@components/Link'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD,FONT_DAYTONA_REG, FONT_DAYTONA_SEMIBOLD} from '@theme/fonts'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_ORANGE_COLOR} from '@theme/colors'


type Props = {
  image : Object,
  headerText: String,
  descriptionText: String,
  loggedIn: Boolean,
  getUserInfo:Function,
  userId: String,
}

const NotLoggedInView = (props: Props) => {
  return (
    <View style={{justifyContent:'center', flex: 1}}>
      <Image style={{alignSelf:'center'}} source={props.image} />
      <Text style={{textAlign: 'center',fontFamily:FONT_DAYTONA_BOLD, fontSize:20, color:'#4C4C4C',marginTop: 24}}>{props.headerText}</Text>
      <Text style={{textAlign: 'center',fontFamily:FONT_DAYTONA_REG, fontSize:14, color:'#4C4C4C', marginTop: 12,marginBottom: 24,marginLeft:24,marginRight:24,}}>{props.descriptionText}</Text>
        {/*<Button buttonStyle={styles.bookButtonStyle} buttonTextStyle={styles.bookButtonTextStyle} onPress={Actions.chooseActivity}>
          Book Your First Workout!
        </Button>*/}
        {props.loggedIn ?
          <Button buttonStyle={styles.bookButtonStyle} buttonTextStyle={styles.bookButtonTextStyle} onPress={ () => props.refreshUser()}>
            Please check your email and click the link there. After you have done that, click here.
          </Button>
          :
          <Link style={styles.loginButtonStyle} onPress={() => Actions.loginModal()}>
            Log In / Register
          </Link>
        }

    </View>

  )
}
export default NotLoggedInView
