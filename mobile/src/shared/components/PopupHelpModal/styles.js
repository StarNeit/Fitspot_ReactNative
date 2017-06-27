
import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import { FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_FAT,FONT_DAYTONA_REG } from '@theme/fonts'

const styles = StyleSheet.create({
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
  modalHelpText:{
    alignSelf: 'center',
    fontSize: 10,
    color: '#999'
  },
  modalLargeNumber: {
    fontFamily: FONT_DAYTONA_FAT,
    fontSize: 36,
    color: DEFAULT_GREEN_COLOR,
  },
  modalTitle:{
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
})

export default styles
