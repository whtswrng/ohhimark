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
const scriptCommand = process.argv[2];
const cycleCount = (process.argv[3] || 10);
const asyncProcessing = process.argv[4] === '--async';
const cycleSpawnCoefficientInMS = (process.argv[5] || 180);
const showHelp = process.argv[2] === '--help' || process.argv[2] === '-h';
const progressBar = new progress_bar_1.ProgressBar(new progress.Bar({}, progress.Presets.shades_classic), cycleCount);
const scriptRunner = new script_runner_1.MochaScriptRunner(scriptCommand, progressBar);
init();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!scriptCommand || showHelp) {
            printHelp();
        }
        else {
            progressBar.show();
            yield start();
        }
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield processCommandCycle();
            reportResult();
            process.exit(0);
        }
        catch (e) {
            handleError(e);
        }
    });
}
function processCommandCycle() {
    return __awaiter(this, void 0, void 0, function* () {
        if (asyncProcessing) {
            yield runAsyncCommandCycle();
        }
        else {
            yield runSyncCommandCycle();
        }
    });
}
function runSyncCommandCycle() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < cycleCount; i++) {
            yield scriptRunner.run();
        }
    });
}
function runAsyncCommandCycle() {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        for (let i = 0; i < cycleCount; i++) {
            yield waitFor(cycleSpawnCoefficientInMS);
            promises.push(scriptRunner.run().catch(handleError));
        }
        return Promise.all(promises);
    });
}
function reportResult() {
    const reporter = new reporter_1.MochaReporter(scriptRunner.getErrors());
    reporter.printReport();
}
function handleError(err) {
    console.log('\n');
    console.log(err);
    process.exit(1);
}
function waitFor(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
function printHelp() {
    console.log('help');
}
//# sourceMappingURL=index.js.map