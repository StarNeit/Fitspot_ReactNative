import * as Actions from '@shared/actions';
import CONSTS from '@utils/Consts';


export const loginWorkflow = (user) => {
  if (user.isVerified) {
    switch (user.userType) {
    case CONSTS.USER_TYPE.UNKNOWN:
      Actions.customerOnboarding();
      break;
    case CONSTS.USER_TYPE.TRAINER:
      Actions.trainerNotImplemented();
      break;
    case CONSTS.USER_TYPE.CUSTOMER:
      if (!user.customer || !user.customer.customerProfileReady) {
        Actions.customerOnboarding()
        return;
      }
      Actions.home();
      break;
    default:
      Actions.userLogin();
      break;
    }
  } else {
    Actions.userVerify();
  }
};
