"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const progress = require("cli-progress");
const progress_bar_1 = require("./progress-bar");
const script_runner_1 = require("./script-runner");
const reporter_1 = require("./reporter");
const mochaScript = process.argv[2];
start();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const runner = new script_runner_1.MochaScriptRunner(mochaScript);
        try {
            yield runAll(runner);
            const reporter = new reporter_1.MochaReporter(runner.getErrors());
            reporter.printReport();
            process.exit(0);
        }
        catch (e) {
            console.log(e);
            process.exit(1);
        }
    });
}
function runAll(runner) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        for (let i = 0; i < 10; i++) {
            yield waitFor(i * 100);
            promises.push(runner.run());
        }
        return Promise.all(promises);
    });
}
function waitFor(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
const bar1 = new progress.Bar({}, progress.Presets.shades_classic);
const progressBar = new progress_bar_1.ProgressBar(bar1);
progressBar.show();
//# sourceMappingURL=index.js.map