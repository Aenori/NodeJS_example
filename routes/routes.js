const express = require('express')
const router = express.Router()
const appController = require('../controllers/appController.js')
const formationController = require('../controllers/formationController.js')

// Application Routes
router.get('/', appController.home)
router.get('/dependencies', appController.dependencies)
router.get('/minimumSecure', appController.minimumSecurePage)
router.get('/latestReleases', appController.latestReleasesPage)

const formationRouter = express.Router({mergeParams: true})

formationRouter.get('/', formationController.getAllFormations)

// NRO-example : le \d+ est une expression régulière (regexp pour les intimes)
//   dans le cas présent la route n'acceptera que des nombres 
formationRouter.get('/:formationId(\\d+)/', formationController.getFormation)

router.use('/formation', formationRouter)

// API Routes
router.get('/api/minimum-secure', appController.minimumSecure)
router.get('/api/latest-releases', appController.latestReleases)

// TP
router.get('/helloWorld', appController.helloWorld)
//Exo1
router.get('/bonjour', formationController.bonjour)
//Exo2
router.get('/ascenseur/:nb(\\d+)/etage', formationController.getEtage) 
//Exo3
router.get('/ascenseur2/:nb2(\\d+)/etage', formationController.getEtage2)

module.exports = router
