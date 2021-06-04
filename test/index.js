const tape = require('tape')
const bent = require('bent')
const getPort = require('get-port')

const server = require('../index')
const nock = require('nock')
const nockData = require('./nock-data')
const getJSON = bent('json')
const getBuffer = bent('buffer')

// Use `nock` to prevent live calls to remote services
nock('https://nodejs.org')
  .persist(true)
  .get('/dist/index.json')
  .reply(200, nockData)

const context = {}

tape('setup', async function (t) {
  const port = await getPort()
  context.server = server.listen(port)
  context.origin = `http://localhost:${port}`

  t.end()
})

tape('should get dependencies', async function (t) {
  const html = (await getBuffer(`${context.origin}/dependencies`)).toString()
  t.equals(html.includes('bent'), true, 'should contain bent')
  t.equals(html.includes('express'), true, 'should contain express')
  t.equals(html.includes('hbs'), true, 'should contain hbs')
  t.equals(html.includes('semver'), true, 'should contain semver')

  t.end()
})

tape('should get minimum secure versions', async function (t) {
  const result = await getJSON(`${context.origin}/api/minimum-secure`)
  t.equals(result.v14.version, 'v14.4.0', ' v14 version should match')
  t.equals(result.v13.version, 'v13.8.0', 'v13 version should match')

  t.end()
})

tape('should get latest-releases', async function (t) {
  const result = await getJSON(`${context.origin}/api/latest-releases`)
  t.equals(result.v14.version, 'v14.9.0', 'v14 version should match')
  t.equals(result.v13.version, 'v13.14.0', 'v13 version should match')

  t.end()
})

tape('should return all formations', async function (t) {
  const html = (await getBuffer(`${context.origin}/formation`)).toString()
  t.equals(html.includes('Divination'), true, 'should contain Divination')

  t.end()
})

tape('should say bonjour', async function (t) {
  let html = (await getBuffer(`${context.origin}/bonjour?nom=Dupont`)).toString()
  t.equals(html.includes('Bonjour Dupont'), true, 'should say bonjour to Dupont')
  html = (await getBuffer(`${context.origin}/bonjour?nom=Martin`)).toString()
  t.equals(html.includes('Bonjour Martin'), true, 'should say bonjour to Martin')

  t.end()
})

tape('should say bienvenue a l etage', async function (t) {
  let html = (await getBuffer(`${context.origin}/ascenceur/1/etage`)).toString()
  t.equals(html.includes('Bienvenue au 1 eme etage !'), true, 'should go to first floor')
  html = (await getBuffer(`${context.origin}/ascenceur/0/etage`)).toString()
  t.equals(html.includes('Bienvenue au 0 eme etage !'), true, 'should go to 0 floor')

  t.end()
})

tape('teardown', function (t) {
  nock.cleanAll()
  context.server.close()
  t.end()
})

tape.onFinish(() => process.exit(0))
