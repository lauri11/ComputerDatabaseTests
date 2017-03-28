exports.config = {
    directConnect: true,

    seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl: 'http://computer-database.herokuapp.com/computers',

    capabilities: {
        browserName: 'chrome'
    },

    framework: 'custom',

    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        './../specs/*.feature'
    ],

    cucumberOpts: {
        require: ['./../specs/step_definitions/*.js'],
        tags: [],
        strict: true,
        format: ["json:./../reports/results.json", "pretty"],
        dryRun: false,
        compiler: []
    },

    onPrepare: function () {
        browser.manage().window().maximize(); // maximize the browser before executing the feature files
        browser.ignoreSynchronization = true;
    }
};
