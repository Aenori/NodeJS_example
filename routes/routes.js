const express = require('express');
const router = new express.Router();
const appController = require('../controllers/appController.js');
const formationController = require('../controllers/formationController.js');

// Application Routes
router.get('/', appController.home);
router.get('/yodaChat', appController.yodaChat);
router.get('/dependencies', appController.dependencies);
router.get('/minimumSecure', appController.minimumSecurePage);
router.get('/latestReleases', appController.latestReleasesPage);

const formationRouter = new express.Router({mergeParams: true});

formationRouter.get('/', formationController.getAllFormations);
// NRO-example : le \d+ est une expression régulière (regexp pour les intimes)
//   dans le cas présent la route n'acceptera que des nombres
formationRouter.get('/:formationId(\\d+)/', formationController.getFormation);

router.use('/formation', formationRouter);

// API Routes
router.get('/api/minimum-secure', appController.minimumSecure);
router.get('/api/latest-releases', appController.latestReleases);

module.exports = router;
