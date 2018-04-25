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
const child_process_1 = require("child_process");
class MochaScriptRunner {
    constructor(script) {
        this.script = script;
        this.errorSpecs = [];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const fullScriptWithReporter = `${this.script} -R json`;
            const response = yield this.exec(fullScriptWithReporter);
            const result = JSON.parse(response.stdout);
            console.log('finish');
            this.parseErrors(result);
        });
    }
    parseErrors(result) {
        if (result.stats.failures >= 1) {
            const errors = result.tests.filter((spec) => Object.keys(spec.err).length > 0);
            this.errorSpecs.push(...errors);
        }
    }
    getErrors() {
        return this.errorSpecs;
    }
    exec(scriptName) {
        return new Promise((resolve, reject) => {
            child_process_1.exec(scriptName, { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
                if (stdout) {
                    return resolve({ stdout, stderr });
                }
                else if (err) {
                    return reject(err);
                }
            });
        });
    }
}
exports.MochaScriptRunner = MochaScriptRunner;
//# sourceMappingURL=script-runner.js.map