import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  buttonStyle: {
    marginBottom: 24,
    alignSelf: 'stretch',
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: DEFAULT_GREEN_COLOR,
    height: 50,
    justifyContent: 'center',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1
  },
  buttonTextStyle: {
    color: 'white',
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
    color: '#5a5a5a',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 25
  },
  nameEntryContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 12,
    // backgroundColor: 'red',
    marginTop: 25,
    marginBottom: 25
  },
  nameInputContainer: {
    flex: 1
  },
  nameInputTitle: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 8,
    color: '#5a5a5a',
    letterSpacing: 1
  },
  nameInput: {
    height: 40,
    width: 125,
    color: 'white',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 12
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
  },
  arrowButtonStyle: {
    height: 40,
    marginTop: 4,
    width: 40,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center'
  }

})

export default styles
