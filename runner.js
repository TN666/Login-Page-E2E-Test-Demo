#!/usr/bin/env node

const config = require('./configuration.js')
const createTestCafe = require('testcafe')
const yargs = require('yargs')
const fs = require('fs')
const fsPromises = fs.promises
const moment = require('moment')
const currentTime = new Date()
const logPath = `logs/${moment(currentTime).format('YYYYMMDD-HHmmss')}`
const argvs = yargs
  .options({
    account: {
      alias: 'a',
      describe: 'specify your Amazon account you wish to use',
      type: 'string'
    },
    password: {
      alias: 'p',
      describe: 'specify your Amazon password you wish to use',
      type: 'string'
    },
    browsers: {
      alias: 'b',
      describe: 'specify which browser(s) you wish to use, the default is every installed browsers',
      default: 'all',
      type: 'string'
    }
  })
  .version(false)
  .help()
  .wrap(yargs.terminalWidth())
  .argv

let logStream
let testCafe = null

if (argvs.account) {
  config.ACCOUNT = argvs.account
}
if (argvs.password) {
  config.PASSWORD = argvs.password
}

fsPromises.mkdir(logPath, { recursive: true })
  .then(() => {
    logStream = fs.createWriteStream(`${logPath}/report.html`)

    return createTestCafe('localhost', 1337, 1338)
  })
  .then(tc => {
    testCafe = tc

    return testCafe
      .createRunner()
      .src('tests/*.spec.js')
      .browsers(argvs.browsers)
      .screenshots(`${logPath}/screenshots`, true)
      .reporter(['list', {
        name: 'html',
        output: logStream
      }])
      .run()
  })
  .then(failedCount => {
    logStream.end()
    process.exit(failedCount > 0 ? 1 : 0)
  })
  .catch(err => {
    console.error(err)
    if (testCafe) { testCafe.close() }
    process.exit(1)
  })
