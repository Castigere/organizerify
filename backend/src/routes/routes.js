const express = require('express');

const router = express.Router();
const auth = require('../controllers/authenticate');
const { api } = require('../config/config');

/**
 * AUTHENTICATION
 */
router.get(`${api}/auth/google`, auth.authenticateGoogle());

router.get(`${api}/auth/google/callback`, auth.authenticateGoogle());

router.get(`${api}/auth/facebook`, auth.authenticateFacebook());

router.get(`${api}/auth/facebook/callback`, auth.authenticateFacebook());

module.exports = router;
