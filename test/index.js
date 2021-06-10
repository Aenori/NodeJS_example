const tape = require('tape');
const bent = require('bent');
const getPort = require('get-port');

const server = require('../index');
const nock = require('nock');
const nockData = require('./nock-data');
const getJSON = bent('json');
const getBuffer = bent('buffer');
const sinon = require('sinon');

const dbService = require('../services/dbService');
// const chatAppClientTest = require('./public/js/chatAppClient');

// Use `nock` to prevent live calls to remote services
nock('https://nodejs.org')
    .persist(true)
    .get('/dist/index.json')
    .reply(200, nockData);

const context = {};

tape('setup', async function(t) {
  const port = await getPort();
  context.server = server.listen(port);
  context.origin = `http://localhost:${port}`;

  t.end();
});

tape('should get dependencies', async function(t) {
  const html = (await getBuffer(`${context.origin}/dependencies`)).toString();
  t.equals(html.includes('bent'), true, 'should contain bent');
  t.equals(html.includes('express'), true, 'should contain express');
  t.equals(html.includes('hbs'), true, 'should contain hbs');
  t.equals(html.includes('semver'), true, 'should contain semver');

  t.end();
});

tape('should get yoda chat', async function(t) {
  const html = (await getBuffer(`${context.origin}/yodaChat`)).toString();
  t.equals(html.includes('body'), true, 'should contain body');
  t.equals(html.includes('socket.io'), true, 'should contain socket.io');

  t.end();
});

tape('should get minimum secure versions', async function(t) {
  const result = await getJSON(`${context.origin}/api/minimum-secure`);
  t.equals(result.v14.version, 'v14.4.0', ' v14 version should match');
  t.equals(result.v13.version, 'v13.8.0', 'v13 version should match');

  t.end();
});

tape('should get latest-releases', async function(t) {
  const result = await getJSON(`${context.origin}/api/latest-releases`);
  t.equals(result.v14.version, 'v14.9.0', 'v14 version should match');
  t.equals(result.v13.version, 'v13.14.0', 'v13 version should match');

  t.end();
});

tape('should return all formations', async function(t) {
  const html = (await getBuffer(`${context.origin}/formation`)).toString();
  t.equals(html.includes('Divination'), true, 'should contain Divination');

  t.end();
});

tape('should return a formation with sinon mock', async function(t) {
  sinon.stub(dbService, 'getFormation').callsFake(function(id, cb) {
    cb(
        null,
        {'id': 1, 'formateurId': 1, 'date': '20000101', 'sujet': 'Divination'},
    );
  });

  // restore original functionality
  const json = (await getBuffer(`${context.origin}/formation/1`)).toString();

  t.equals(
      json,
      '{"formation":{"id":1,"formateurId":1,"date":"20000101",' +
      '"sujet":"Divination"}}',
      'should return Divination',
  );

  sinon.assert.calledOnce(dbService.getFormation);
  dbService.getFormation.restore();

  t.end();
});

tape('should return a formation', async function(t) {
  const json = (await getBuffer(`${context.origin}/formation/1`)).toString();

  t.equals(
      json,
      '{"formation":{"id":1,"formateurId":1,"date":"20210501",' +
      '"sujet":"Divination"}}',
      'should return Divination',
  );
  t.end();
});

// chatAppClientTest.doTest();

tape('teardown', function(t) {
  nock.cleanAll();
  context.server.close();
  t.end();
});

tape.onFinish(() => process.exit(0));
