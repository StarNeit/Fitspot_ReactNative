/* @flow */

import React from 'react'
import {Image, TouchableHighlight, View, Animated, Easing, TouchableWithoutFeedback, Text} from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import GreenBackButton from '@components/GreenBackButton'

type Props = {
  styles: Object,
  children?: string,
  visible: bool,
  onDismiss: Function,
  title?: string,
}

class PopupModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blackViewOpacityValue: new Animated.Value(1.0),
      whiteViewOpacityValue: new Animated.Value(1.0),
      height: 1000,
    };

    this.state.blackViewOpacityValue.setValue(0);
    this.state.whiteViewOpacityValue.setValue(0);
  }
  hideSelf(){
    this.setState({height: 1000})
    this.props.onDismiss()
  }

  showSelf(){
    this.setState({height: 0})
  }

  componentWillUpdate(nextProps, nextState) {
  if (nextProps.visible == true && this.props.visible == false) {
    this.presentModal();
  }
}

  presentModal() {
    this.showSelf();
    Animated.sequence([
    Animated.timing(                          // Base: spring, decay, timing
      this.state.blackViewOpacityValue,                 // Animate `bounceValue`
      {
        toValue: 1,                         // Animate to smaller size
        easing: Easing.quad,
      }
    ),Animated.timing(                         // Base: spring, decay, timing
      this.state.whiteViewOpacityValue,                 // Animate `bounceValue`
      {
        toValue: 1.0,                         // Animate to smaller size
        easing: Easing.quad,
      },
    )]).start();                                // Start the animation

  }

  dismissModal(){
    Animated.sequence([
    Animated.timing(                          // Base: spring, decay, timing
      this.state.whiteViewOpacityValue,                 // Animate `bounceValue`
      {
        toValue: 0,                         // Animate to smaller size
        easing: Easing.quad,
      }
    ),Animated.timing(                         // Base: spring, decay, timing
      this.state.blackViewOpacityValue,                 // Animate `bounceValue`
      {
        toValue: 0.0,                         // Animate to smaller size
        easing: Easing.quad,
        duration: 700,
      },
    )]).start(this.hideSelf());
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={()=>this.dismissModal()}>
      <Animated.View style={[styles.container,{
        opacity: this.state.blackViewOpacityValue, marginTop: this.state.height}]}  >
         
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{this.props.title}</Text>
          </View>
        <Animated.View style={[styles.contentContainer,{
          opacity: this.state.whiteViewOpacityValue}]}>
          {this.props.children}
        </Animated.View>
      </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default PopupModal
