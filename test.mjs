import TestRunner from 'test-runner'
import assert from 'assert'
import translate from 'linguist'
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('Simple API usage', async function () {
  return new Promise((resolve, reject) => {
    translate('Hello', 'en', 'ru', result => {
      resolve('result received')
    })
  })
})

export default tom
