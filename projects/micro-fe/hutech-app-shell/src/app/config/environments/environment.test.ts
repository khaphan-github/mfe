export const environment = {
  production: false,
  domain: {
    apiAuth: 'http://api.lamgigio.net/core-phan-quyen/api-authentication-v2/api/auth',
    // apiNoiQuyLaoDong: 'http://nqld.api.ttithutech.com/api'
    apiNoiQuyLaoDong: 'http://localhost:3000/api'
  },
  developer: {
    username: "NNV0050588",
    password: "123qwe@..",
  },
  storage: {
    cookies: {
      expireInSeconds: 3600 // 1 hour
    }
  },
  application: {
    http: {
      // http request timeout
      timeout: 30 * 1000 // 30 giây
    },
    metadata: {
      capcha: null,
      app: 'MOBILE_HUTECH',
      diuu: '123',
      key_option_xac_thuc: 'erp1',
    },
    ui: {
      pagingation: {
        pageSizeDefault: 10, // Số mục trên mỗi trang
        pageSizeOptions: [10, 20, 50, 100, 200], // Tùy chọn kích thước trang,
      },
    }
  }
};
