let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.config.showDiff = true;
chai.config.includeStack = true;
chai.config.truncateThreshold = 0;

module.exports = () => {
    global.EC = protractor.ExpectedConditions;
    global.expect = chai.expect;
};