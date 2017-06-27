import { Platform, PermissionsAndroid } from 'react-native';

export function checkLocationPermission(){
  return new Promise((resolve, reject) => {
    if(Platform.OS === 'android'){
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then(value => {
        resolve(value);
      });
    }else{
      //non android platform always true
      resolve(true);
    }
  });
}

export function requestLocationPermission(){
  return new Promise((resolve, reject) => {
    if(Platform.OS === 'android'){
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'FitSpot Location Permission',
          'message': 'FitSpot needs access to your location ' +
                     'so we can locate trainers and venues close to you.'
        }
      ).then(value => {
        let allowed = value === 'denied' ? false : value;
        resolve(allowed);
      })
      .catch(err => {
        reject(err);
      });
    }else{
      //non android platform always true
      resolve(true);
    }
  });

}

export default {
  checkLocationPermission,
  requestLocationPermission
};
