import * as config from '@config';

export const init = () => {
  return new Promise((resolve, reject) => {
    if (typeof FB !== 'undefined') {
      console.log('Facebook initialized');
      resolve();
    } else {
      window.fbAsyncInit = () => {
        FB.init({
          appId      : config.facebookAppId,
          cookie     : true,
          xfbml      : true,
          version    : 'v2.5'
        });
        console.log('Facebook init', config.facebookAppId);
        resolve();
      };
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  });
};

export const login = () => {
  console.log('Facebook login');
  return new Promise((resolve, reject) => {
    const options = {
      scope: config.facebookScopes,
    };

    FB.login((response) => {
      response.status === 'connected' ? resolve(response) : reject(response);
    }, options);
  });
};
