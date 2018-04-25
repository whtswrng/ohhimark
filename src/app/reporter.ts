import {MochaSpecItem} from "./script-runner";
import * as colors from 'colors';
import * as Table from 'cli-table2';

export class MochaReporter {

    constructor(private errorSpecItems: Array<MochaSpecItem>) {

    }

    public printReport(): void {
        const table = new Table({
            head: ['Test', 'Error']
        });

        this.errorSpecItems.forEach((spec) => {
            table.push([spec.title, spec.err.message]);
        });

        console.log(table.toString());
    }

}