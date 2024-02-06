export const PROJECT_DEMO_PRODUCT_LEFT_MENU = [
  {
    icon: "fal fa-lg fa-fw fa-home",
    route: "/product",
    title: "Quản lý sản phẩm",
    dataFilterTags: "Remote",
    dataI18n: "Quản lý sản phẩm",
    actionId: '1000',
    children: [
      {
        icon: 'fal fa-id-card',
        route: '/product',
        title: 'Danh sách',
        dataFilterTags: 'Danh sách',
        dataI18n: 'Danh sách',
      },
      {
        icon: 'fal fa-id-card',
        route: '/product/category',
        title: 'Danh mục',
        dataFilterTags: 'Danh mục',
        dataI18n: 'Danh mục',
      },
    ]
  },
]
