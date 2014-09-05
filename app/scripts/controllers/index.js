/** attach controllers to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules
 * which avails each controller of, for example, the `config` constants object.
 **/
define([
    './bodyCtrl',
    './anon/headerCtrl',
    './anon/registerCtrl',
    './anon/loginCtrl',
    './account/accountCtrl',
    './account/secure/secureCtrl',
    './account/secure/realNameAuthCtrl',
    './account/secure/setVerifyModeCtrl',
    './account/secure/bindMobileCtrl',
    './account/secure/bindEmailCtrl',
    './account/secure/changeMobileCtrl',
    './account/secure/changeSecretCtrl',
    './account/secure/modifyLoginPwdCtrl',
    './account/secure/modifyPayPwdCtrl',
    './account/secure/setSecretCtrl',
    './account/secure/retrievePayPwdCtrl'
], function () {});
