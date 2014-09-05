define(['controllers/module'],
    function(services){
        "use strict";
        services.run(['$httpBackend', '$log', function ($httpBackend, $log){
            console.log('secureMock');

            var userStorage = angular.fromJson(localStorage.getItem('userStorage')),
                emailStorage = angular.fromJson(localStorage.getItem('emailStorage')),
             realNameStorage = angular.fromJson(localStorage.getItem('realNameAuth'));

            if (realNameStorage === null) {
                realNameStorage = {
                    'demo': { userName:'demo', realName: '张佳', ID: '430726198903261825'}
                };

                localStorage.setItem('realNameStorage', angular.toJson(realNameStorage));
            }

            $httpBackend.when('POST', '/realNameAuth').respond(function (method, url, data, headers) {

                $log.info(method, '->>', url);

                var postData = angular.fromJson(data),
                    user = realNameStorage[postData.userName];

                if (angular.isDefined(user)) {
                    return [200, user, {}];
                } else {
                    return [200, null, {}];
                }
            });

            $httpBackend.when('POST', '/realNameAuthVertify').respond(function (method, url, data, headers){
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data),
                    errors = [];

                console.log(postData);

                if(postData.realName == '张佳') {
                    errors.push({ field: 'realName', name: 'used' });
                }

                if (errors.length) {
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    return [200, {}, {}];
                }

            });

            $httpBackend.when('POST', '/modifyLoginPwd').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data),
                    errors=[];

                console.log(postData);

                if (userStorage[postData.userName].userPassword !== postData.currentPwd) {
                    errors.push({ field: 'currentPwd', name: 'used' });
                }

                if (postData.currentPwd == postData.newPassword) {
                    errors.push({ field: 'newPassword', name: 'used' });
                }
                if (errors.length) {
                    console.log('error');
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    userStorage[postData.userName].userPassword = postData.newPassword;
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }

            });

            $httpBackend.when('POST', '/modifyPayPwd').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data),
                    errors=[];

                console.log(postData);

                if (postData.currentPayPwd !== userStorage[postData.userName].userPassword) {
                    errors.push({ field: 'currentPayPwd', name: 'used' });
                }
                if (postData.currentPayPwd == postData.newPassword) {
                    errors.push({ field: 'newPassword', name: 'used' });
                }
                if (errors.length) {
                    console.log('error');
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    userStorage[postData.userName].userPassword = postData.newPassword;
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }

            });
            //修改手机号-验证当前手机
            $httpBackend.when('POST','/vertifyCurrentMobile').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data),
                    errors=[];

                console.log(postData);

                if (postData.vertifyCode !== '2048') {
                    errors.push({ field: 'vertifyCode', name: 'used' });
                }

                if (errors.length) {
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }

            });
            //修改手机号-验证新手机
            $httpBackend.when('POST','/vertifyNewMobile').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data),
                    errors=[];

                console.log(postData);

                if (postData.newMobileVertifyCode !== '4096') {
                    errors.push({ field: 'newMobileVertifyCode', name: 'used' });
                }

                if (errors.length) {
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }

            });
            //绑定手机号
            $httpBackend.when('POST','/bindMobile').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data),
                    errors=[];

                console.log(postData);

                if (postData.vertifyCode !== '1024') {
                    errors.push({ field: 'vertifyCode', name: 'used' });
                }

                if (errors.length) {
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }

            });
            //获得绑定邮箱信息
            $httpBackend.when('POST', '/getEmail').respond(function (method, url, data, headers) {

                $log.info(method, '->>', url);
                var postData = angular.fromJson(data);
                if (!angular.isDefined(postData.userName)) {
                    return [400, null, {}];
                }
                if (postData.userName == 'demo') {
                    console.log('bushi 200');
                    return [200, 'demo@demo.com', {}];
                } else {
                    return [200, null, {}];
                }
            });

            //绑定邮箱
            $httpBackend.when('POST','/bindEmail').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data),
                    errors=[];

                if (angular.isDefined(emailStorage[postData.email])) {
                    errors.push({ field: 'email', name: 'used' });
                }
                if (errors.length) {
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }
            });
            //绑定密保问题
            $httpBackend.when('POST','/bindSecret').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data);

                if(angular.isDefined(postData)) {
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }
            });
            //更换密保问题-验证当前密保
            $httpBackend.when('POST','/vertifyQes').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data),
                    errors=[];

                console.log(postData);

                if (postData.answer !== 'KRY') {
                    errors.push({ field: 'answer', name: 'used' });
                }

                if (errors.length) {
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }

            });
            //更换密保问题-设置新密保
            $httpBackend.when('POST','/changeSecret').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data);

                if (angular.isDefined(postData)) {
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }

            });
            //找回支付密码(重设支付密码)
            $httpBackend.when('POST','/retrievePayPwd').respond(function (method, url, data, headers) {
                $log.info(method, '->>', url);
                var postData = angular.fromJson(data),
                    errors=[];

                console.log(postData);

                if (postData.answer !== 'KRY') {
                    errors.push({ field: 'answer', name: 'used' });
                }

                if (errors.length) {
                    return [409, { valid: false, errors: errors }, {}];
                } else {
                    return [201, { valid: true, creationDate: Date.now() }, {}];
                }

            });

        }])
    }
);