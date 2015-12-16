describe('apPristineValue', function() {
    beforeEach(angular.mock.module('ap-pristine-value'));

    var scope;
    var elem;

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        elem = $compile('<form name="form"><input name="input" ng-model="value" ap-pristine-value="original" /></form>')(scope);
        scope.$digest();
    }));

    describe('ngModelController with apPristineValue directive', function() {
        it('should be $pristine when current value equals the original one', function() {
            scope.value = 'smth';
            scope.original = 'smth';
            scope.$digest();
            expect(scope.form.input.$dirty).to.equal(false);
            expect(scope.form.input.$pristine).to.equal(true);
        });

        it('should be $dirty when current value does not equal original one', function() {
            scope.value = 'smth';
            scope.original = 'else';
            scope.$digest();
            expect(scope.form.input.$dirty).to.equal(true);
            expect(scope.form.input.$pristine).to.equal(false);
        });

        it('should become $pristine after current value has been changed to the original one', function() {
            scope.value = 'smth';
            scope.original = 'else';
            scope.$digest();
            expect(scope.form.input.$dirty).to.equal(true);
            expect(scope.form.input.$pristine).to.equal(false);
            scope.value = 'else';
            scope.$digest();
            expect(scope.form.input.$dirty).to.equal(false);
            expect(scope.form.input.$pristine).to.equal(true);
        });

        it('should become $pristine after original value has been changed to equal the current one', function() {
            scope.value = 'smth';
            scope.original = 'else';
            scope.$digest();
            expect(scope.form.input.$dirty).to.equal(true);
            expect(scope.form.input.$pristine).to.equal(false);
            scope.original = 'smth';
            scope.$digest();
            expect(scope.form.input.$dirty).to.equal(false);
            expect(scope.form.input.$pristine).to.equal(true);
        });
    });

    describe('.config', function() {
        var config;

        beforeEach(inject(['apPristineValue.config', function(_config) {
            config = _config;
        }]));

        describe('.equals()', function() {
            it("should exist and be a function", function() {
                expect(!!config.equals).to.equal(true);
                expect(typeof config.equals).to.equal('function');
            });

            it("should be used for equality check by apPristineValue directive", function() {
                config.equals = function(a, b) {
                    return (a === 'smth' && b === 'else');
                };

                scope.value = 'smth';
                scope.original = 'else';
                scope.$digest();
                expect(scope.form.input.$dirty).to.equal(false);
                expect(scope.form.input.$pristine).to.equal(true);

                scope.value = 'smth';
                scope.original = 'smth';
                scope.$digest();
                expect(scope.form.input.$dirty).to.equal(true);
                expect(scope.form.input.$pristine).to.equal(false);
            });
        });
    })
});
