"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgressBar {
    constructor(progressBar) {
        this.progressBar = progressBar;
    }
    show() {
        this.progressBar.start(100, 0);
    }
    increment(number) {
        this.progressBar.update(number * 10);
    }
    stop() {
        this.progressBar.stop();
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=progress-bar.js.map