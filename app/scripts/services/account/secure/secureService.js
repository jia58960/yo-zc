define(['../../module'],function (services) {
    "use strict";
    services.service('secureService', ['$http', function ($http) {
        console.log('secureService');

        return {
            getSecureData: function(para,success,error){
                var path = para.uid + '.json';
                $http.get('/mockData/account/secure/'+path).success(function(res) {
                    success(res);
                }).error(error);
            },

            getRealNameAuthData: function (user, success, error) {
                $http.post('/realNameAuth', user).success(function(res) {
                    success(res);
                }).error(error);
            },

            realNameAuthVertify: function (data, success, error) {
                $http.post('/realNameAuthVertify', data).success(function (res) {
                    success(res);
                }).error(error);
            },

            modifyLoginPwd: function(user, success, error) {
                $http.post('/modifyLoginPwd',user).success(function (res) {
                    success(res);
                }).error(error);
            },

            modifyPayPwd: function(user, success, error) {
                $http.post('/modifyPayPwd',user).success(function (res) {
                    success(res);
                }).error(error);
            },

            vertifyCurrentMobile: function(user, success, error){
                $http.post('/vertifyCurrentMobile',user).success(function (res) {
                    success(res);
                }).error(error);
            },

            vertifyNewMobile:function(user, success, error){
                $http.post('/vertifyNewMobile',user).success(function (res) {
                    success(res);
                }).error(error);
            },

            bindMobile:function(user, success, error) {
                $http.post('/bindMobile', user).success(function (res) {
                    success(res);
                }).error(error);
            },

            getEmailData:function (user, success, error) {
                $http.post('/getEmail', user).success(function(res) {
                    success(res);
                }).error(error);
            },

            bindEmail:function(email, success, error) {
                $http.post('/bindEmail', email).success(function (res) {
                    success(res);
                }).error(error);
            },

            bindSecret: function(secret, success, error) {
                $http.post('/bindSecret', secret).success(function (res) {
                    success(res);
                }).error(error);
            },

            vertifyQes: function(secret, success, error) {
                $http.post('/vertifyQes', secret).success(function (res) {
                    success(res);
                }).error(error);
            },

            changeSecret: function(secret, success, error) {
                $http.post('/changeSecret', secret).success(function (res) {
                    success(res);
                }).error(error);
            },

            retrievePayPwd: function(secret, success, error) {
                $http.post('/retrievePayPwd', secret).success(function (res) {
                    success(res);
                }).error(error);
            }
        }
    }])
});