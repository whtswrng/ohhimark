import {exec} from 'child_process';

export interface CmdOutput {
    stdout: string;
    stderr: string;
}

export interface MochaSpecItem {
    title: string;
    fullTitle: string;
    err: {
        message: string;
    };
}

export interface Result {
    stats: {
        failures: number;
    },
    tests: Array<MochaSpecItem>
}

export class MochaScriptRunner {

    private errorSpecs: Array<MochaSpecItem> = [];

    constructor(private script: string) {

    }

    public async run(): Promise<void> {
        const fullScriptWithReporter = `${this.script} -R json`;
        const response = await this.exec(fullScriptWithReporter);
        const result = JSON.parse(response.stdout) as Result;

        console.log('finish')
        this.parseErrors(result);
    }

    private parseErrors(result: Result): void {
        if(result.stats.failures >= 1) {
            const errors = result.tests.filter((spec) => Object.keys(spec.err).length > 0);
            this.errorSpecs.push(...errors);
        }
    }

    public getErrors(): Array<MochaSpecItem> {
        return this.errorSpecs;
    }

    private exec(scriptName: string): Promise<CmdOutput> {
        return new Promise((resolve, reject) => {
            exec(scriptName, {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
                if(stdout) {
                    return resolve({stdout, stderr});
                } else if(err) {
                    return reject(err);
                }
            });

        })
    }

}