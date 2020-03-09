'use strict'

const cat = require('cat-names').random()
const adjectives = require('adjectives')
const logger = require('pino')()
const http = require('http')

const ping = `${
  adjectives[Math.floor(adjectives.length * Math.random())].replace(/^(.)/, (a, m) => m.toUpperCase())
} ${cat}\n`

const server = http.createServer((req, res) => {
  if (req.url === '/-/ping') {
    return res.end(ping)
  }

  logger.info(req)
  res.writeHead(200, {'content-type': 'application/json'})
  return res.end(JSON.stringify({
    message: `well hi ${req.url}`
  }))
})

server.listen(Number(process.env.PORT) || 8000, '127.0.0.1', () => {
  logger.info({...server.address(), message: 'listening'})
})
