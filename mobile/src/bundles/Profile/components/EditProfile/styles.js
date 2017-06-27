import {StyleSheet, Dimensions, PixelRatio} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  buttonStyle: {
    marginBottom: 12,
    alignSelf: 'stretch',
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1
  },
  buttonTextStyle: {
    color: DEFAULT_GREEN_COLOR,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  facebookButton: {
    marginBottom: 12,
    alignSelf: 'stretch',
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: '#3B5998',
    height: 50,
    justifyContent: 'center',
    borderColor: '#3B5998',
    borderWidth: 1
  },
  facebookButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    height: 40,
    // width: 250,
    marginLeft: 32,
    marginRight: 32,
    alignSelf: 'stretch',
    color: '#5a5a5a',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 35
  },
  nameEntryContainer: {
    // flex: 1,
    flexDirection: 'row',
    marginLeft:32,
    marginRight:32,
    // justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 12,
  },
  // nameInputContainer: {
  //   flex: 1
  // },
  nameInputTitle: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 8,
    color: '#5a5a5a',
    letterSpacing: 1
  },
  nameInput: {
    height: 40,
    width: 155,
    color: '#5a5a5a',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 12
  },
  avatarContainer: {
    //  borderColor: '#9B9B9B',
    //  borderWidth: 1 / PixelRatio.get(),
    //  justifyContent: 'center',
    //  alignItems: 'center',
    backgroundColor: 'red'
  },
  avatar: {
    //  borderRadius: 75,
    width: Dimensions.get('window').width,
    height: 215,
    position: 'absolute'
  },
  registerButton: {
    height: 50,
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    // justifyContent: 'center',
    //  marginTop: 25
  },
  registerButtonText: {
    fontSize: 12,
    color: DEFAULT_GREEN_COLOR,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  locationEntryView: {
    //  alignItems: 'center'
  },
  locationInputContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    marginLeft: 32,
    marginRight: 32
  },
  locationTextInput: {
    height: 45,
    color: '#4B4B4C',
    fontFamily: 'System',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  deleteButton: {
    flex: .3,
    height: 50,
    width: 40,
    borderColor: DEFAULT_GREEN_COLOR,
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    justifyContent: 'center'
  },
  deleteButtonText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  topButtonStyle: {
    flex: 1,
    marginBottom: 12,
    alignSelf: 'stretch',
    // marginLeft: 35,
    // marginRight: 35,
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    // borderColor: DEFAULT_GREEN_COLOR,
    // borderWidth: 1
  },
  topButtonTextStyle: {
    color: DEFAULT_GREEN_COLOR,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  }
})

export default styles
