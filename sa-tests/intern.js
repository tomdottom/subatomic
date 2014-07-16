// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
	// The port on which the instrumenting proxy will listen
	proxyPort: 9000,

	// A fully qualified URL to the Intern proxy
	proxyUrl: 'http://localhost:9000/',
    baseUrl: '/',

	// Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
	// specified browser environments in the `environments` array below as well. See
	// https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
	// https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
	// Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
	// automatically
	capabilities: {
		'selenium-version': '2.41.0',
        "record-video": false,
        "record-screenshots": false,
        "capture-html": false,
        "record-logs": false
	},

	// Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
	// OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
	// capabilities options specified for an environment will be copied as-is
	environments: [
		//{ browserName: 'internet explorer', version: ['6', '7', '8'], platform: 'Windows XP' },
		{ browserName: 'chrome', version: ['27', '28', '29', '30', '31', '32', '33', '34', '35'], platform: 'Windows XP' },
		{ browserName: 'firefox',
            version:['3.0', '3.5', '3.6', '4', '5', '6', '7', '8', '9', '10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25', '26','27', '28', '29', '30'],
            platform: 'Windows XP' },
		//{ browserName: 'internet explorer', version: ['8', '9', '10', '11'], platform: 'Windows 7' },
		//{ browserName: 'internet explorer', version: ['10'], platform: 'Windows 8' },
		//{ browserName: 'internet explorer', version: ['11'], platform: 'Windows 8.1' },
		//{ browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' }
		//{ browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
		//{ browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
		//{ browserName: 'firefox', version: '28', platform: [ 'OS X 10.9', 'Windows 7', 'Linux' ] },
		//{ browserName: 'chrome', version: '34', platform: [ 'OS X 10.9', 'Windows 7', 'Linux' ] },
		//{ browserName: 'safari', version: '6', platform: 'OS X 10.8' },
		//{ browserName: 'safari', version: '7', platform: 'OS X 10.9' }
	],

	// Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
	maxConcurrency: 1,

	// Name of the tunnel class to use for WebDriver tests
	tunnel: 'SauceLabsTunnel',

	// The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
	// loader
	useLoader: {
		'host-node': 'dojo/dojo',
		'host-browser': 'node_modules/dojo/dojo.js'
	},

	// Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
	// can be used here
	loader: {
		// Packages that should be registered with the loader in each testing environment
		packages: [ { name: 'subatomic', location: './src/subatomic.js' } ]
	},

	// Non-functional test suite(s) to run in each browser
	suites: [ 'sa-tests/hello' ],

	// Functional test suite(s) to run in each browser once non-functional tests are completed
	functionalSuites: [ /* 'myPackage/tests/functional' */ ],

	// A regular expression matching URLs to files that should not be included in code coverage analysis
	excludeInstrumentation: /^(?:tests|node_modules)\//
});
