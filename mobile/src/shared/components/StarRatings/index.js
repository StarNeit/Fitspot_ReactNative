/* @flow */

import React from 'react'
import { Image,View } from 'react-native'

type Props = {
  styles : Object,
  useGreen : bool
}

class StarRatings extends React.Component {

  constructor(props) {
      super(props);
    }


  renderStars(){

  }

  render(){

    const { styles, useGreen } = this.props

    return (
      <View style={{flexDirection:'row'}}>
      <Image style={{width: 20,height:20}} source={require('../../images/rating-star.png')} />
      <Image style={{width: 20,height:20}} source={require('../../images/rating-star.png')} />
      <Image style={{width: 20,height:20}} source={require('../../images/rating-star.png')} />
      <Image style={{width: 20,height:20}} source={require('../../images/rating-star.png')} />
      <Image style={{width: 20,height:20}} source={require('../../images/rating-star.png')} />
      </View>
    )
  }
}

export default StarRatings
