define(['./module'],function (services) {
    'use strict';
    //Mock slowly net
    services/*.factory('delayHttp', ['$q', '$timeout', function ($q, $timeout) {
        return {
            request: function (request) {
                var delayedResponse = $q.defer();
                $timeout(function () {
                    delayedResponse.resolve(request);
                },500);
                return delayedResponse.promise;
            },
            response: function (response) {
                var deferResponse = $q.defer();

                if (response.config.timeout && response.config.timeout.then) {
                    response.config.timeout.then(function () {
                        deferResponse.reject();
                    });
                } else {
                    deferResponse.resolve(response);
                }

                return $timeout(function () {
                    deferResponse.resolve(response);
                    return deferResponse.promise;
                });
            }
        };
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('delayHttp');
        }])*/
        /*模拟登陆与注册*/
        .run(['$httpBackend', '$log', function ($httpBackend, $log) {

            var userStorage = angular.fromJson(localStorage.getItem('userStorage')),
                emailStorage = angular.fromJson(localStorage.getItem('emailStorage'));

            if (userStorage === null || emailStorage === null) {
                userStorage = {
                    'jia58960': { userName: 'jia58960', userPassword: '19893260', email: '547221469@demo.com', roles:['user']},
                    'demo': {  userName: 'demo', userPassword: '123456', email: 'demo@demo.com',roles:['admin']},
                    'test': {  userName: 'test', userPassword: '123456',email:'', roles:['user']}
                };
                emailStorage = {
                    '547221469@qq.com': 'jia58960',
                    'demo@qq.com': 'demo',
                    'test@test.com': 'test'
                };
                localStorage.setItem('userStorage', angular.toJson(userStorage));
                localStorage.setItem('emailStorage', angular.toJson(emailStorage));
            }

           $httpBackend.whenGET(/views/).passThrough();

            //fakeLogin
            $httpBackend.when('POST', '/login').respond(function (method, url, data, headers) {
                var postData = angular.fromJson(data),
                    user = userStorage[postData.userName];

                $log.info(method, '->>', url);
                //console.log(postData);
                //console.log(user);
                //return;
                if (angular.isDefined(user) && user.userPassword === postData.userPassword) {
                    localStorage.setItem('userStorage', angular.toJson(userStorage));
                    return [200, { userName: user.userName,roles: user.roles }, {}];
                } else {
                    return [401, '用户名或密码错误', {}];
                }
            });

            // fakeLogout
            $httpBackend.when('POST', '/logout').respond(function (method, url, data, headers) {

                $log.info(method, '->', url);

                return [200, {}, {}];
            });

            // fakeRegister
            $httpBackend.when('POST', '/register').respond(function (method, url, data, headers) {
                var postData = angular.fromJson(data),
                    newUser,
                    errors = [];
                $log.info(method, '->', url);

                if (angular.isDefined(userStorage[postData.userName])) {
                    errors.push({ field: 'userName', name: 'used' });
                }

                if (angular.isDefined(postData.email) && angular.isDefined(emailStorage[postData.email])) {
                    errors.push({ field: 'email', name: 'used' });
                }

                if (errors.length) {
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    newUser = angular.extend(postData, {});

                    userStorage[newUser.userName] = newUser;
                    emailStorage[newUser.email] = newUser.userName;
                    localStorage.setItem('userStorage', angular.toJson(userStorage));
                    localStorage.setItem('emailStorage', angular.toJson(emailStorage));
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }
            });

            //模拟后端邮箱验证
            $httpBackend.when('POST','/emailVertify').respond( function (method, url, data, headers) {
                $log.info(method, '->', url);
                console.log(data);
                return [200, {}, {}];
            });

            //模拟后端手机验证
            $httpBackend.when('POST','/mobileVertify').respond( function (method, url, data, headers) {
                $log.info(method, '->', url);
                console.log(data);
                return [200, {}, {}];


            });


        }])

});
