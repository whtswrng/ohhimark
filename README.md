## Oh, Hi Mark

CLI tool for finding "non-deterministic" failing tests.

## Note

This project is new, therefore some minor bugs could show up.

## Prerequisites

CLI have dependencies that require Node 6.9.0 or higher and tests which are using mocha runner.

## Installation

```bash
npm install -g ohhimark
```

## Usage

```bash
ohhimark <mocha_command> (10 <number of iterations>) (--async <async processing> (100 <spawn process treshhold in ms>))
   Options
       -h, --help              output usage information
   Usage
       ohhimark "mocha --opts ./mocha.opts"    #10x running tests and evaluate
       ohhimark "mocha --opts ./mocha.opts" 25     #25x running tests and evaluate
       ohhimark "mocha --opts ./mocha.opts" 25 --async 450     #25 running async tests, new process is spawning after 450 ms
```

## Documentation

```
ohhimark -h
```

## License

MIT

