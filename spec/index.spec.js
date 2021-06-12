const request = require('request');

const server = require('../server');
const nock = require('nock');
const nockData = require('./nock-data');

const TEST_PORT = 3001;
// const chatAppClientTest = require('./public/js/chatAppClient');

// Use `nock` to prevent live calls to remote services
nock('https://nodejs.org')
    .persist(true)
    .get('/dist/index.json')
    .reply(200, nockData);

const context = {root: `http://localhost:${TEST_PORT}`};

describe('dependencies page', function() {
  beforeAll(() => {
    server.listen(TEST_PORT);
  });

  it('return a page with some elements', async function() {
    request.get(
        `${context.root}/dependencies`,
        function(error, response, body) {
          expect(response.statusCode).toBe(200);
          expect(html).toContain('bent');
          expect(html).toContain('express');
          expect(html).toContain('hbs');
          expect(html).toContain('semver');

          done();
        });
  });
});

/* tape('should get yoda chat', async function(t) {
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
*/
