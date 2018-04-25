import * as progress from 'cli-progress';
import {ProgressBar} from "./progress-bar";
import {MochaScriptRunner} from "./script-runner";
import {MochaReporter} from "./reporter";



const mochaScript = process.argv[2];



start();

async function start() {
    const runner = new MochaScriptRunner(mochaScript);
    try {
        await runAll(runner);
        const reporter = new MochaReporter(runner.getErrors());
        reporter.printReport();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

async function runAll(runner) {
    const promises = [];

    for(let i = 0; i < 10; i++) {
        await waitFor(i * 100);
        promises.push(runner.run());
    }

    return Promise.all(promises);
}

async function waitFor(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const bar1 = new progress.Bar({}, progress.Presets.shades_classic);

const progressBar = new ProgressBar(bar1);
progressBar.show();
