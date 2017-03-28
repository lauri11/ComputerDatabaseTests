class SharedHeader {
    constructor() {
        this.titleHeading = element(by.css("header.topbar a"));
    }

    get headingText() {
        return this.titleHeading.getText()
            .then(headingText => {
                return headingText.trim();
            });
    }
}

module.exports = SharedHeader;