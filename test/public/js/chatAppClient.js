const tape = require('tape');
const bent = require('bent');

// const nock = require('nock');
// const getJSON = bent('json');
const getBuffer = bent('buffer');
const sinon = require('sinon');

// const chatAppClient = require('../../../public/js/chatAppClient');

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
