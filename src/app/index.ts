import * as progress from 'cli-progress';
import {ProgressBar} from "./progress-bar";
import {MochaScriptRunner} from "./script-runner";
import {MochaReporter} from "./reporter";


const scriptCommand = process.argv[2];
const cycleCount = (process.argv[3] || 10) as number;
const asyncProcessing = process.argv[4] === '--async';
const cycleSpawnCoefficientInMS = (process.argv[5] || 180) as number;
const showHelp = process.argv[2] === '--help' || process.argv[2] === '-h';

const progressBar = new ProgressBar(new progress.Bar({}, progress.Presets.shades_classic), cycleCount);
const scriptRunner = new MochaScriptRunner(scriptCommand, progressBar);


init();

async function init(): Promise<void> {
    if (!scriptCommand || showHelp) {
        printHelp();
    } else {
        progressBar.show();
        await start();
    }
}

async function start(): Promise<void> {
    try {
        await processCommandCycle();
        reportResult();
        process.exit(0);
    } catch (e) {
        handleError(e);
    }
}

async function processCommandCycle() {
    if (asyncProcessing) {
        await runAsyncCommandCycle();
    } else {
        await runSyncCommandCycle();
    }
}

async function runSyncCommandCycle(): Promise<any> {
    for (let i = 0; i < cycleCount; i++) {
        await scriptRunner.run();
    }
}

async function runAsyncCommandCycle(): Promise<any> {
    const promises = [];

    for (let i = 0; i < cycleCount; i++) {
        await waitFor(cycleSpawnCoefficientInMS);
        promises.push(scriptRunner.run().catch(handleError));
    }

    return Promise.all(promises);
}

function reportResult(): void {
    const reporter = new MochaReporter(scriptRunner.getErrors());
    reporter.printReport();
}

function handleError(err): void {
    console.log('\n');
    console.log(err);
    process.exit(1);
}

async function waitFor(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function printHelp(): void {
    console.log(`ohhimark <mocha_command> (10 <number of iterations>) (--async <async processing> (100 <spawn process treshhold in ms>))`);

    console.log(`   Options`);
    console.log(`       -h, --help              output usage information`);

    console.log(`   Usage`);
    console.log(`       ohhimark "mocha --opts ./mocha.opts"    #10x running tests and evaluate`);
    console.log(`       ohhimark "mocha --opts ./mocha.opts" 25     #25x running tests and evaluate`);
    console.log(`       ohhimark "mocha --opts ./mocha.opts" 25 --async 450     #25 running async tests, new process is spawning after 450 ms`);
}
