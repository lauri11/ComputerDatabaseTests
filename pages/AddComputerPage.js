let SelectWrapper = require("./SelectWrapper.js"),
    moment = require('moment');

class AddComputerPage {

    constructor() {
        this.pageHeading = element(by.css("#main h1"));
        this.computerNameLabel = element(by.css("label[for='name']"));
        this.computerNameInput = element(by.id("name"));
        this.introducedDateLabel = element(by.css("label[for='introduced']"));
        this.introducedDateInput = element(by.id("introduced"));
        this.discontinuedDateLabel = element(by.css("label[for='discontinued']"));
        this.discontinuedDateInput = element(by.id("discontinued"));
        this.companySelectLabel = element(by.css("label[for='company']"));
        this.companySelect = element(by.id("company"));
        this.createComputerButton = element(by.css("input[value='Create this computer']"));
        this.deleteComputerButton = element(by.css("input[value='Delete this computer']"));
        this.cancelButton = element(by.xpath("//a[@class='btn'][text()='Cancel']"));
        this.computerNameDiv = element(by.xpath("//label[@for='name']/.."));
        this.selectWrapper = new SelectWrapper(this.companySelect);
        this.inputs = {
            "Computer name": "name",
            "Introduced date": "introduced",
            "Discontinued date": "discontinued",
            "Company": "company"
        }
    }

    get headingText() {
        return this.pageHeading.getText()
            .then(text => {
                return text.trim();
            })
    }

    getInputsBasedOnLabels(labelsArr) {
        return protractor.promise.all(
            labelsArr.map((label) => {
                let css = this.inputs[label];
                return element(by.id(css)).isDisplayed();
            })
        );
    }

    getInputsLabels(labelsArr) {
        return protractor.promise.all(
            labelsArr.map((label) => {
                return $(`label[for='${this.inputs[label]}']`).getText();
            })
        );
    }

    populateComputerDetailsFull(tableData) {
        if (this.containsAll(tableData.keys(), this.inputs.keys())) {
            this.setComputerName(tableData['Computer name']);
            this.setIntroducedDate(tableData['Introduced date']);
            this.setDiscontinuedDate(tableData['Discontinued date']);
            this.selectCompany(tableData['Company']);
        } else {
            throw "";
        }
    }

    populateComputerDetails(tableData) {
        let promisesArray = [];

        if (tableData['Computer name']) {
            promisesArray.push(this.setComputerName(tableData['Computer name']));
        }
        if (tableData['Introduced date']) {
            if (tableData['Introduced date'] == 'today') {
                let formattedToday = moment().format('YYYY-MM-DD');
                promisesArray.push(this.setIntroducedDate(formattedToday));
            } else {
                promisesArray.push(this.setIntroducedDate(tableData['Introduced date']));
            }
        }
        if (tableData['Discontinued date']) {
            promisesArray.push(this.setDiscontinuedDate(tableData['Discontinued date']));
        }
        if (tableData['Company']) {
            promisesArray.push(this.selectCompany(tableData['Company']));
        }

        return promisesArray;
    }

    setComputerName(computerName) {
        return this.computerNameInput.sendKeys(computerName);
    }

    setIntroducedDate(introducedDate) {
        return this.introducedDateInput.sendKeys(introducedDate);
    }

    setDiscontinuedDate(discontinuedDate) {
        return this.discontinuedDateInput.sendKeys(discontinuedDate);
    }

    selectCompany(companyName) {
        return this.selectWrapper.selectItemByValue(companyName);
    }

    submitNewComputerForm() {
        return this.createComputerButton.click();
    }

    deleteComputer() {
        return this.deleteComputerButton.click();
    }

    addNewComputer(name, introducedDate, discontinuedDate, company) {
        this.setComputerName(name);
        if (introducedDate) this.setIntroducedDate(introducedDate);
        if (discontinuedDate) this.setDiscontinuedDate(discontinuedDate);
        if (company) this.selectCompany(company);
        this.submitNewComputerForm()
    }

    clickCancelButton() {
        return this.cancelButton.click();
    }

    cancelCreatingComputer(name, introducedDate, discontinuedDate, company) {
        this.setComputerName(name);
        if (introducedDate) this.setIntroducedDate(introducedDate);
        if (discontinuedDate) this.setDiscontinuedDate(discontinuedDate);
        if (company) this.selectCompany(company);
        this.clickCancelButton();
    }

    getComputerNameDivClass() {
        return this.computerNameDiv.getAttribute("class");
    }

    containsAll(arr1, arr2) {
        if (arr1.length != arr2.length) {
            return false;
        } else {
            return arr1.every(element => {
                return arr2.includes(element);
            });
        }
    }
}

module.exports = AddComputerPage;