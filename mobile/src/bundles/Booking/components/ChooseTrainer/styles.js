import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    width: null,
    height: null,
    // backgroundColor: '#927562'
  },
  listStyle: {
    marginBottom: 52
  },
  listContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop:10,
  },
  sectionHeader: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width,
    height: 40
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    marginLeft: 25,
    marginRight: 6,
    backgroundColor: '#D5D3D9',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  sectionHeaderText: {
    flex: 2,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: "500",
    fontFamily: 'System',
    color: '#AFAFB3'
  },
  rowStyle: {
    margin: 3,
    width: (Dimensions.get('window').width - 20) / 3,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },

})

export default styles
