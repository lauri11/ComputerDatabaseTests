let MainPage = require("./../../pages/MainPage"),
    SharedHeader = require("./../../pages/SharedHeader"),
    Hepler = require("./../../helper/Helper.js"),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    moment = require('moment');

chai.use(chaiAsPromised);
chai.config.showDiff = true;
chai.config.includeStack = true;
chai.config.truncateThreshold = 0;

let expect = chai.expect,
    mainPage = new MainPage(),
    sharedHeader = new SharedHeader(),
    helper = new Hepler();

let myStepDefinitionsWrapper = function () {

    this.Then(/^I should see (.*) app name in the header$/, function (appName, done) {
        expect(sharedHeader.headingText).to.eventually.equal(appName).and.notify(done);
    });

    this.Then(/^I should see a positive number as total number of computers$/, function (done) {
        expect(mainPage.isNumericTotalComputersNumber()).to.eventually.equal(true).and.notify(done);
    });

    this.Then(/^I should see Filter input$/, function (done) {
        expect(mainPage.filterInput.isDisplayed()).to.eventually.equal(true).and.notify(done);
    });


    this.Then(/^I should see Filter button$/, function (done) {
        expect(mainPage.filterButton.isDisplayed()).to.eventually.equal(true).and.notify(done);
    });

    this.Then(/^I should see Add new computer button$/, function (done) {
        expect(mainPage.addNewComputerButton.isDisplayed()).to.eventually.equal(true).and.notify(done);
    });

    this.Then(/^computers table should have the following header titles$/, function (table, done) {
        expect(mainPage.computerTableColumnTextList).to.eventually.deep.equal(table.raw()[0]).and.notify(done);
    });

    this.Then(/^I should see a computers table with (\d+) columns$/, function (columnsNumber, done) {
        expect(mainPage.computerTableColumnNumber).to.eventually.equal(Number.parseInt(columnsNumber)).and.notify(done);
    });

    this.Given(/^I navigate to Add a computer page$/, function () {
        return mainPage.navigateToAddNewComputerPage();
    });

    this.Then(/^I am on computers main page$/, function (done) {
        expect(mainPage.computersTable.isDisplayed()).to.eventually.equal(true)
            .and.notify(done);
    });


    this.Then(/^notification message saying (.*) is displayed$/, function (expectedMessage, done) {
        expect(mainPage.computerNotificationMessageText).to.eventually.equal(expectedMessage)
            .and.notify(done);
    });

    this.Then(/^(.*) computer appears in the computers table with the following data$/, function (computerName, table) {
        let tableData = table.rows()[0];
        tableData = helper.replaceDatatableRowWithTodayFormatted(tableData, 'DD MMM YYYY');

        return mainPage.searchForComputer(computerName)
            .then(() => {
                return (mainPage.getComputerInfoByName(computerName));
            })
            .then(textArr => {
                expect(textArr).to.deep.equal(tableData);
            });
    });

    this.Given(/^I search computer with (.*) name$/, function (computerName) {
        return mainPage.searchForComputer(computerName);
    });

    this.When(/^I select computer with (.*) name$/, function (computerName) {
        return mainPage.selectComputerByName(computerName);
    });

    this.Given(/^I save the total number of computers for later use$/, function () {
        return mainPage.totalComputersNumber
            .then(number => {
                this.computerNumber = Number.parseInt(number);
            });
    });

    this.Then(/^total number of computers should be increased by (\d+)$/, function (numberToIncrease) {
        return mainPage.totalComputersNumber
            .then(currentNumber => {
                expect(currentNumber - this.computerNumber).to.equal(Number.parseInt(numberToIncrease));
            });
    });

    this.Then(/^total number of computers should be equal to the one previously-saved$/, function () {
        return mainPage.totalComputersNumber
            .then(currentNumber => {
                expect(Number.parseInt(currentNumber)).to.equal(this.computerNumber);
            });
    });

    this.Then(/^I navigate to (.*) computer Edit page$/, function (computerName) {
        return mainPage.searchForComputer(computerName)
            .then(() => {
                return mainPage.selectComputerByName(computerName);
            });
    });

    this.Then(/^there is no notification message about a new computer's creation$/, function (done) {
        expect(mainPage.computerNotificationMessageDiv.isPresent()).to.eventually.equal(false)
            .and.notify(done);
    });

    this.Then(/^(.*) computer is shown in the table (after|before) computer (.*)$/, function (computerOne, beforeAfterIndicator, computerTwo) {
        switch (beforeAfterIndicator) {
            case "before":
                return mainPage.getComputerNameBeforeGivenOne(computerTwo).getText()
                    .then(actualPreviousComputerName => {
                        expect(actualPreviousComputerName).to.equal(computerOne);
                    });
            case "after":
                return mainPage.getComputerNameNextToGivenOne(computerTwo).getText()
                    .then(actualNextComputerName => {
                        expect(actualNextComputerName).to.equal(computerOne);
                    });
        }
    });
};
module.exports = myStepDefinitionsWrapper;