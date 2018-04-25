import {MochaSpecItem} from "./script-runner";
import * as colors from 'colors';

export class MochaReporter {

    constructor(private errorSpecItems: Array<MochaSpecItem>) {

    }

    public printReport(): void {
        console.log('\n');
        this.errorSpecItems.forEach((spec) => {
            console.log(spec.fullTitle.bold.red);
            console.log(spec.err.message);
            console.log('\n');
        });
    }

}