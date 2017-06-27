import {StyleSheet,Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

const styles = StyleSheet.create({

  container: {
    width: Dimensions.get('window').width,
    marginTop: 0,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 7,
    position: 'absolute',
    top: 0,
  },
  gymDetailContainer: {
    width: 256,
    height: 365,
    marginTop: (Dimensions.get('window').height - 365) / 2,
    backgroundColor: 'white',
    borderRadius:10,
  },
  locationName: {
    fontFamily: FONT_DAYTONA_BOLD,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 25
  },
  locationInfo: {
    fontSize: 8,
    textAlign: 'center',
    fontWeight: "700",
    marginBottom: 25
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopColor: '#E6E6E6',
    borderTopWidth: 1,
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 0,
    marginTop: 0
  },
  textInput: {
    height: 60,
    width: 250,
    color: '#4B4B4C',
    fontFamily: 'System',
    fontSize: 12,
    paddingLeft: 12
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    flexGrow: 1,
    alignSelf: 'center',
    width: 256,
    height: 130,
    },
})

export default styles
