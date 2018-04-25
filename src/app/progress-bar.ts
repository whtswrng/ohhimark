export class ProgressBar {

    constructor(private progressBar: any) {

    }

    public show(): void {
        this.progressBar.start(100, 0);
    }

    public increment(number: number): void {
        this.progressBar.update(number * 10);
    }

    public stop(): void {
        this.progressBar.stop();
    }

}