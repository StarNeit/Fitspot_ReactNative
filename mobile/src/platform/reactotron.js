import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron
  .configure()
  .use(reactotronRedux())
  .connect();


export default Reactotron;
