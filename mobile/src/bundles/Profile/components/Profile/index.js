import React from 'react'
import {Actions} from 'react-native-router-flux'
import { View, ListView, StyleSheet, Text, ScrollView, Image, TouchableOpacity,WebView ,Dimensions,Modal} from 'react-native';
import styles from './styles'
import moment from 'moment'

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'
import Link from '@components/Link'
import StarRatings from '@components/StarRatings'
import CONSTS from '@utils/Consts'

import NotLoggedInView from '@components/NotLoggedInView'


type Props = {
  user: Object,
  isLoggedIn: boolean,
  getUserInfo: Function,
}

class Profile extends React.Component{

  constructor(props) {
      super(props);
      if(this.props.user.customer == null){
        this.props.user.customer = {}
      }
      if(this.props.user.trainer == null){
        this.props.user.trainer = {}
      }
      this.state = {
        modalVisible: false,
        imageURI: 'fitspot.jpg',
        modalHeader: 'Image View'
      }
    }



  renderInfoLine(headerTitle,information){
    return (
      <View style={{marginTop:15}}>
        <View style={{marginBottom: 15, marginLeft: 25}}>
          <Text style={{fontFamily: 'System' ,fontWeight:'bold',fontSize:8,color:'#4C4C4C',marginBottom: 1}}>{headerTitle}</Text>
          <Text style={{fontFamily: FONT_DAYTONA_LIGHT ,fontSize:14,color:'#4B4B4C'}}>{information}</Text>
        </View>
        <HorizontalLine fullWidth={true} />
      </View>
    )
  }
  renderStatLine(number,shortCode,title){
    if(number === null)
    {
      number = 0;
    }
    return(
      <View>
        <Text style={{fontFamily:FONT_DAYTONA_REG,color:'#5D5D5F',fontSize:24}}>{number}&nbsp;
          <Text style={{color:'#CCCCCC'}}>{shortCode}</Text>
        </Text>
        <Text style={{fontFamily: 'System' ,fontWeight:'bold',fontSize:8,color:'#4C4C4C', alignSelf:'center'}}>{title}</Text>
      </View>
    )
  }
  renderNotRegistered(){
    return(
      <NotLoggedInView userId={this.props.user.id}  getUserInfo={this.props.getUserInfo} loggedIn={this.props.isLoggedIn} image={require('../../assets/defaultAvatar.png')} headerText='My Profile' descriptionText='This screen will show all your workout stats and personal information.' />
    )
  }

zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

  renderCustomer(){
    var trainerPadding = 6;

    const { user } = this.props
    if(this.props.isLoggedIn && user.isVerified){

    var age = user.customer.birthday == null ? '0' : String(moment().diff(moment(user.customer.birthday),'years'))
    var numZeros = "0000"
    var zeroes = numZeros.substr(0,5 - (''+ user.customer.numWorkouts).length)

    return (
      <View style={styles.container}>
      <ScrollView style={{marginBottom: 55}}>
        <ButtonSettings onPress={ Actions.profileSettings }/>
        { user.avatar === null ?
          <Image style={{
           //  borderRadius: 75,
            width: Dimensions.get('window').width,
            height: 215,
            }}
            // position:'absolute'
            source={require('@images/Top.jpg')} />
            :
          <Image style={{
           //  borderRadius: 75,
            width: Dimensions.get('window').width,
            height: 215,
            // position:'absolute'
          }} source={{uri: user.avatar.url}} />
        }

        <View style={{alignItems: 'center',marginTop:15, flexDirection:'row',alignSelf:'center'}}>
          <Text style={{fontFamily:FONT_DAYTONA_LIGHT, fontSize:36, color:'#CCCCCC'}}>{user.firstName}
          </Text>
          <Text style={{fontFamily:FONT_DAYTONA_LIGHT, fontSize:36, color:'#5D5D5F',marginLeft:12}}>{user.lastName}</Text>
        </View>
        <View style={{alignItems: 'center',marginBottom: 15}}>
          <Text style={{fontFamily:FONT_DAYTONA_LIGHT, fontSize:24, color:'#CCCCCC'}}>{zeroes}
            <Text style={{color:'#5D5D5F'}}>{user.customer.numWorkouts}</Text>
          </Text>
          <Text style={{fontFamily: 'System' ,fontWeight:'bold',fontSize:8,color:'#4C4C4C'}}>WORKOUTS</Text>
        </View>
        <Button buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={Actions.editProfileScene}>
          Edit Profile
        </Button>
        <HorizontalLine fullWidth={true} />
        <View style={{flexDirection:'row',justifyContent: 'space-around',marginTop:15,marginBottom: 15}}>
            {this.renderStatLine(age,"y","AGE")}
            {this.renderStatLine(user.customer.height,"feet","HEIGHT")}
            {this.renderStatLine(user.customer.weight,"lbs","WEIGHT")}
        </View>
        <HorizontalLine fullWidth={true} />
        {/*
        {this.renderInfoLine("FITNESS GOAL","Get Stronger / Get Lean & Toned")}
        {this.renderInfoLine("BODY FOCUS","Back, Abdominals & Legs")}
        {this.renderInfoLine("MEDICAL ISSUES","Lower Back Pain")}
        {this.renderInfoLine("FITNESS LEVEL","I work out a few times / week")}
        {this.renderInfoLine("FITSPOT TRAINER","~3 Workouts / Week")}
        {this.renderInfoLine("PREFERRED TRAINER","Educator / Teacher, Any Gender ")}
        */}
      </ScrollView>
    </View>)
    }else{
      return(
      this.renderNotRegistered()
    )
    }
  }

  viewImage(type){
    var trainer = this.props.user.trainer
    if(type === 'license'){
      this.setState({imageURI : trainer.driverLic.url, modalHeader: 'Licence'})
    }else if(type=== 'insurance'){
      this.setState({imageURI : trainer.insurance.url, modalHeader: 'Insurance'})
    }else{
      this.setState({imageURI : trainer.certification.url, modalHeader: 'Certification'})
    }
    this.setState({modalVisible: true})
  }

  renderTrainer(){
    var trainerPadding = 6;
    const { user } = this.props
    var trainer = user.trainer
    console.log(this.state)
    if(this.props.isLoggedIn && user.isVerified){
    return (
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: 55}}>
          <Modal animationType='slide' visible={this.state.modalVisible} onRequestClose={() => this._setModalVisible(false)} supportedOrientations={['portrait']}>
            <View style={{ marginTop: 22,flex:1}}>
              <View style={styles.headerView}>
                <Text style={{textAlign:'center'}}>{this.state.modalHeader}</Text>
                <Button buttonStyle={styles.dismissButton} buttonTextStyle={styles.dismissButtonStyle} onPress={() => this.setState({ modalVisible: false})}>X</Button>
              </View>
              <View style={{flex: 1,flexDirection: "row",alignItems: "stretch"}}>
                <Image style={{flex:1,width:null,height:null, resizeMode: 'contain'}}  source={{uri: this.state.imageURI}} />
              </View>
            </View>
          </Modal>
          <ButtonSettings onPress={ Actions.profileSettings }/>
            { user.avatar === null ?
              <Image source={require('@images/Top.jpg')} />
                :
              <Image style={{
               //  borderRadius: 75,
                width: Dimensions.get('window').width,
                height: 215,
                // position:'absolute'
              }} source={{uri: user.avatar.url}} />
            }
          <View style={{alignItems: 'center',marginTop:15, flexDirection:'row',alignSelf:'center'}}>
            <Text style={{fontFamily:FONT_DAYTONA_LIGHT, fontSize:36, color:'#CCCCCC'}}>{user.firstName}
            </Text>
            <Text style={{fontFamily:FONT_DAYTONA_LIGHT, fontSize:36, color:'#5D5D5F',marginLeft:12}}>{user.lastName}</Text>
          </View>
          <Button buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={Actions.editProfileScene}>
            Edit Profile
          </Button>
          <HorizontalLine fullWidth={true} />
          <Text style={{marginLeft:32,marginTop: 12,marginBottom:6,fontFamily:'System',fontWeight:'bold',fontSize:8, color:'#4C4C4C'}}>SHORT BIO</Text>
          <Text style={{fontFamily:FONT_DAYTONA_LIGHT, fontSize:14, marginLeft:32,marginRight:32,marginBottom:12}}>{trainer.bio}</Text>
          <HorizontalLine fullWidth={true} />
          <Text style={{marginLeft: 32,marginTop: 12,marginBottom:6,fontFamily:'System',fontWeight:'bold',fontSize:8, color:'#4C4C4C'}}>ACTIVITIES</Text>
          <View style={{marginLeft: 32,marginBottom:12}}>
            {user.trainer.activities ?
              user.trainer.activities.map(function(item){
              return <Text key={item.id} style={{fontFamily:FONT_DAYTONA_LIGHT, fontSize:14,}}>{item.name}</Text>
              }): null}

          </View>
          <HorizontalLine fullWidth={true} />
          {/*<Text>USER GOALS</Text>
          //TODO: USER GOALS and Trainer Styles
          <Text>TRAINING STYLE</Text>
          */}
          <Text style={{marginLeft:32,marginTop: 12,marginBottom:6,fontFamily:'System',fontWeight:'bold',fontSize:8, color:'#4C4C4C'}}>DOCUMENTS</Text>
          <View style={{marginLeft:32,marginBottom: 12,marginRight:32}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', borderTopColor: '#dddddd',borderTopWidth: 1}}>
              <Text style={{marginTop: 10,marginBottom: 10, fontFamily:'System',fontSize:12}}>License Uploaded</Text>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity style={{marginLeft: 10, paddingRight: 10, borderRightColor:'#dddddd',borderRightWidth:1}} onPress={()=> this.viewImage('license')}>
                      <Image source={require('@images/view-icon.png')} />
                  </TouchableOpacity>
                  {/*<TouchableOpacity style={{marginLeft: 10, marginRight: 10}} onPress={()=> alert('Prevent delete? Only Edit allowed? Discuss with Serge')}>
                      <Image source={require('@images/cancel-btn-icon.png')} />
                  </TouchableOpacity>*/}
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', borderTopColor: '#dddddd',borderTopWidth: 1}}>
              <Text style={{marginTop: 10,marginBottom: 10, fontFamily:'System',fontSize:12}}>Insurance Uploaded</Text>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{marginLeft: 10, paddingRight: 10, borderRightColor:'#dddddd',borderRightWidth:1}} onPress={()=> this.viewImage('insurance')}>
                    <Image source={require('@images/view-icon.png')} />
                </TouchableOpacity>
                {/*<TouchableOpacity style={{marginLeft: 10, marginRight: 10}} onPress={()=> alert('Prevent delete? Only Edit allowed? Discuss with Serge')}>
                    <Image source={require('@images/cancel-btn-icon.png')} />
                </TouchableOpacity>*/}
              </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', borderTopColor: '#dddddd',borderTopWidth: 1,borderBottomColor: '#dddddd',borderBottomWidth: 1}}>
              <Text style={{marginTop: 10,marginBottom: 10, fontFamily:'System',fontSize:12}}>Certification Uploaded</Text>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity style={{marginLeft: 10, paddingRight: 10, borderRightColor:'#dddddd',borderRightWidth:1}} onPress={()=> this.viewImage('certification')}>
                      <Image source={require('@images/view-icon.png')} />
                  </TouchableOpacity>
                  {/*<TouchableOpacity style={{marginLeft: 10, marginRight: 10}} onPress={()=> alert('Prevent delete? Only Edit allowed? Discuss with Serge')}>
                      <Image source={require('@images/cancel-btn-icon.png')} />
                  </TouchableOpacity>*/}
                </View>
            </View>
          </View>
          <HorizontalLine fullWidth={true} />
          <Text style={{textAlign:'center',fontFamily: FONT_DAYTONA_BOLD,fontSize:13,marginTop:24}}>Your Trainer Card</Text>
          <Text style={{fontFamily:'System', fontSize:11,width:null,marginLeft:32,marginRight:32,marginBottom: 24,marginTop:12,textAlign:'center'}}>This is what users will see when browsing for trainers. Make sure your card looks appealing with a great image and text that highlights your unique talent and skill.</Text>
          <View style={{marginLeft: 32,marginRight:32, borderRadius:6, borderWidth: 1, borderColor:'#CCCCCC'}}>
            <View style={{flex:1, flexDirection:'row'}}>
                { user.avatar === null ?
                  <Image source={require('@images/Top.jpg')} style={{width:null,height:160,flex:1,resizeMode:'stretch',borderRadius:6}}/>
                    :
                  <Image style={{
                   //  borderRadius: 75,
                   resizeMode:'stretch',
                   flex:1,
                    width: null,
                    height: 160,
                    // position:'absolute'
                  }} source={{uri: user.avatar.url}} />
                }
            </View>
            <Text style={{textAlign:'center',fontFamily:FONT_DAYTONA_BOLD, fontSize: 16, marginTop: 16}}>{user.firstName} {user.lastName}</Text>
            <View style={{alignSelf:'center'}}>
              <StarRatings />
            </View>
            <Text style={{marginLeft:12,marginRight: 12, textAlign:'center', fontFamily:'System',fontSize:11, marginTop: 16,marginBottom:16, color: '#4B4B4C'}}>{user.trainer.bio}</Text>
            <View style={{flexDirection:'row', alignSelf:'center', borderTopWidth: 1,marginBottom: 12,borderColor: '#F3F3F3'}}>
              <View><Text style={{color: '#AFAFB3',fontFamily:'System',fontWeight:'500',fontSize:10, marginRight: 6,marginTop:2}}>QUALIFICATIONS</Text></View>
              <View><Text style={{fontFamily:'System',fontWeight:'500',fontSize:10, marginTop:2, color: '#F3F3F3'}}>|</Text></View>
              <View><Text style={{color: '#AFAFB3',fontFamily:'System',fontWeight:'500',fontSize:10, marginTop:2,marginLeft: 6}}>ACM ACSM NCA</Text></View>
            </View>
            <Button onPress={() => console.log('test')} buttonStyle={styles.createAccountButton} buttonTextStyle={styles.createAccountButtonText}>Choose {user.firstName}</Button>
          </View>
        </ScrollView>
    </View>)
    }else{
      return(
      this.renderNotRegistered()
    )
    }
  }

  render (){
    if( this.props.user.userType != CONSTS.USER_TYPE.TRAINER){
      return this.renderCustomer();
    }else{
      return this.renderTrainer();
    }
  }
}

export default Profile
