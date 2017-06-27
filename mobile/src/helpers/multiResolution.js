import {PixelRatio, Dimensions} from 'react-native'

var {height, width} = Dimensions.get('window');

module.exports = {
  getCorrectFontSizeForScreen(currentFont, heightConst) {
    var widthConst = 320;
    var heightConst = 640;
    let devRatio = PixelRatio.get();
    let factor = (((width * devRatio) / widthConst) + ((height * devRatio) / heightConst)) / 2.0;
    let maxFontDifferFactor = 5; //the maximum pixels of font size we can go up or down
    if (factor <= 1) {
      return currentFont - maxFontDifferFactor * 0.3;
    } else if ((factor >= 1) && (factor <= 1.6)) {
      return currentFont - maxFontDifferFactor * 0.1;
    } else if ((factor >= 1.6) && (factor <= 2)) {
      return currentFont;
    } else if ((factor >= 2) && (factor <= 3)) {
      return currentFont + maxFontDifferFactor * 0.15;
    } else if ((factor >= 3.0) && (factor <= 3.7)) {
      return currentFont + maxFontDifferFactor * 0.35;
    } else {
      return currentFont + maxFontDifferFactor;
    }
  }
};
