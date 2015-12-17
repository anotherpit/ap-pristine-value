ap-pristine-value
=================

AngularJS directive that marks form field as [`$dirty`](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController#$dirty) only when its value differs from specified original one.

Why?
====

Default AngularJS behaviour is to mark form field (i.e. its [`ngModelController`](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController)) as `$dirty` once any slightest change occurs. And even if the field is then reverted back to its original value, the field stays `$dirty` and doesn't become `$pristine`.

There're numerous cases when we need `$dirty`/`$pristine` state to depend on comparison to the original value. That is what `ap-pristine-value` directive does.

Usage
=====

Just hang `ap-pristine-value` on form element (`ng-model` required) and pass it the original value to compare to.

```html
<form name="form">
    <dl>
        <dt>form.$pristine</dt><dd>{{form.$pristine}}</dd>
        <dt>form.$dirty</dt><dd>{{form.$dirty}}</dd>
    </dl>

    <input name="field" ng-model="value" ap-pristine-value="'123'" />
    <dl>
        <dt>form.field.$pristine</dt><dd>{{form.field.$pristine}}</dd>
        <dt>form.field.$dirty</dt><dd>{{form.field.$dirty}}</dd>
    </dl>
</form>
```

By default, values equality check is done with `angular.equals()`, but you
can set your own handler on `apPristineValue.config`:

```javascript
angular.module('myApp', ['ap-pristine-value'])
    .run(['apPristineValue.config', function(config) {
        config.equals = function equalsByValue(a, b) {
            return a === b;
        };
        config.equals = function neverEquals(a, b) {
            return false;
        };
    }]);
```
