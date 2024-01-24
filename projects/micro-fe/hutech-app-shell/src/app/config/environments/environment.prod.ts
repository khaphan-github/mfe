export const environment = {
  production: true,
  domain: {
    apiAuth: 'https://api.hutech.edu.vn/authentication-v2/api/auth',
    apiNoiQuyLaoDong: 'https://api.hutech.edu.vn/api-nqld-v2/api'
  },
  developer: {
    username: "",
    password: "",
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
