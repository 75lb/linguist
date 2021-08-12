import util from 'util'
import https from 'https'
import arrayify from 'array-back'

const yandex = {
  host: 'translate.yandex.net',
  path: '/api/v1.5/tr.json/translate?key=%s&lang=%s-%s&%s'
}

async function translate (text, from, to, done, apiKey) {
  apiKey = apiKey || 'trnsl.1.1.20140204T101704Z.39bc6456ed6dc4d1.d62d26300c4ce6052906183c5e8b47de9a04b47f'
  text = arrayify(text)
  const url = util.format(
    'https://%s%s',
    yandex.host,
    util.format(
      yandex.path, apiKey, from, to,
      text.map(function (t) { return 'text=' + t }).join('&')
    )
  )
  https.get(url, function (response) {
    let json = ''
    response.setEncoding('utf-8')
    response.on('data', function (chunk) {
      json += chunk
    })
    response.on('end', function () {
      done(JSON.parse(json))
    })
  }).on('error', function (err) {
    console.log('Request error: ' + err.message)
  })
}

export default translate
