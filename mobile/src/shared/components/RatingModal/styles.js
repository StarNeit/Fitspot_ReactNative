/* @flow */

import {StyleSheet, Dimensions} from 'react-native'

import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_RED_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_FAT, FONT_DAYTONA_REG, FONT_DAYTONA_SEMIBOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    zIndex: 9999
  },
  nameText: {
    fontFamily: FONT_DAYTONA_SEMIBOLD,
    fontSize: 10,
    marginTop: 12,
    textAlign: 'center'
  },
  contentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 7,
    width: null,
    height: null,
    marginLeft: 32,
    marginRight: 32
  },
  modalButton: {
    height: 50,
    width: 105,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  modalButtonText: {
    fontSize: 12,
    color: DEFAULT_GREEN_COLOR,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  modalHelpText: {
    alignSelf: 'center',
    fontSize: 10,
    color: '#999'
  },
  modalLargeNumber: {
    fontFamily: FONT_DAYTONA_FAT,
    fontSize: 36,
    color: DEFAULT_GREEN_COLOR
  },
  modalTitle: {
    fontFamily: FONT_DAYTONA_REG,
    fontSize: 12,
    color: '#313133',
    marginTop: 15
  },
  modalDesc: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 15,
    width: 160
  },
  headerText: {
    fontFamily: FONT_DAYTONA_BOLD,
    fontSize: 13,
    color: '#323232',
    textAlign: 'center',
    marginTop: 25
  },
  detailsText: {
    fontFamily: 'System',
    fontSize: 11,
    color: '#4B4B4D',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25
  },
  subDetailsText: {
    fontFamily: 'System',
    fontSize: 11,
    color: '#4B4B4D',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  subDetailsContainerStyle: {
    backgroundColor: '#F3F3F3'
  },
  okButtonStyle: {
    width: null,
    backgroundColor: DEFAULT_GREEN_COLOR,
    height: 50,
    justifyContent: 'center',
    borderBottomLeftRadius:7,
    borderBottomRightRadius:7,
    borderWidth:0.1,
    borderColor:'red',
  },
  okButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',

  },
  declineButtonStyle: {
    width: null,
    backgroundColor: DEFAULT_RED_COLOR,
    height: 50,
    justifyContent: 'center'
  },
  declineButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  bottomButtonStyle: {
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7
  }
});

export default styles
