"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgressBar {
    constructor(progressBar, cycleCount) {
        this.progressBar = progressBar;
        this.cycleCount = cycleCount;
    }
    show() {
        this.progressBar.start(this.cycleCount, 0);
    }
    increment(number = 1) {
        this.progressBar.increment(number);
    }
    stop() {
        this.progressBar.stop();
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=progress-bar.js.map