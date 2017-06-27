import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_ORANGE_COLOR} from '@theme/colors'
import {FONT_DAYTONA_BOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-around',
    alignItems: 'center',
    width: null,
    height: null,
  },
  headerText: {
    fontFamily: FONT_DAYTONA_BOLD,
    fontSize: 14,
    marginTop: 35,

  },
  okText: {
    fontFamily: 'System',
    fontSize: 11,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#5A5A5A',
    marginTop: 55,
    width: 200,
    textAlign: 'center',
    marginBottom: 50
  },
  textInput: {
    height: 60,
    width: 250,
    color: '#5a5a5a',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'center'
  },
  registerButton: {
    height: 50,
    width: 256,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 35
  },
  registerButtonText: {
    fontSize: 12,
    color: DEFAULT_GREEN_COLOR,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },

});

export default styles
