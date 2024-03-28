import { GLOBAL_ENV } from '@erp/angular/logic';

export const environment = {
  ...GLOBAL_ENV,
  authen: {
    useMockData: true, //api, constant
    autoLoginByMockUser: true,
  },
  //tu dong login
  domain: {
    main: '',
  },
  application: {
    appKey: '',
    appId: 0, // <-- ID from backend
    reCapchaSecretKey: '',
    googleAuthClientID: '',
    facebookAuthSecretKey: '',
  },
};
