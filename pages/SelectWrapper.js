class SelectWrapper {

    constructor(selectElement) {
        this.selectElement = selectElement;
    }

    selectItemByValue(valueToSet) {
        this.selectElement.click();

        if (valueToSet) {
            return this.selectElement.all(by.tagName("option"))
                .each(optionElement => {
                    return optionElement.getText()
                        .then(optionText => {
                            if (optionText == valueToSet) {
                                return optionElement.click();
                            }
                        })
                });
        }
    }
}

module.exports = SelectWrapper;