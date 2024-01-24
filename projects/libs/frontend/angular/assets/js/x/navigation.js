var myapp_config1;
// var myapp_config1 = {
//   /*
//   APP VERSION
//   */
//   VERSION: '4.5.1',
//   /*
//   SAVE INSTANCE REFERENCE
//   Save a reference to the global object (window in the browser)
//   */
//   root_: $('body'), // used for core app reference
//   root_logo: $('.page-sidebar > .page-logo'), // used for core app reference
//   /*
//   DELAY VAR FOR FIRING REPEATED EVENTS (eg., scroll & resize events)
//   Lowering the variable makes faster response time but taxing on the CPU
//   Reference: http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
//   */
//   throttleDelay: 450, // for window.scrolling & window.resizing
//   filterDelay: 150,   // for keyup.functions
//   /*
//   DETECT MOBILE DEVICES
//   Description: Detects mobile device - if any of the listed device is
//   detected a class is inserted to $.root_ and the variable thisDevice
//   is decleard. (so far this is covering most hand held devices)
//   */
//   thisDevice: null, // desktop or mobile
//   isMobile: (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())), //popular device types available on the market
//   mobileMenuTrigger: null, // used by pagescrolling and appHeight script, do not change!
//   mobileResolutionTrigger: 992, //the resolution when the mobile activation fires
//   /*
//   DETECT IF WEBKIT
//   Description: this variable is used to fire the custom scroll plugin.
//   If it is a non-webkit it will fire the plugin.
//   */
//   isWebkit: ((!!window.chrome && !!window.chrome.webstore) === true || Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 === true),
//   /*
//   DETECT CHROME
//   Description: this variable is used to fire the custom CSS hacks
//   */
//   isChrome: (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())),
//   /*
//   DETECT IE (it only detects the newer versions of IE)
//   Description: this variable is used to fire the custom CSS hacks
//   */
//   isIE: ((window.navigator.userAgent.indexOf('Trident/')) > 0 === true),
//   /*
//   DEBUGGING MODE
//   debugState = true; will spit all debuging message inside browser console.
//   */
//   debugState: true, // outputs debug information on browser console
//   /*
//   Turn on ripple effect for buttons and touch events
//   Dependency:
//   */
//   rippleEffect: true, // material design effect that appears on all buttons
//   /*
//   Primary theme anchor point ID
//   This anchor is created dynamically and CSS is loaded as an override theme
//   */
//   mythemeAnchor: '#mytheme',
//   /*
//   Activate last tab
//   Stores the last tab in localstorage and activates it
//   */
//   activateLastTab: true,
//   /*
//   Primary menu anchor point #js-primary-nav
//   This is the root anchor point where the menu script will begin its build
//   */
//   navAnchor: $('#js-primary-nav'), //changing this may implicate slimscroll plugin target
//   navHooks: $('#js-nav-menu'), //changing this may implicate CSS targets
//   navAccordion: true, //nav item when one is expanded the other closes
//   navInitalized: 'js-nav-built', //nav finished class
//   navFilterInput: $('#nav_filter_input'), //changing this may implicate CSS targets
//   navHorizontalWrapperId: 'js-nav-menu-wrapper',
//   /*
//   The rate at which the menu expands revealing child elements on click
//   Lower rate reels faster expansion of nav childs
//   */
//   navSpeed: 500, //ms
//   /*
//   Color profile reference hook (needed for getting CSS value for theme colors in charts and various graphs)
//   */
//   mythemeColorProfileID: $('#js-color-profile'),
//   /*
//   Nav close and open signs
//   This uses the fontawesome css class
//   */
//   navClosedSign: 'fal fa-angle-down',
//   navOpenedSign: 'fal fa-angle-up',
//   /*
//   Application icon prefix for error messages etc
//   other options are fad, fal, fas, far, ni
//   */
//   appIconPrefix: 'fal',
//   /*
//   App date ID
//   found inside the breadcrumb unit, displays current date to the app on pageload
//   */
//   appDateHook: $('.js-get-date'),
//   /*
//   * SaveSettings to localStorage
//   * DOC: to store settings to a DB instead of LocalStorage see below:
//   *    initApp.pushSettings("className1 className2") //sets value
//   *    var DB_string = initApp.getSettings(); //returns setting string
//   */
//   storeLocally: true,
//   /*
//   * Used with initApp.loadScripts
//   * DOC: Please leave it blank
//   */
//   jsArray: []
// };


/*!
* jQuery app.navigation v1.0.0
*
* Copyright 2019, 2020 SmartAdmin WebApp
* Released under Marketplace License (see your license details for usage)
*
* Publish Date: 2018-01-01T17:42Z
*/

(function ($) {

  /**
   * Menu Plugin
   **/
  $.fn.extend({

    /**
     * pass the options variable to the function
     *
     *   $(id).navigation({
     *       accordion: true,
     *       animate: 'easeOutExpo',
     *       speed: 200,
     *       closedSign: '[+]',
     *       openedSign: '[-]',
     *       initClass: 'js-nav-built'
     *   });
     *
     **/
    //tsandtm
    navigation: function (options) {

      var defaults = {
        accordion: true,
        animate: 'easeOutExpo',
        speed: 200,
        closedSign: '[+]',
        openedSign: '[-]',
        initClass: 'js-nav-built'
      },

        /**
         * extend our default options with those provided.
         **/
        opts = $.extend(defaults, options),

        /**
         * assign current element to variable, in this case is UL element
         **/
        self = $(this);
      console.log('!self.hasClass(opts.initClass--------', self);
      if (!self.hasClass(opts.initClass)) {

        /**
         * confirm build to prevent rebuild error
         **/
        self.addClass(opts.initClass);

        /**
         * add a mark [+] to a multilevel menu
         **/
        self.find("li").each(function () {
          if ($(this).find("ul").length !== 0) {

            /**
             * add the multilevel sign next to the link
             **/
            $(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");

            /**
             * avoid jumping to the top of the page when the href is an #
             **/
            if ($(this).find("a:first").attr('href') == "#") {
              $(this).find("a:first").click(function () {
                return false;
              });
            }
          }
        });

        /**
         * add open sign to all active lists
         **/
        self.find("li.active").each(function () {
          $(this).parents("ul")
            .parent("li")
            .find("a:first")
            .attr('aria-expanded', true)
            .find("b:first")
            .html(opts.openedSign);
        });

        /**
         * click events
         **/
        self.find("li a").on('mousedown', function (e) {

          if ($(this).parent().find("ul").length !== 0) {

            if (opts.accordion) {

              /**
               * do nothing when the list is open
               **/
              if (!$(this).parent().find("ul").is(':visible')) {

                parents = $(this).parent().parents("ul");
                visible = self.find("ul:visible");
                visible.each(function (visibleIndex) {
                  var close = true;
                  parents.each(function (parentIndex) {

                    if (parents[parentIndex] == visible[visibleIndex]) {

                      close = false;
                      return false;
                    }
                  });
                  if (close) {

                    if ($(this).parent().find("ul") != visible[visibleIndex]) {

                      $(visible[visibleIndex]).slideUp(opts.speed + 300, opts.animate, function () {
                        $(this).parent("li")
                          .removeClass("open")
                          .find("a:first")
                          .attr('aria-expanded', false)
                          .find("b:first")
                          .html(opts.closedSign);

                        if (myapp_config1.debugState)
                          console.log("nav item closed")
                      });
                    }
                  }
                });
              }
            }

            /**
             * Add active class to open element
             **/
            if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {

              $(this).parent().find("ul:first").slideUp(opts.speed + 100, opts.animate, function () {
                $(this).parent("li")
                  .removeClass("open")
                  .find("a:first")
                  .attr('aria-expanded', false)
                  .find("b:first").delay(opts.speed)
                  .html(opts.closedSign);

                if (myapp_config1.debugState)
                  console.log("nav item closed")
              });
            } else {
              $(this).parent().find("ul:first").slideDown(opts.speed, opts.animate, function () {

                $(this).parent("li")
                  .addClass("open")
                  .find("a:first")
                  .attr('aria-expanded', true)
                  .find("b:first").delay(opts.speed)
                  .html(opts.openedSign);

                if (myapp_config1.debugState)
                  console.log("nav item opened");

              });
            }
          }
        });

      } else {

        if (myapp_config1.debugState)
          console.log(self.get(0) + " this menu already exists");
      }

    },

    /**
     * DOC: $(id).destroy();
     **/
    navigationDestroy: function () {

      self = $(this);

      if (self.hasClass(myapp_config1.navInitalized)) {
        self.find("li").removeClass("active open");
        self.find("li a").off('mousedown').removeClass("active").removeAttr("aria-expanded").find(".collapse-sign").remove();
        self.removeClass(myapp_config1.navInitalized).find("ul").removeAttr("style");

        if (myapp_config1.debugState)
          console.log(self.get(0) + " destroyed");

      } else {
        console.log("menu does not exist")
      }


    }
  });

})(jQuery, window, document);


/**
 * checkNavigationOrientation by checking layout conditions
 * DOC: sometimes settings can trigger certain plugins; so we check this condition and activate accordingly
 * E.g: the fixed navigation activates custom scroll plugin for the navigation, but this only happens when
 *		it detects desktop browser and destroys the plugin when navigation is on top or if its not fixed.
  * @return {[type]}
  **/
checkNavigationOrientation = function checkNavigationOrientation() {

  /**
   * DOC: add the plugin with the following rules: fixed navigation is selected, top navigation is not active, minify nav is not active,
   * and the device is desktop. We do not need to activate the plugin when loading from a mobile phone as it is not needed for touch screens.
   **/
  switch (true) {

    case (myapp_config1.root_.hasClass('nav-function-fixed') && !myapp_config1.root_.is('.nav-function-top, .nav-function-minify, .mod-main-boxed') && myapp_config1.thisDevice === 'desktop'):

      /* start slimscroll on nav */
      if (typeof $.fn.slimScroll !== 'undefined') {
        myapp_config1.navAnchor.slimScroll({
          height: '100%',
          color: '#fff',
          size: '4px',
          distance: '4px',
          railOpacity: 0.4,
          wheelStep: 10
        });

        if (document.getElementById(myapp_config1.navHorizontalWrapperId)) {
          myapp_config1.navHooks.menuSlider('destroy');

          if (myapp_config1.debugState)
            console.log("----top controls destroyed");
        }

        if (myapp_config1.debugState)
          console.log("slimScroll created");

      } else {
        console.log("$.fn.slimScroll...NOT FOUND");
      }

      break;

    case (myapp_config1.navAnchor.parent().hasClass('slimScrollDiv') && myapp_config1.thisDevice === 'desktop' && typeof $.fn.slimScroll !== 'undefined'):

      /* destroy the plugin if it is in violation of rules above */
      myapp_config1.navAnchor.slimScroll({ destroy: true });
      myapp_config1.navAnchor.attr('style', '');

      /* clear event listners (IE bug) */
      events = jQuery._data(myapp_config1.navAnchor[0], "events");

      if (events)
        jQuery._removeData(myapp_config1.navAnchor[0], "events");

      if (myapp_config1.debugState)
        console.log("slimScroll destroyed");

      break;

  }

  switch (true) {


    /* fires when user switches to nav-function-top on desktop view */
    case ($.fn.menuSlider && myapp_config1.root_.hasClass('nav-function-top') && $("#js-nav-menu-wrapper").length == false && !myapp_config1.root_.hasClass('mobile-view-activated')):

      /* build horizontal navigation */
      myapp_config1.navHooks.menuSlider({
        element: myapp_config1.navHooks,
        wrapperId: myapp_config1.navHorizontalWrapperId
      });

      /* build horizontal nav */
      if (myapp_config1.debugState)
        console.log("----top controls created -- case 1");

      break;

    /* fires when user resizes screen to mobile size or app is loaded on mobile resolution */
    case (myapp_config1.root_.hasClass('nav-function-top') && $("#js-nav-menu-wrapper").length == true && myapp_config1.root_.hasClass('mobile-view-activated')):

      /* destroy horizontal nav */
      myapp_config1.navHooks.menuSlider('destroy');

      /* build horizontal nav */
      if (myapp_config1.debugState)
        console.log("----top controls destroyed -- case 2");

      break;

    /* fires when users switch off nav-function-top class */
    case (!myapp_config1.root_.hasClass('nav-function-top') && $("#js-nav-menu-wrapper").length == true):

      /* destroy horizontal nav */
      myapp_config1.navHooks.menuSlider('destroy');

      /* build horizontal nav */
      if (myapp_config1.debugState)
        console.log("----top controls destroyed -- case 3");

      break;

  }

};

/**
 * Activate Nav
 * DOC: activation should not take place if top navigation is on
 * @param  {[type]} id
 * @return {[type]} tsandtm
 **/
buildNavigation = function buildNavigation(id, _myapp_config1) {
  this.myapp_config1 = _myapp_config1;
  /**
   * build nav
   * app.navigation.js
   **/
  if ($.fn.navigation) {
    console.log('if ($.fn.navigation)', id)
    $(id).navigation({

      accordion: myapp_config1.navAccordion,
      speed: myapp_config1.navSpeed,
      closedSign: '<em class="' + myapp_config1.navClosedSign + '"></em>',
      openedSign: '<em class="' + myapp_config1.navOpenedSign + '"></em>',
      initClass: myapp_config1.navInitalized

    });

    return (id);
  } else {

    if (myapp_config1.debugState)
      console.log("WARN: navigation plugin missing");

  }
};

/**
 * Destroy Nav
 * @param  {[type]} id
 * @return {[type]}
 **/
destroyNavigation = function destroyNavigation(id) {

  /**
   * destroy nav
   * app.navigation.js
   **/
  if ($.fn.navigation) {

    $(id).navigationDestroy();

    return (id);
  } else {

    if (myapp_config1.debugState)
      console.log("WARN: navigation plugin missing");

  }
};



// console.log('initApp.buildNavigation(myapp_config1.navHooks)',myapp_config1.navHooks)
// initApp1.buildNavigation(myapp_config1.navHooks);
