import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG} from '@theme/fonts'

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
    color: '#fff',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  row: {
    // flexDirection:'row',
    backgroundColor: 'rgba(255,255,255,1)',
    // width: 256,
    height: 115,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 6,
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  rowTop: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 6,
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 2,
    marginLeft: 32,
    marginRight: 32,
    height: 65,
    marginBottom: 20
  },
  bold: {
    fontFamily: FONT_DAYTONA_BOLD
  },
  rowTopTitle: {
    fontFamily: FONT_DAYTONA_SEMIBOLD,
    fontSize: 14,
    color: '#313133',
    textAlign: 'center',
  },
  rowBottom: {
    flex: 2,
    flexDirection: 'row',
  },
  rowBottomHeader: {
    color: '#c4c4c4',
    fontWeight: 'bold',
    fontSize: 8
  },
  rowBottomText: {
    color: '#c4c4c4',
    fontSize: 20,
    fontFamily: FONT_DAYTONA_LIGHT
  },
  rowBottomColumn: {
    flex: 1,
    justifyContent: 'center'
  },
  bestValue: {
    position: 'absolute',
    top: 33,
    left: -5
  },
  headerMainView: {
    marginTop: 30,
  },
  dismissButton: {
    position:'absolute',
    width:40,
    height:40,
    top:5,
    left: 10
  },
  headerMainText: {
    fontSize: 14,
    fontFamily: FONT_DAYTONA_BOLD,
    textAlign: 'center',
    marginBottom: 12,
  },
})

export default styles
