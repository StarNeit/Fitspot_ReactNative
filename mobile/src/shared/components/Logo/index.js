/* @flow */

import React from 'react'
import { Image,View } from 'react-native'

type Props = {
  styles : Object,
  useGreen : bool,
  useLarge : bool
}
const Logo = (props: Props) => {
  const { styles, useGreen, useLarge } = props
  return (
    <View>
    { useLarge ?
      <Image source={require('../../images/LargerFitspotLogo.png')} style={styles}/>
      : (
      useGreen ?
    <Image source={require('../../images/fitspot-logo-green.png')} style={styles}/>
    :
    <Image source={require('../../images/fitspot-logo.png')} style={styles}/>
      )}
    </View>
  )
}

export default Logo
