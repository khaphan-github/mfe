export const environment = {
  authen: {
    useMockData: true,//api, constant
    autoLoginByMockUser: true,
  },
  //tu dong login
  domain: {
    main: 'http://localhost:3000/api',
  },
  application: {
    appKey: 'MOBILE_HUTECH',
    appId: 8, // <-- ID from backend
    http: {
      timeout: 30 * 1000 // 30 giây
    },
    reCapchaSecretKey: '6LcRH0EUAAAAADIgNOVAUuaYVRNi6HfExT3sdr2F',
    googleAuthClientID: '886168325284-hd9f5k6s30htjvgmibcs6mh745c3r27a.apps.googleusercontent.com',
    facebookAuthSecretKey: 'cb59f8f5a689cb98c44289d1136b0c75',
    storage: {
      cookies: {
        expireInSeconds: 3600 // 1 hour
      }
    },
  }
};
