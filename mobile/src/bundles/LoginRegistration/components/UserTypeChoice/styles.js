/* @flow */

import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_ORANGE_COLOR} from '@theme/colors'
import { FONT_DAYTONA_BOLD } from '@theme/fonts'

const styles = StyleSheet.create({
  clientContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 30,
    color: 'white',
    marginBottom: 15,
    fontFamily: FONT_DAYTONA_BOLD,
  },
  trainerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  clientButton: {
    height: 50,
    width: 160,
    flexDirection: 'row',
    backgroundColor: DEFAULT_GREEN_COLOR,
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    justifyContent: 'center'
  },
  trainerButton: {
    height: 50,
    width: 160,
    flexDirection: 'row',
    backgroundColor: DEFAULT_ORANGE_COLOR,
    borderColor: DEFAULT_ORANGE_COLOR,
    borderWidth: 1,
    justifyContent: 'center'
  },
  buttonText :{
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  backButton: {
    // backgroundColor: 'blue',
    width: 40,
    height: 40,
    top: 25,
    left: 10,
    position: 'absolute',
    zIndex:5

  },
  backButtonImage : {
    marginTop:12,
    marginLeft:10,

  }
  })

export default styles
