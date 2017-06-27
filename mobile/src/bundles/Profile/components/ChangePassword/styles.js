/* @flow */

import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_ORANGE_COLOR} from '@theme/colors'
import {FONT_DAYTONA_BOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  clientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  backButton: {
    // backgroundColor: 'blue',
    width: 40,
    height: 40,
    top: 25,
    left: 10,
    position: 'absolute',
    zIndex: 5
  },
  backButtonImage: {
    marginTop: 12,
    marginLeft: 10
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 13,
    color: '#4d4d4d',
    marginBottom: 15,
    fontFamily: FONT_DAYTONA_BOLD
  },
  description: {
    fontFamily: 'System',
    fontSize: 11,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#4d4d4d',
    maxWidth: 200,
    textAlign: 'center',
    marginBottom:24,
  },
  separator: {
    height: 10,
    backgroundColor: '#dddddd'
  },
  clientButton: {
    height: 50,
    // width: 256,
    alignSelf:'stretch',
    marginLeft:32,
    marginRight:32,
    marginTop: 40,
    flexDirection: 'row',
    backgroundColor: DEFAULT_GREEN_COLOR,
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 12,
    marginBottom: 12,
    alignSelf:'stretch',
    marginLeft:32,
    marginRight: 32,
  },
  textInput: {
    height: 40,
    width: 250,
    color: '#4d4d4d',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 12,
  }
});

export default styles
