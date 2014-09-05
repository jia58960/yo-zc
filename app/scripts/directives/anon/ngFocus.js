define(['../module'],
    function (directives) {
        directives.directive('ngFocus', function () {
            return {
                restrict: 'A',
                scope: false,
                require: 'ngModel',
                link: function (scope, elem, attrs, controller) {
                    controller.$focused = false;
                    elem.bind('focus', function(){
                        scope.$apply(function(){
                            controller.$focused = true;
                        });
                    }).bind('blur', function(){
                        scope.$apply(function(){
                            controller.$focused = false;
                        });
                    })
                }
            };
        });
    }
);