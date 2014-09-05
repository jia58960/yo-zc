define(['../module'],
    function (directives) {
        directives.directive('remoteValidate', function () {
            return {
                restrict: 'A',
                scope: false,
                require: 'ngModel',
                link: function (scope, elem, attrs, controller) {
                    var invalidItems = [];
                    scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                        if (newValue) {
                            // Check the array of already-bad items
                            if (invalidItems.indexOf(newValue) !== -1) {
                                return controller.$setValidity(attrs.remoteValidate, false);
                            }
                            // When the model changes, it checks if the previous value was
                            // triggering the error from server-side
                            if (controller.$error[attrs.remoteValidate]) {
                                invalidItems.push(oldValue);
                            }
                            controller.$setValidity(attrs.remoteValidate, true);
                        }
                    });
                }
            };
        });
    }
);