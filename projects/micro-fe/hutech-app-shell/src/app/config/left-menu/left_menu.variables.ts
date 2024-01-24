import { PROJECT_KTKL_LEFT_MENU } from "./project-ktkl.left-menu"
import { PROJECT_NQLD_LEFT_MENU } from "./project-nqld.left-menu"

export const ACTION_LOCAL = [
  '1000'
]


export const NEW_MENU = [
  {
    icon: "fal fa-lg fa-fw fa-home",
    route: "/",
    title: "Trang chủ",
    dataFilterTags: "Nội quy lao động",
    dataI18n: "Trang chủ",
    actionId: '1000'
  },
  // --Region menu of mfe
  ...PROJECT_KTKL_LEFT_MENU,
  ...PROJECT_NQLD_LEFT_MENU,
]
