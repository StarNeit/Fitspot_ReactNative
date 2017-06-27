var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  ToastAndroid,
  View,
} = ReactNative;

// var AndroidSegmented = require('react-native-segmented-android');
import { RadioButtons } from 'react-native-radio-buttons'
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;


type Props = {
  selectedIndex: int,
  color?: string,
  vals : Object,
  onChange: Function
}


var ReactNativeSegmentedExample = React.createClass({
  onSelectPosition:function(event){
    ToastAndroid.show('segment '+event.selected, ToastAndroid.SHORT)
  },
  render: function() {
    return (
      <View>
          <SegmentedControls
            options={ vals }
            onSelection={ props.onChange }
            selectedIndex={ props.selectedIndex }
          />
          {/* <AndroidSegmented
            tintColor={['#ff0000','#ffffff']}
            style={{width:deviceWidth,height:60,backgroundColor:'#fff000',
                  justifyContent: 'center',
                  alignItems: 'center'}}
            childText={['One','Two','Three','Four',"Five"]}
            orientation='horizontal'
            selectedPosition={0}
            onChange={this.onSelectPosition} /> */}
        </View>
    );
  }
});
