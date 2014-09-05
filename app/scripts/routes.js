define(['./app','./services/anon/authService'], function(app) {
    'use strict';
    return app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider' , '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');
        // Public routes [role - *]
        $stateProvider
            .state('public', {
                abstract: true,
                data: {
                    roles: ['public']
                },
                templateUrl: "views/router.html"
            })
            .state('public.404', {
                url: '/404/',
                views:{
                    "body": {
                        templateUrl: 'views/404.html'
                    },
                    "footer":{
                        templateUrl: 'views/footer.html'
                    }
                }
            }).state('public.denied', {
                url: '/denied/',
                views:{
                    "body": {
                        templateUrl: 'views/denied.html'
                    },
                    "footer":{
                        templateUrl: 'views/footer.html'
                    }
                }
            });
        //login and register - [role - anon]
        $stateProvider
            .state('anon', {
                abstract: true,
                data: {
                    roles: ['public']
                },
                templateUrl: "views/router.html"
            })
            .state('anon.login', {
                url: '/login/',
                views:{
                    "body": {
                        templateUrl: 'views/login.html',
                        controller: 'loginCtrl'
                    },
                    "footer":{
                        templateUrl: 'views/footer2.html'
                    }
                }
            })
            .state('anon.register', {
                url: '/register/',
                views: {
                    "body": {
                        templateUrl: 'views/register.html',
                        controller: 'registerCtrl'
                    },
                    "footer":{
                        templateUrl: 'views/footer2.html'
                    }
                }
            });
        // Main routes - [role - user]
        $stateProvider
            .state('site', {
                abstract: true,
                /*resolve: {
                    authorize: ['authorization',
                        function(authorization) {
                            console.log(authorization.authorize());
                        }
                    ]
                },*/
                templateUrl: "views/router.html",
                controller: 'headerCtrl'
            })
            .state('site.index', {
                url: '/',
                views: {
                    "nav":{
                        templateUrl: 'views/nav.html',
                        controller: 'bodyCtrl'
                    },
                    "body": {
                        templateUrl: 'views/body.html',
                        controller: 'bodyCtrl'
                    },
                    "footer": {
                        templateUrl: 'views/footer.html'
                    }
                }
            })
            .state('site.list', {
                url:'/list/',
                views: {
                    "nav":{
                        templateUrl: 'views/nav.html'
                    },
                    "body": {
                        templateUrl: 'views/project/list.html'
                    },
                    "footer": {
                        templateUrl: 'views/footer.html'
                    }
                }
            })
            .state('site.help', {
                url:'/help/',
                views: {
                    "nav":{
                        templateUrl: 'views/nav.html'
                    },
                    "body": {
                        templateUrl: 'views/help/index.html'
                    },
                    "footer": {
                        templateUrl: 'views/footer2.html'
                    }
                }
            })
            .state('site.item', {
                url:'/item/',
                views: {
                    "nav":{
                        templateUrl: 'views/nav.html'
                    },
                    "body": {
                        templateUrl: 'views/project/item.html'
                    },
                    "footer": {
                        templateUrl: 'views/footer.html'
                    }
                }
            })
            /*网站-账户中心首页*/
            .state('site.account', {
                url:'/account/',
                data: {
                  roles: ['admin']
                },
                views: {
                    "nav":{
                        templateUrl: 'views/nav.html'
                    },
                    "body":{
                        templateUrl: 'views/account/index.html',
                        controller: 'accountCtrl'
                    },
                    "footer": {
                        templateUrl: 'views/footer.html'
                    }
                }
            })
            /*网站-账户中心-交易记录*/
            .state('site.account.transactionRecordsPage', {
                url:'transactionRecordsPage/',
                views : {
                    "account-page": {
                        templateUrl: 'views/account/transactionRecordsPage.html'
                    }
                }
            })
            /*网站-账户中心-充值提现*/
            .state('site.account.rechargeWithdrawPage', {
                url:'rechargeWithdrawPage/',
                views : {
                    "account-page": {
                        templateUrl: 'views/account/rechargeWithdrawPage.html'
                    }
                }
            })
            /*网站-账户中心-消息中心*/
            .state('site.account.innerMailPage', {
                url:'innerMailPage/',
                views : {
                    "account-page": {
                        templateUrl: 'views/account/innerMailPage.html'
                    }
                }
            })
            /*网站-账户中心-消息中心-消息详细*/
            .state('site.account.innerMailPage.detailMessagePage', {
                url:'detailMessagePage/',
                templateUrl: 'views/account/detailMessagePage.html'
            })
            /*网站-账户中心-提醒设置*/
            .state('site.account.remindSettingPage', {
                url:'remindSettingPage/',
                views : {
                    "account-page": {
                        templateUrl: 'views/account/remindSettingPage.html'
                    }
                }
            })
            /*网站-账户中心-安全中心*/
            .state('site.account.secure', {
                url:'secure/',
                templateUrl: 'views/account/secure.html',
                controller: 'secureCtrl'
            })
            /*网站-账户中心-安全-实名认证*/
            .state('site.account.secure.realNameAuth', {
                url:'realNameAuthPage/',
                templateUrl: 'views/account/secure/realNameAuthPage.html',
                controller: 'realNameAuthCtrl'

            })
            /*网站-账户中心-安全-财务交易验证*/
            .state('site.account.secure.setVerifyModePage', {
                url:'setVerifyModePage/',
                templateUrl: 'views/account/secure/setVerifyModePage.html',
                controller: 'setVerifyModeCtrl'

            })
            /*网站-账户中心-安全-修改登录密码*/
            .state('site.account.secure.modifyLoginPwdPage', {
                url:'modifyLoginPwdPage/',
                templateUrl: 'views/account/secure/modifyLoginPwdPage.html',
                controller: 'modifyLoginPwdCtrl'

            })
            /*网站-账户中心-安全-修改支付密码*/
            .state('site.account.secure.modifyPayPwd', {
                url:'modifyPayPwd/',
                templateUrl: 'views/account/secure/modifyPayPwdPage.html',
                controller: 'modifyPayPwdCtrl'

            })
            /*网站-账户中心-安全-找回支付密码*/
            .state('site.account.secure.retrievePayPwd', {
                url:'retrievePayPwd/',
                templateUrl: 'views/account/secure/retrievePayPwdPage.html',
                controller: 'retrievePayPwdCtrl'

            })
            /*网站-账户中心-安全-绑定手机号*/
            .state('site.account.secure.bindMobilePage', {
                url:'bindMobilePage/',
                templateUrl: 'views/account/secure/bindMobilePage.html',
                controller: 'bindMobileCtrl'
            })
            /*网站-账户中心-安全-更换手机号*/
            .state('site.account.secure.changeMobilePage', {
                url:'changeMobilePage/',
                templateUrl: 'views/account/secure/changeMobilePage.html',
                controller: 'changeMobileCtrl'
            })
            /*网站-账户中心-安全-绑定邮箱*/
            .state('site.account.secure.bindEmailPage', {
                url:'bindEmailPage/',
                templateUrl: 'views/account/secure/bindEmailPage.html',
                controller: 'bindEmailCtrl'

            })
            /*网站-账户中心-安全-启用密保*/
            .state('site.account.secure.setSecretQesPage', {
                url:'setSecretQesPage/',
                templateUrl: 'views/account/secure/setSecretQesPage.html',
                controller: 'setSecretCtrl'

            })
            /*网站-账户中心-安全-更改密保*/
            .state('site.account.secure.changeSecretQesPage', {
                url:'changeSecretQesPage/',
                templateUrl: 'views/account/secure/changeSecretQesPage.html',
                controller: 'changeSecretCtrl'

            });

            //admin router - [role - admin]
            $stateProvider
                .state('admin', {
                    abstract: true,
                    data: {
                        roles: ['admin']
                    },
                    templateUrl: "views/router.html"
                })
                .state('admin.admin', {
                    url: '/admin/',
                    data: {
                        roles: ['admin']
                    },
                    views: {
                        "nav":{
                            templateUrl: 'views/nav.html'
                        },
                        "body": {
                            templateUrl: 'views/admin.html'
                        },
                        "footer": {
                            templateUrl: 'views/footer2.html'
                        }
                    }

                });

        $urlRouterProvider.otherwise('404/');

        // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
        $urlRouterProvider.rule(function($injector, $location) {
            if($location.protocol() === 'file')
                return;

            var path = $location.path()
            // Note: misnomer. This returns a query object, not a search string
                , search = $location.search()
                , params
                ;

            // check to see if the path already ends in '/'
            if (path[path.length - 1] === '/') {
                return;
            }

            // If there was no search string / query params, return with a `/`
            if (Object.keys(search).length === 0) {
                return path + '/';
            }

            // Otherwise build the search string and return a `/?` prefix
            params = [];
            angular.forEach(search, function(v, k){
                params.push(k + '=' + v);
            });
            return path + '/?' + params.join('&');
        });

        //$locationProvider.html5Mode(true);

        $httpProvider.interceptors.push(function(toaster, $q, $location) {
            return {
                'responseError': function(response) {
                    if(response.status === 401) {
                        $location.path('/login');
                        toaster.pop ('error','授权未通过！') ;
                    } else if( response.status === 403){
                        $location.path('/');
                        toaster.pop('error','拒绝请求！');
                    }
                    return $q.reject(response);
                }
            };
        });

    }]).run(['$rootScope','authService','toaster','$state', function($rootScope, authService, toaster, $state){

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            /*$rootScope.toState = toState;
            $rootScope.toStateParams = toParams;*/
            /*if (!authService.isInAnyRole(toState.data.roles)) {

                toaster.pop('error','你丫没权限进来！');

                event.preventDefault();

                if(fromState.url === '^') {

                    if(Auth.isLoggedIn()) {
                        console.log('jinrulalal');
                        $state.go('user.home');
                    } else {
                        $rootScope.error = null;
                        $state.go('anon.login');
                    }
                }
            }*/

        });
    }])
});