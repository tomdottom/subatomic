module.exports = function(grunt) {
    function genBrowsers(browsers) {
        var res = [];
        var browswers = browsers || [];
        browsers.forEach(function(b) {
            if(b.version instanceof Array) {
                b.version.forEach(function(v) {
                    res.push({
                        platform: b.platform,
                        browserName: b.browserName,
                        version: v
                    });
                });
            } else {
                res.push({
                    platform: b.platform,
                    browserName: b.browserName,
                    version: b.version
                });
            };
        });
        return res;
    };
    var compactBrowsers = [
        {
            platform: "Windows XP",
            browserName: "internet explorer",
            version: ["6","7","8"]
        }, {
            platform: "Windows XP",
            browserName: "chrome",
            version: ["35", "34", "33", "32", "31", "30", "29", "28", "27", "26"]
        }, {
            platform: "Windows XP",
            browserName: "firefox",
            version:  ["30", "29", "28", "27", "26", "25", "24", "23", "22",
                        "21", "20", "19", "18", "17", "16", "15", "14", "13",
                        "12", "11", "10", "9", "8", "7", "6", "5", "4", "3.6",
                        "3.5", "3.0" ]
        }, {
            platform: "Windows XP",
            browserName: "opera",
            version:  [ "12", "11"]
        }, {
            platform: "Windows 7",
            browserName: "internet explorer",
            version: ["8","9","10","11"]
        }, {
            platform: "Windows 7",
            browserName: "chrome",
            version: ["35", "34", "33", "32", "31", "30", "29", "28", "27", "26"]
        }, {
            platform: "Windows 7",
            browserName: "firefox",
            version:  ["30", "29", "28", "27", "26", "25", "24", "23", "22",
                        "21", "20", "19", "18", "17", "16", "15", "14", "13",
                        "12", "11", "10", "9", "8", "7", "6", "5", "4", "3.6",
                        "3.5", "3.0" ]
        }, {
            platform: "Windows 7",
            browserName: "opera",
            version:  [ "12", "11"]
        }, {
            platform: "Windows 8",
            browserName: "internet explorer",
            version: ["10"]
        }, {
            platform: "Windows 8",
            browserName: "chrome",
            version: ["35", "34", "33", "32", "31", "30", "29", "28", "27", "26"]
        }, {
            platform: "Windows 8",
            browserName: "firefox",
            version:  ["30", "29", "28", "27", "26", "25", "24", "23", "22",
                        "21", "20", "19", "18", "17", "16", "15", "14", "13",
                        "12", "11", "10", "9", "8", "7", "6", "5", "4", "3.6",
                        "3.5", "3.0" ]
        }, {
            platform: "Windows 8.1",
            browserName: "internet explorer",
            version: ["11"]
        }, {
            platform: "Windows 8.1",
            browserName: "chrome",
            version: ["35", "34", "33", "32", "31", "30", "29", "28", "27", "26"]
        }, {
            platform: "Windows 8.1",
            browserName: "firefox",
            version:  ["30", "29", "28", "27", "26", "25", "24", "23", "22",
                        "21", "20", "19", "18", "17", "16", "15", "14", "13",
                        "12", "11", "10", "9", "8", "7", "6", "5", "4", "3.6",
                        "3.5", "3.0" ]
        }, {
            platform: "OS X 10.6",
            browserName: "safari",
            version: ["5"]
        }, {
            platform: "OS X 10.6",
            browserName: "chrome",
            version: ["35", "34", "33", "32", "31", "30", "29", "28", "27"]
        }, {
            platform: "OS X 10.6",
            browserName: "firefox",
            version:  ["30", "29", "28", "27", "26", "25", "24", "23", "22",
                        "21", "20", "19", "18", "17", "16", "15", "14", "13",
                        "12", "11", "10", "9", "8", "7", "6", "5", "4"]
        }, {
            platform: "OS X 10.8",
            browserName: "safari",
            version: ["6"]
        }, {
            platform: "OS X 10.8",
            browserName: "chrome",
            version: ["35", "34", "33", "32", "31", "30", "29", "28", "27"]
        }, {
            platform: "OS X 10.9",
            browserName: "safari",
            version: ["7"]
        }, {
            platform: "OS X 10.9",
            browserName: "chrome",
            version: ["35", "34", "33", "32", "31"]
        }, {
            platform: "OS X 10.9",
            browserName: "firefox",
            version:  ["30", "29", "28", "27", "26", "25", "24", "23", "22",
                        "21", "20", "19", "18", "17", "16", "15", "14", "13",
                        "12", "11", "10", "9", "8", "7", "6", "5", "4"]
        }, {
            platform: "Linux",
            browserName: "chrome",
            version: ["35", "34", "33", "32", "31", "30", "29", "28", "27", "26"]
        }, {
            platform: "Linux",
            browserName: "firefox",
            version:  ["30", "29", "28", "27", "26", "25", "24", "23", "22",
                        "21", "20", "19", "18", "17", "16", "15", "14", "13",
                        "12", "11", "10", "9", "8", "7", "6", "5", "4", "3"]
        }, {
            platform: "Linux",
            browserName: "opera",
            version: ["12"]
        }
    ];
    var browsers = genBrowsers(compactBrowsers);


    grunt.initConfig({
        connect: {
            server: {
                options: {
                    base: "",
                    port: 9999
                }
            }
        },
        'saucelabs-mocha': {
            all: {
                options: {
                    urls: ["http://127.0.0.1:9999/sa-tests/subatomic-test.html"],
                    tunnelTimeout: 5,
                    build: process.env.TRAVIS_JOB_ID,
                    concurrency: 1,
                    testReadyTimeout: 20000,
                    detailedError: true,
                    browsers: browsers,
                    testname: "sobatomic.js tests" + new Date().toISOString(),
                    tags: ["master"]
                }
            }
        },
        watch: {}
    });

    // Loading dependencies
    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) {
            grunt.loadNpmTasks(key);
        };
    }

    grunt.registerTask("dev", ["connect", "watch"]);
    grunt.registerTask("test", ["connect", "saucelabs-mocha"]);
};
