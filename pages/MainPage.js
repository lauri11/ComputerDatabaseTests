class MainPage {
    constructor() {
        this.totalNumberHeading = $("#main h1");
        this.computersTable = $("table[class*='computers']");
        this.currentPaginationLinkTextPattern = /Displaying\s\d+\sto\s\d+\sof\s\d+/;
        this.filterInput = element(by.id("searchbox"));
        this.computerTableHeadingsList = $$("table[class*='computers'] th");
        this.filterButton = element(by.id("searchsubmit"));
        this.addNewComputerButton = element(by.id("add"));
        this.computersTable = element(by.css("table[class*='computers']"));
        this.paginationUl = element(by.css("#pagination ul"));
        this.previousPaginationLink = element(by.css("#pagination li[class*='prev']"));
        this.nextPaginationLink = element(by.css("#pagination li.next"));
        this.currentPaginationLink = element(by.css("#pagination li.current a"));
        this.computerNotificationMessageDiv = element(by.css("div[class='alert-message warning']"));
        this.computerTableColumns = {
            computerName: 0,
            introduced: 1,
            discontinued: 2,
            company: 3
        };
        this.testData = {
            computerOne: "AA",
            computerTwo: "A",
            computerThree: "AAA",
            computerFour: "0",
            computerFive: "-1"
        };
    }

    get totalComputersNumber() {
        return this.totalNumberHeading.getText()
            .then((text) => {
                return text.trim().split(" ")[0];
            });
    }

    isNumericTotalComputersNumber() {
        return this.totalComputersNumber
            .then((text) => {
                return this.isNumeric(text);
            });
    }

    get computerTableColumnTextList() {
        return this.computerTableHeadingsList.reduce((acc, element) => {
            return element.getText()
                .then(text => {
                    acc.push(text);
                    return acc;
                });
        }, []);
    }

    get computerTableColumnNumber() {
        return this.computerTableHeadingsList.count();
    }

    navigateToAddNewComputerPage() {
        return this.addNewComputerButton.click();
    }

    get computerNotificationMessageText() {
        return this.computerNotificationMessageDiv.getText()
            .then(text => {
                return text.trim();
            });
    };

    searchForComputer(computerName) {
        return this.filterInput.sendKeys(computerName)
            .then(() => {
                return browser.actions()
                    .sendKeys(protractor.Key.ENTER).perform();
            });
    }

    selectComputerByName(computerName) {
        let computerLinkByNameXpath = `//a[text()='${computerName}']`;
        return element.all(by.xpath(computerLinkByNameXpath)).first().click();
    };

    getComputerInfoByNameAndColumn(computerName, tableColumn) {
        return element(by.xpath(`//a[text()='${computerName}']`)).all(by.xpath("./../../td")).get(tableColumn).getText()
            .then(text => {
                return text.trim();
            });
    }

    getComputerInfoByName(computerName) {
        let keys = Object.keys(this.computerTableColumns);
        let elementArrayFinder = element(by.xpath(`//a[text()='${computerName}']`)).all(by.xpath("./../../td"));

        return protractor.promise.all(
            keys.map(el => {
                let webElement = elementArrayFinder.get(this.computerTableColumns[el]);
                return webElement.getText();
            })
        );
    }

    getComputerNameBeforeGivenOne(computerName) {
        return element(by.xpath(`//td/a[text()='${computerName}']/../../preceding-sibling::tr[1]//a`));
    }

    getComputerNameNextToGivenOne(computerName) {
        return element(by.xpath(`//td/a[text()='${computerName}']/../../following-sibling::tr[1]//a`));
    }

    isNumeric(num) {
        return !isNaN(num)
    }

}

module.exports = MainPage;