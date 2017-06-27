import {StyleSheet,Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_ORANGE_COLOR} from '@theme/colors'
import {FONT_DAYTONA_BOLD,FONT_DAYTONA_REG} from '@theme/fonts'

const styles = StyleSheet.create({
  clientContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: null,
    height: null,
  },
  headerText: {
    fontFamily: FONT_DAYTONA_BOLD,
    fontSize: 14,
    marginTop: 31,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 0
  },
  textInput: {
    height: 40,
    width: null,
    color: '#5a5a5a',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 32,
    marginTop: 15,
    marginBottom: 15,
  },
  facebookButton: {
    height: 50,
    width: 256,
    flexDirection: 'row',
    backgroundColor: '#3B5998',
    borderColor: '#3B5998',
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 0
  },
  okText: {
    fontFamily: 'System',
    fontSize: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#5A5A5A',
  },
  forgotPWLink: {
    fontFamily: 'System',
    fontWeight: 'bold',
    color: DEFAULT_GREEN_COLOR,
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 40
  },
  registerButton: {
    height: 50,
    width: 320,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 25
  },
  registerButtonText: {
    fontSize: 12,
    color: DEFAULT_GREEN_COLOR,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  nameEntryContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf:'center',
    // backgroundColor: 'red'
  },
  nameInputContainer: {
    flex: 1,
  },
  nameInputTitle: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 8,
    color: '#5A5A5A',
    letterSpacing: 1,
  },
  nameInput:{
    height: 40,
    width: 125,
    color: '#5A5A5A',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 12,
  },
  errorText: {
    fontFamily: FONT_DAYTONA_REG,
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'red',
    marginTop: 12,
    textAlign: 'center'
  },
  createAccountButton: {
    height: 44,
    // width: Dimensions.get('window').width,
    backgroundColor: DEFAULT_GREEN_COLOR,
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    // alignSelf: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  createAccountButtonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  }
});

export default styles
