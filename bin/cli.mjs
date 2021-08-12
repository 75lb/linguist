#!/usr/bin/env node

import translate from 'linguist'
import commandLineArgs from 'command-line-args'
import path from 'path'
import * as fs from 'fs'

function logError (msg) {
  console.error(msg)
}

try {
  var options = commandLineArgs([
    { name: 'from', alias: 'f', defaultValue: 'en' },
    { name: 'to', alias: 't', defaultValue: 'en' },
    { name: 'text', type: Array, defaultOption: true },
    { name: 'input', alias: 'i' },
    { name: 'output', alias: 'o' },
    { name: 'api-key', alias: 'k' },
    { name: 'help', type: Boolean, alias: 'h' }
  ])
} catch (err) {
  logError('Error: ' + err.message)
  process.exit(1)
}

const usage = "Usage: \n\
$ translate [--from <string>] [--to <string>] <text> <text> ...\n\
$ translate [--from <string>] [--to <string>] --input <filename> --output <filename>\n\
\n\
-f, --from        The language to translate from (default: 'en')\n\
-t, --to          The language to translate to (default: 'en')\n\
-i, --input       A valid JSON file to translate\n\
-o, --output      The output JSON file with input JSON values (but not keys) translated\n\
-k, --api-key     The Yandex API key to use, else use the built-in default.\n\
-h, --help        Print usage instructions\n\
\n\
for more information, visit https://github.com/75lb/linguist\n"

function translateObject (obj) {
  Object.keys(obj).forEach(function (word) {
    const text = obj[word]
    if (typeof text === 'string') {
      console.log('translating: ' + text)
      translate(text, options.from, options.to, function (translation) {
        if (translation.code === 200) {
          obj[word] = translation.text[0]
          fs.writeFileSync(output, JSON.stringify(input, null, '    '))
        } else {
          logError(translation.message)
          process.exit(1)
        }
      }, options['api-key'])
    } else {
      translateObject(obj[word])
    }
  })
}

if (options.help) {
  console.log(usage)
} else if (options.input && options.output && options.from && options.to) {
  var input = require(path.join(process.cwd(), options.input))
  var output = path.join(process.cwd(), options.output)

  translateObject(input)
} else if (options.from && options.to && options.text) {
  translate(options.text, options.from, options.to, function (translation) {
    if (translation.code === 200) {
      console.log(translation.text.join('\n'))
    } else {
      logError(translation.message)
    }
  }, options['api-key'])
} else {
  logError('Invalid usage.. ')
  console.log(usage)
}
