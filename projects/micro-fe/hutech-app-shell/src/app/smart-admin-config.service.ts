import { Injectable } from '@angular/core';

declare let $: any, myapp_config: any, initApp: any;
@Injectable({
  providedIn: 'root'
})
export class SmartAdminConfigService {
  /**
   * Hàm kích hoạt Js cho app
   */
  activeJsAppComponent = () => {

    const newConfig = {
      root_: $(myapp_config["root_"]), // used for core app reference
      root_logo: $(myapp_config["root_logo"]), // used for core app reference
    };

    Object.assign(myapp_config, newConfig);

    /* =========   Do not change order   ==========*/
    /**
    * detect desktop or mobile
    **/
    initApp.addDeviceType();

    /**
     * detect Webkit Browser
     **/
    initApp.detectBrowserType();

    /**
     * check for mobile view width and add class .mobile-view-activated
     **/
    initApp.mobileCheckActivation();

    // initApp.windowScrollEvents();
  }

  /**
   * Hàm kích hoạt Js cho mem
   */
  activeJsMemComponent = () => {

    const newConfig = {
      navHooks: $(myapp_config["navHooks"]),
      navFilterInput: $(myapp_config["navFilterInput"]),
      navAnchor: $(myapp_config["navAnchor"]),
      appDateHook: $(myapp_config["appDateHook"]),
      mythemeColorProfileID: $(myapp_config["mythemeColorProfileID"]),
    };

    Object.assign(myapp_config, newConfig);

    /* =========   Do not change order   ==========*/

    initApp.blendColor();

    /**
      * d. run DOM misc functions
    **/
    initApp.domReadyMisc();

    /**
     * e. run app forms class detectors [parentClass,focusClass,disabledClass]
    **/
    initApp.appForms('.input-group', 'has-length', 'has-disabled');

    /**
     * @author Cường
     * 24/11/2023
     * f. Khởi động tooltips
     */
    initApp.tooltips();

    /**
     * @author Cường
     * 24/11/2023
     * g. Khởi động popovers
     */
    initApp.popovers();
  }


  /**
   * Hàm kích hoạt Js cho left panel
   */
  activeJsLeftPanel = () => {

    /**
    * b. build navigation
    **/
    initApp.buildNavigation(myapp_config.navHooks);

    /**
    * c. initialize nav filter
    **/
    initApp.listFilter(myapp_config.navHooks, myapp_config.navFilterInput, myapp_config.navAnchor);
  }

  /**
   * setting layout full giống kiểu của View Email
   */
  layoutComposed = () => {
    initApp.pushSettings("layout-composed", false);
  }
}
