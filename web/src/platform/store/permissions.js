export function checkLocationPermission(){
  return new Promise((resolve, reject) => {
    //TODO check browser Permission
    resolve(true);
  });
}

export function requestLocationPermission(){
  return new Promise((resolve, reject) => {
    //TODO start browser location permission request
    resolve(true);
  });

}

export default {
  checkLocationPermission,
  requestLocationPermission
};
