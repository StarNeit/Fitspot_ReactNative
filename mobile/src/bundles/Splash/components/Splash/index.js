import React from 'react'
import {View, Image, Text, StatusBar, TouchableHighlight, ActivityIndicator} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import styles from './styles'

type Props = {
}

const Launch = (props: Props): React$Element<any> => {
  return (
    <Image source={require('../../assets/splash.jpg')} style={styles.container}>
    <ActivityIndicator size="large" color='white' style={{marginTop: 400}}/>
    </Image>
  )
}

export default Launch
