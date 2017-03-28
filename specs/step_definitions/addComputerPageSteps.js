let MainPage = require("./../../pages/MainPage"),
    AddComputerPage = require("./../../pages/AddComputerPage");

let mainPage = new MainPage(),
    addComputerPage = new AddComputerPage(),
    editComputerHeaderText = 'Edit computer',
    addComputerHeaderText = 'Add a computer',
    cancelButtonLabel = 'Cancel';

let myStepDefinitionsWrapper = function () {

    this.Then(/^I should see "([^"]*)" header$/, function (headerText, done) {
        expect(addComputerPage.pageHeading.getText()).to.eventually.equal(headerText).and.notify(done);
    });

    this.Then(/^I should see the following inputs with the following labels$/, function (table, done) {
        let expectedLabelsList = table.raw()[0];
        expect(addComputerPage.getInputsLabels(expectedLabelsList)).to.eventually.deep.equal(expectedLabelsList)
            .and.notify(done);
    });

    this.Then(/^I should see the following inputs displayed$/, function (table, done) {
        let inputLabels = table.raw()[0];
        expect(addComputerPage.getInputsBasedOnLabels(inputLabels)).to.eventually.deep.equal([true, true, true])
            .and.notify(done);
    });

    this.Then(/^I should see (Company) select$/, function (labelText) {
        return addComputerPage.companySelect.isDisplayed()
            .then(isDisplayed => expect(isDisplayed).to.equal(false))
            .then(() => addComputerPage.companySelectLabel.getText())
            .then(text => expect(text).to.equal(labelText))
    });

    this.Then(/^I should see (Create this computer|Cancel) button$/, function (buttonLabel, done) {
        if (buttonLabel == cancelButtonLabel) {
            expect(addComputerPage.cancelButton.isDisplayed()).to.eventually.equal(true)
                .and.notify(done);
        } else {
            expect(addComputerPage.createComputerButton.isDisplayed()).to.eventually.equal(true)
                .and.notify(done);
        }
    });

    this.When(/^I create a new computer with the following details$/, function (table) {
        let tableData = table.hashes()[0];
        return protractor.promise.all(addComputerPage.populateComputerDetails(tableData))
            .then(() => addComputerPage.submitNewComputerForm());
    });

    this.Given(/^I submit a new computer form$/, function () {
        return addComputerPage.submitNewComputerForm();
    });

    this.Then(/^I am on Edit computer page$/, function (done) {
        expect(addComputerPage.headingText).to.eventually.equal(editComputerHeaderText)
            .and.notify(done);
    });

    this.Then(/^I delete the selected computer$/, function () {
        return addComputerPage.deleteComputer();
    });

    this.When(/^I create a new computer but cancel saving$/, function (table) {
        let tableData = table.hashes()[0];
        return protractor.promise.all(addComputerPage.populateComputerDetails(tableData))
            .then(() => addComputerPage.clickCancelButton());
    });

    this.When(/^I create a computer without a required name filled in$/, function () {
        return addComputerPage.submitNewComputerForm();
    });

    this.Then(/^computer name input gets highlighted$/, function () {
        return addComputerPage.getComputerNameDivClass()
            .then(classText => {
                expect(classText.includes('error')).to.equal(true);
            });
    });

    this.Then(/^I am on Add computer page$/, function (done) {
        expect(addComputerPage.headingText).to.eventually.equal(addComputerHeaderText)
            .and.notify(done);
    });
};
module.exports = myStepDefinitionsWrapper;