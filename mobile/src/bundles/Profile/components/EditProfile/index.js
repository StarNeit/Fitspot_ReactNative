import React from 'react'
import Platform from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {Actions} from 'react-native-router-flux'
import { View, ListView, StyleSheet, Text, ScrollView, Image, TextInput } from 'react-native';
import styles from './styles'
import EditCustomerProfile from './customer'
import EditTrainerProfile from './trainer'
import CONSTS from '@utils/Consts'

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'


type Props = {
  user: Object,
  allActivities: Array,
  editingStatus: String,
  deletingStatus: String,
  deleteAttachment: Function,
}

class EditProfile extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        user: props.user,
      }

      if(this.state.user.customer == null){
        this.state.user.customer = {}
      }
  }


  render (){
    if(this.state.user.userType !== CONSTS.USER_TYPE.TRAINER){
      return (<EditCustomerProfile {...this.props} />)
    }else{
      return (<EditTrainerProfile {...this.props} />)
    }
  }
}

export default EditProfile
