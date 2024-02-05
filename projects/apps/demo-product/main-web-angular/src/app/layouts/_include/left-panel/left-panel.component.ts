
import { AfterViewInit, Component, OnInit, isDevMode } from '@angular/core';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { SmartAdminConfigService } from '@erp/angular/components';
/**
 * Cấu trúc của 1 menu trong left menu
 * @param icon: chứa tên class icon. Ví dụ: fa fa-edit
 * @param route: chứa route của menu
 * @param title: chứa tiêu đề của menu
 * @param dataFilterTags: chứa tag bộ lọc
 * @param dataI18n: chứa data của bỗ chuyển đổi đa ngôn ngữ
 * @param open: trạng thái menu có open hay không?
 * @param active: trạng thái menu có active hay không?
 * @param children: chứa các menu con của menu,
 * @param highligthMenu: Có phải menu mới hay không?. Nếu không sử dụng thì để rỗng hoặc không cần khai báo.
        * @Example "highligthMenu":{
                text: "layouts.leftPanel.web_nqld_quyen_mleft_noiquylaodong_text_new",
                css: "badge badge-danger"
            },
 */
interface MenuItem {
  icon: string;
  route?: string;
  title?: string;
  dataFilterTags?: string;
  dataI18n?: string;
  open?: boolean;
  acitve?: boolean;
  children?: MenuItem[];
  highligthMenu?: {
    text?: string;
    css?: string;
  }
}
@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})

export class LeftPanelComponent implements AfterViewInit, OnInit {

  // Đây là biến chưa danh sách menu của left panel
  public menuData: MenuItem[] = [];

  // Đây là biến lưu menu đang active ứng với url hiện tại
  activeMenuPath?: string;

  // user info
  userInfo: any;

  // Danh sách quyền menu của user
  myAuthMenu: any[] = [];

  // Domain đang xài
  domain: string = '';

  constructor(
    private smartAdminConfigService: SmartAdminConfigService,
    private location: Location,
    // private readonly panelService: PanelServiceService,
  ) { }

  ngOnInit() {

    // Lấy active menu hiện tại của left panel ứng với url hiện tại
    this.activeMenuPath = this.findActiveMenuPath(this.location.path());

    // Config open và active cho các menu left panel
    this.configInitLeftMenu(this.menuData);

    // Get my list action
    this.getMyActions();

  }

  ngAfterViewInit(): void {
    this.smartAdminConfigService.activeJsLeftPanel();
  }

  getMyActions() {
    this.myAuthMenu = []
  }

  checkActionMenu(actionId: any) {
    if (isDevMode()) {
      return true;
    }
    else {
      if (_.isNil(actionId)) {
        return true;
      }
      if (this.myAuthMenu.includes(actionId.toString())) {
        return true;
      }
      return false;
    }
  }

  getUrl(route: string) {
    if (route.startsWith('http')) {
      return route;
    }
    return this.domain + route;
  }


  // ngAfterContentChecked() {
  //   this.userInfo = this.panelService.getUserInfo();
  // }

  /**
   * Khởi tạo lại trạng thái open và active của left panel
   * @param menuData : danh sách menu item của left panel
   */
  configInitLeftMenu(menuData: MenuItem[]) {
    for (const menuItem of menuData) {
      if (this.isNotMenuActiveNow(menuItem) && this.isMenuActive(menuItem)) {
        _.assign(menuItem, { open: true });
      }
      if (this.isMenuActive(menuItem)) {
        _.assign(menuItem, { active: true });
      }
      if (menuItem.children) {
        this.configInitLeftMenu(menuItem.children);
      }
    }
  }



  /**
   * Tìm menu active trong left menu từ path cung cấp
   * @param menuItems : danh sách menu item của left panel
   * @param currentPath : đường dẫn cần kiểm tra
   * @returns : menu item nếu có trong left menu
   */
  findActiveParentPath(menuItems: MenuItem[], currentPath: string) {
    let activeParentPath = '';
    for (const menuItem of menuItems) {
      if (menuItem.route === currentPath) {
        return menuItem.route; // Trả về đường dẫn nếu nó nằm trong left menu
      }
      if (menuItem.children) {
        const parentPath = this.findActiveParentPath(menuItem.children, currentPath);
        if (parentPath) {
          activeParentPath = parentPath; // Lưu lại đường dẫn của menu cha nếu nó nằm trong left menu
          break; // Kết thúc vòng lặp nếu tìm thấy đường dẫn cha
        }
      }
    }
    return activeParentPath;
  }



  /**
   * Xử lý việc tìm menu active ở trong left menu ứng với menu hiện tại
   * @param currentPath : đường dẫn hiện tại
   * @returns : menu active tương ứng trong left menu
   */
  findActiveMenuPath(currentPath: string) {
    // Danh sách path đã được căt dựa kí tự '/'. Ví dụ path là: '/hello/3' thì array là: ['/hello', '/3']
    let pathSegments = this.convertPath(currentPath).split('/');
    let activeMenuPath = '';
    while (pathSegments.length > 0) {
      activeMenuPath = this.findActiveParentPath(this.menuData, pathSegments.join('/'));
      if (activeMenuPath) {
        break; // Kết thúc vòng lặp nếu tìm thấy đường dẫn cha trong left menu
      }
      pathSegments.pop(); // Loại bỏ phần tử cuối cùng của đường dẫn
    }
    return activeMenuPath;
  }


  /**
   * Xử lý việc chuyển đổi path loại bỏ kí tự đặc biệt
   * @param currentPath : đường dẫn hiện tại của trang
   * @returns : đường dẫn loại bỏ các kí tự đặc biệt
   */
  convertPath(currentPath: string) {
    const fixedPathRegex = /^(\/[\w-]+)+/;
    const fixedPathMatch = currentPath.match(fixedPathRegex);
    const activeMenuPath = fixedPathMatch ? fixedPathMatch[0] : '';
    return activeMenuPath;
  }


  /**
   * Xử lý việc kiểm tra xem menu item có là thuộc cây họ hàng của menu hiện tại không
   * @param menuItem : phần tử menu của left panel
   * @returns : true nếu nó là cha của menu đang active trong left panel, false nếu nó không thuộc
   */
  isMenuActive(menuItem: any): boolean {
    if (menuItem.route === this.activeMenuPath) {
      return true;
    }
    if (menuItem.children) {
      for (const child of menuItem.children) {
        if (this.isMenuActive(child)) {
          return true;
        }
      }
    }
    return false;
  }



  /**
   * Kiểm tra xem menu item có phải menu hiện tại không
   * @param menuItem : phần tử menu của left panel
   * @returns : true nếu là menu item đang active của left panel
  */
  isNotMenuActiveNow(menuItem: any): boolean {
    return menuItem.route != this.activeMenuPath;
  }


  /**
   * Kiểm tra xem menu có phải local của project không?
   * @param menuItem phần tử menu của left panel
   * @returns
   */
  checkIsLocalAction(menuItem: any) {
    if (!_.isNil(menuItem['isLocal']) && menuItem['isLocal'] == true) {
      return true;
    }
    return true;
  }
}

//https://fmoralesdev.com/2019/10/23/using-external-js-files-in-angular/
//https://www.c-sharpcorner.com/article/using-external-js-file-in-angular-app/
//https://codeburst.io/lazy-loading-external-javascript-libraries-in-angular-3d86ada54ec7
