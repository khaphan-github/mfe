export const environment = {
  authen: {
    /** useMockData: Sử dụng mock data hay không? True: Có sử dụng (không gọi api)
     * autoLoginByMockUser: Khi start project lên để dev. Hệ thống sẽ tự login và vào trong luôn.
     */
    useMockData: false,
    autoLoginByMockUser: false,
  },
  domain: {
    main: '',
  },
  application: {
    appKey: '',
    appId: 0,
    http: {
      timeout: 0
    },
    reCapchaSecretKey: '',
    googleAuthClientID: '',
    facebookAuthSecretKey: '',
    storage: {
      cookies: {
        expireInSeconds: 0
      }
    },
  }
};
