export const environment = {
  production: false,
  domain: {
    apiAuth: '',
    apiNoiQuyLaoDong: ''
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
      app: '',
      diuu: '',
      key_option_xac_thuc: '',
    },
    ui: {
      pagingation: {
        pageSizeDefault: 10, // Số mục trên mỗi trang
        pageSizeOptions: [10, 20, 50, 100, 200], // Tùy chọn kích thước trang,
      },
    }
  }
};
