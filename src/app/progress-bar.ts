export class ProgressBar {

    constructor(private progressBar: any, private cycleCount: number) {

    }

    public show(): void {
        this.progressBar.start(this.cycleCount, 0);
    }

    public increment(number: number = 1): void {
        this.progressBar.increment(number);
    }

    public stop(): void {
        this.progressBar.stop();
    }

}