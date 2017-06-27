/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import CONSTS from '@utils/Consts'
import { Image, View, Text } from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'

type Props = {
  styles : Object,
  userType: integer,
}
class TabIcon extends React.Component {

  customHomeIcon(icon)
  {
    return (
      <View style={{height: 100,position:'absolute',top:-20,alignItems:'center'}}>
                      <Image source={icon} style={{width:70,height:70}}/>
      </View>
    )
  }

  remainingIcons(icon)
   {
     return(
       <View>
         <Image source={icon}/>
       </View>
     )
   }

render(){
  var color = this.props.selected ? DEFAULT_GREEN_COLOR : 'black'
  var active = this.props.selected ? '-active' : ''
  var icon = this.props.sceneKey;

  switch(icon){
    case 'calendar':
    icon = this.props.selected ? require('@images/tab-calendar-active.png') : require('@images/tab-calendar.png');
    break;
    case 'home':
    icon = this.props.selected ? require('@images/home_selected.png') : require('@images/home_normal.png');
    //  icon = this.props.selected ? require('@images/home-selected.png') : require('@images/home-normal.png');
    break;
    case 'chat':
    icon = this.props.selected ? require('@images/tab-chat-active.png') : require('@images/tab-chat.png');
    break;
    case 'trainer_support':
    icon = this.props.selected ? require('@images/tab-chat-active.png') : require('@images/tab-chat.png');
    break;
    case 'profile':
    icon = this.props.selected ? require('@images/tab-profile-active.png') : require('@images/tab-profile.png');
    break;
    case 'subscribe':
    if(this.props.userType != CONSTS.USER_TYPE.TRAINER){
      icon = this.props.selected ? require('@images/tab-subscribe-active.png') : require('@images/tab-subscribe.png');
    }else{
      icon = this.props.selected ? require('@images/settings-icon.png') : require('@images/tab-settings.png');
    }

    break;
  }

  if(this.props.sceneKey == 'home')
    return this.customHomeIcon(icon)
  else
    return this.remainingIcons(icon)

}
}


const mapStateToProps = (state) => {
  return {
    userType: state.auth.user.userType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TabIcon)
