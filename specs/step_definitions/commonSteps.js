let myStepDefinitionsWrapper = function () {
    this.Given(/^I navigate to Computers main page$/, function () {
        return browser.get("/");
    });
};
module.exports = myStepDefinitionsWrapper;