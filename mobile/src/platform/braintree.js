import {NativeModules} from 'react-native';


export async function getPaymentInformation(clientToken) {
  var BrainTreePayManager = NativeModules.BrainTreePayManager;
  var paymentString = await BrainTreePayManager.getPaymentInfo(clientToken)
  
  return paymentString[0];
}

export default {
  getPaymentInformation
};
