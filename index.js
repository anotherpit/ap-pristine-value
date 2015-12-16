'use strict';

var module = angular.module('ap-pristine-value', ['ng']);

/**
 * @ngdoc service
 * @name apPristineValue.config
 *
 * Configurable stuff
 *
 * @property {function(a:*,b:*):boolean}} [apPristineValue.config.equals=angular.equals]
 *          Equality check function used by apPristineValue directive
 */
module.factory('apPristineValue.config', function() {
    return {
        equals: angular.equals
    };
});

/**
 * @ngdoc directive
 * @name apPristineValue
 * @restrict CA
 * @requires ngModel
 *
 * Forces pristine state of ngModel when its value
 * equals specified etalon (typically, original) value.
 * This etalon value is available as ngModelController.$apPristineValue.
 * Equality check is done with apPristineValue.equals().
 *
 * @param {*} apPristineValue The etalon value
 */
module.directive('apPristineValue', ['apPristineValue.config', function(config) {
    return {
        restrict: 'CA',
        require: 'ngModel',
        link: function(scope, element, attributes, ngModelCtrl) {
            function check(value) {
                if (config.equals(value, ngModelCtrl.$apPristineValue)) {
                    ngModelCtrl.$setPristine();
                } else {
                    ngModelCtrl.$setDirty();
                }
            }
            scope.$watch(attributes.apPristineValue, function(value) {
                ngModelCtrl.$apPristineValue = angular.copy(value);
                check(ngModelCtrl.$modelValue);
            });
            ngModelCtrl.$parsers.push(function(value) {
                check(value);
                return value;
            });
            ngModelCtrl.$formatters.unshift(function(value) {
                check(value);
                return value;
            });
        }
    }
}]);



