import {StyleSheet, Dimensions} from 'react-native'
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
    color: '#4B4B4C',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  row: {
    flex: 1,
    // flexDirection:'row',
    backgroundColor: 'rgba(1,1,1,0)',
    width: Dimensions.get('window').width - 64,
    height: 115,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 6,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  rowTop: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  bold: {
    fontFamily: FONT_DAYTONA_BOLD
  },
  rowTopTitle: {
    fontFamily: FONT_DAYTONA_SEMIBOLD,
    fontSize: 14,
    color: '#4B4B4C',
    textAlign: 'center'
  },
  rowBottom: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  rowBottomHeader: {
    color: '#4B4B4C',
    fontFamily: FONT_DAYTONA_REG,
    fontWeight: 'bold',
    fontSize: 10
  },
  rowBottomText: {
    color: '#4B4B4C',
    fontSize: 17,
    fontFamily: FONT_DAYTONA_REG
  },
  rowBottomColumn: {
    flex: 1,
    justifyContent: 'center'
  },
  bestValue: {
    position: 'absolute',
    top: 33,
    left: -5
  }
})

export default styles
