"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Table = require("cli-table");
class MochaReporter {
    constructor(errorSpecItems) {
        this.errorSpecItems = errorSpecItems;
    }
    printReport() {
        const table = new Table({
            head: ['Test', 'Error'],
            colWidths: [100, 200]
        });
        this.errorSpecItems.forEach((spec) => {
            table.push([spec.title, spec.err.message]);
        });
        console.log(table.toString());
    }
}
exports.MochaReporter = MochaReporter;
//# sourceMappingURL=reporter.js.map