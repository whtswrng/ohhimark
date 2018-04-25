"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MochaReporter {
    constructor(errorSpecItems) {
        this.errorSpecItems = errorSpecItems;
    }
    printReport() {
        console.log('\n');
        this.errorSpecItems.forEach((spec) => {
            console.log(spec.fullTitle.bold.red);
            console.log(spec.err.message);
            console.log('\n');
        });
    }
}
exports.MochaReporter = MochaReporter;
//# sourceMappingURL=reporter.js.map