let moment = require('moment');

class Helper {

    constructor() {
        this.today = 'today';
    }

    replaceDatatableRowWithTodayFormatted(rowArray, formatString) {
        return rowArray.reduce((acc, cellData) => {
            if (cellData == this.today) {
                cellData = moment().format(formatString);
            }
            acc.push(cellData);
            return acc;
        }, []);
    }
}

module.exports = Helper;