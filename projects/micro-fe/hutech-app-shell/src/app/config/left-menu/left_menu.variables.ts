import { PROJECT_DEMO_PRODUCT_LEFT_MENU } from "./project-demo-product.left-menu"
import { PROJECT_KTKL_LEFT_MENU } from "./project-ktkl.left-menu"
import { PROJECT_NQLD_LEFT_MENU } from "./project-nqld.left-menu"

export const ACTION_LOCAL = [
  '1000'
]


export const NEW_MENU = [
  // --Region menu of host
  {
    icon: "fal fa-lg fa-fw fa-home",
    route: "/homepage",
    title: "Trang chủ",
    dataFilterTags: "Nội quy lao động",
    dataI18n: "Trang chủ",
    actionId: 20,
  },

  // --Region menu of mfe
  ...PROJECT_KTKL_LEFT_MENU,
  ...PROJECT_NQLD_LEFT_MENU,
  ...PROJECT_DEMO_PRODUCT_LEFT_MENU,
  // Other lefmenu route;
]
