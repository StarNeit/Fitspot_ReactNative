import React from 'react'
import {connect} from 'react-redux'
import {Linking, Image, TouchableHighlight, View, Animated, Easing, TouchableWithoutFeedback,Text,Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import Title from '@components/Title'
import Button from '@components/Button'


type Props = {
  children: String,
  visible: Boolean,
  headerText: String,
  detailsText: String,
  subDetailsText: String,
  showSubDetails: Boolean,
  onOkay: Function,
  onCancel: Function,
  okayButtonText: String,
  showCancelButton: Boolean,
  cancelButtonText: String,
  showImage:Boolean,
  image: String,
  showLinkButton: Boolean,
  linkButtonText: String,
  linkButtonAction: String,
}

class MainAppModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      blackViewOpacityValue: new Animated.Value(1.0),
      whiteViewOpacityValue: new Animated.Value(1.0),
      height: 1000,
      headerText: props.headerText,
      detailsText: props.detailsText,
      subDetailsText: props.subDetailsText,
      cancelButtonText: props.cancelButtonText,
      okayButtonText: props.okayButtonText,
      showImage : props.showImage,
      image : props.image,
      onOkay: props.onOkay,
      onCancel: props.onCancel,
      linkButtonText: props.linkButtonText,
    };

    this.state.blackViewOpacityValue.setValue(0);
    this.state.whiteViewOpacityValue.setValue(0);
  }
  hideSelf(){
    this.setState({height: 1000, visible: false})
    Actions.pop()

  }

  showSelf(){
    this.setState({height: 0, visible:true})
  }
  componentDidMount(){

    this.presentModal()
  }
  componentWillUnmount(){

  }

  componentWillReceiveProps(nextProps){



    if (nextProps.visible == true && this.state.visible == false) {
      this.setState({
      headerText: nextProps.headerText,
      detailsText: nextProps.detailsText,
      subDetailsText: nextProps.subDetailsText,
      cancelButtonText: nextProps.cancelButtonText,
      okayButtonText: nextProps.okayButtonText,
      showImage : nextProps.showImage,
      image : nextProps.image,
      onOkay: nextProps.onOkay,
      onCancel: nextProps.onCancel
      })
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

  okPress(){
    var dimissed = Promise.resolve(this.dismissModal());

    if(this.state.onOkay != null){
      dimissed.then(() => this.state.onOkay())
    }



  }
  cancelPress(){
    this.dismissModal()
    if(this.state.onCancel !== null){
      this.state.onCancel()
    }
  }

  linkPress(){
    this.dismissModal()
    if(this.state.linkButtonAction !== null){
      Linking.openURL(this.props.linkButtonAction).catch(err => console.error('An error occurred', err));
    }

  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={()=>this.dismissModal()}>
      <Animated.View style={[styles.container,{
        opacity: this.state.blackViewOpacityValue, marginTop: this.state.height}]}  >
        <Animated.View style={[styles.contentContainer,{
          opacity: this.state.whiteViewOpacityValue}]}>
          {this.props.showImage ?
            <View style={{alignSelf:'center',marginTop:24,}}>
            <Image source={this.props.image} style={{width:72,height:72 ,borderRadius:36, justifyContent:'center',backgroundColor:'yellow'}} />
            </View>
            :
            null
          }
          <View>
            <Text style={styles.headerText}>{this.state.headerText}</Text>
          </View>
          <View>
            <Text style={styles.detailsText}>{this.state.detailsText}</Text>
          </View>
          <View style={[styles.subDetailsContainerStyle,{opacity: this.props.showSubDetails ? 1 : 0,height:this.props.showSubDetails ? null : 0}]}>
            <Text style={styles.subDetailsText}>{this.state.subDetailsText}</Text>
          </View>
          <Button buttonStyle={[styles.okButtonStyle,{borderBottomRightRadius: (this.props.showCancelButton || this.props.showLinkButton) ? 0 : 7,borderBottomLeftRadius: (this.props.showCancelButton || this.props.showLinkButton) ? 0 : 7}]} buttonTextStyle={styles.okButtonTextStyle} onPress={() => this.okPress()}>
            {this.state.okayButtonText}
          </Button>
          {this.props.showLinkButton ?
            <Button buttonStyle={[styles.linkButtonStyle,{borderBottomRightRadius: this.props.showCancelButton ? 0 : 7,borderBottomLeftRadius: this.props.showCancelButton ? 0 : 7}]} buttonTextStyle={styles.okButtonTextStyle} onPress={() => this.linkPress()}>
              {this.state.linkButtonText}
            </Button>
            :
            null
          }
          <Button buttonStyle={[styles.declineButtonStyle,styles.bottomButtonStyle,{height: this.props.showCancelButton ? 50 : 0}]} buttonTextStyle={styles.declineButtonTextStyle} onPress={() => this.cancelPress()}>
            {this.state.cancelButtonText}
          </Button>

        </Animated.View>
      </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
export default connect(null, {})(MainAppModal);
