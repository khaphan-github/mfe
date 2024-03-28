export const GLOBAL_ENV = {
  authen: {
    useMockData: false, //api, constant
    autoLoginByMockUser: false,
  },
  application: {
    http: {
      timeout: 30 * 1000, // 30 giây
    },
    storage: {
      cookies: {
        expireInSeconds: 3600, // 1 hour
      },
    },
  },
};
