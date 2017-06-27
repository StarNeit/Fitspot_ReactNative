import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG} from '@theme/fonts'

const styles = StyleSheet.create({

  bookButtonStyle: {
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: DEFAULT_GREEN_COLOR,
    height: 50,
    justifyContent: 'center'
  },
  cancelButtonStyle: {
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'red',
    height: 50,
    justifyContent: 'center'
  },
  bookButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  smallText: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 10
  },
  bigText: {
    fontFamily: FONT_DAYTONA_REG,
    fontSize: 14,
    marginTop: 6
  },
  infoBox: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width:Dimensions.get('window').width,
  },
  confirmCancelButton: {
    flex:1,
    alignSelf: 'stretch',
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: DEFAULT_GREEN_COLOR,
    height: 50,
    justifyContent: 'center'
  }
})

export default styles
