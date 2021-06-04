const express = require('express')
const router = express.Router()
const appController = require('../controllers/appController.js')
const formationController = require('../controllers/formationController.js')

// Application Routes
router.get('/', appController.home)
router.get('/dependencies', appController.dependencies)
router.get('/minimumSecure', appController.minimumSecurePage)
router.get('/latestReleases', appController.latestReleasesPage)

router.get('/bonjour', appController.bonjour)

router.get('/ascenceur/:nb(\\d+)/etage', appController.getEtageAscenceur)

router.get('/ascenceur2/:nb(\\d+)/etage', appController.getEtageAscenceur2)

const formationRouter = express.Router({mergeParams: true})

const formateurRouter = express.Router({mergeParams: true})

formationRouter.get('/', formationController.getAllFormations)

formateurRouter.get('/', formationController.getAllFormateurs)
// NRO-example : le \d+ est une expression régulière (regexp pour les intimes)
//   dans le cas présent la route n'acceptera que des nombres 
formationRouter.get('/:formationId(\\d+)/', formationController.getFormation)

router.use('/formation', formationRouter)
router.use('/formateur', formateurRouter)
// API Routes
router.get('/api/minimum-secure', appController.minimumSecure)
router.get('/api/latest-releases', appController.latestReleases)

module.exports = router
