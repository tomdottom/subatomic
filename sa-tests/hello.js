define([
    'intern!tdd',
    'intern/chai!assert',
    'src/subatomic'
], function (tdd, assert, subatomic) {
    with (tdd) {
        suite('tests.js.subatomic', function () {

            test('sucessful get request calls options success callback', function () {

                var dfd = this.async(5000);
                var success_func = dfd.callback(function() {
                });
                var error_func = dfd.callback(function() {
                    assert.fail('Should not have called error callback');
                });

                var time = new Date();
                var timestamp = '' + time.getSeconds() + time.getMilliseconds();
                subatomic.get({
                    //url: '//httpbin.org/get' + '?now=' + timestamp,
                    url: '//httpbin.org/get' + '?now=' + timestamp,
                    success: success_func
                }).error(error_func);
            });

            test('sucessful get request calls appended success callback', function () {

                var dfd = this.async(5000);
                var success_func = dfd.callback(function() {
                });
                var error_func = dfd.callback(function() {
                    assert.fail('Should not have called error callback');
                });

                var time = new Date();
                var timestamp = '' + time.getSeconds() + time.getMilliseconds();
                subatomic.get({
                    url: '//httpbin.org/get' + '?now=' + timestamp,
                    success: function() {}
                }).success(success_func).error(error_func);
            });

            test('second get request calls success callback', function () {

                var dfd = this.async(5000);
                var success_func = dfd.callback(function() {
                });
                var error_func = dfd.callback(function() {
                    assert.fail('Should not have called error callback');
                });

                // unfortunately these now params are needed to stop early ie
                // caching ie get requests
                var time = new Date();
                var timestamp = '' + time.getSeconds() + time.getMilliseconds();
                subatomic.get({url: '//httpbin.org/get' + '?now=' + timestamp })
                    .success( function() {
                        var time = new Date();
                        var timestamp = '' + time.getSeconds() + time.getMilliseconds();
                        subatomic.get({
                            url: '//httpbin.org/get' + '?now=' + timestamp
                        })
                        .success(success_func)
                        .error(error_func);

                    });
            });

            test('failed get request calls options error callback', function () {

                var dfd = this.async(5000);
                var success_func = dfd.callback(function() {
                    assert.fail('Should not have called success callback');
                });
                var error_func = dfd.callback(function() {
                });

                subatomic.get({
                    url: '//httpbin.org/status/404',
                    error: error_func
                })
                .success(success_func);
            });

            test('failed get request calls error function', function () {

                var dfd = this.async(5000);
                var success_func = dfd.callback(function() {
                    asssert.fail('Should not have called success callback');
                });
                var error_func = dfd.callback(function() {
                });

                subatomic.get({
                    url: '//httpbin.org/status/404',
                    error: function() {}
                })
                .success(success_func)
                .error(error_func);
            });

            test('successful post calls success callback', function () {

                var dfd = this.async(5000);
                var msg = 'one=testing';
                var success_func = dfd.callback(function(response) {
                    var expected_response = {
                        form: {
                            one: 'testing'
                        }
                    };
                    window.tmp = {};
                    window.tmp.response = response;
                    window.tmp.exresponse = expected_response;

                    if(window.JSON) {
                        if(response.form.one != expected_response.form.one) {
                            assert.fail('Expected response: ' + expected_response + ' but got: ' + response);
                        }
                    } else {
                        if( !response.match('testing' ) ) {
                            assert.fail('Expected response: ' + expected_response + ' but got: ' + response);
                        }
                    }
                });
                var error_func = dfd.callback(function() {
                    assert.fail('Should not have called error callback');
                });

                subatomic.post({
                    url: '//httpbin.org/post',
                    data: msg
                }).success(success_func)
                  .error(error_func);

            });

            test('failed post calls error callback', function () {
                var dfd = this.async(5000);
                var msg = 'one=test&two=test';
                var success_func = dfd.callback(function(response) {
                    assert.fail('Should not have called success callback');
                });
                var error_func = dfd.callback(function() {
                });

                subatomic.post({
                    url: '//httpbin.org/status/404',
                    data: msg
                }).success(success_func)
                  .error(error_func);

            });
        });
    }
});
