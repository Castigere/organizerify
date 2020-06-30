const express = require('express');

const router = express.Router();
const auth = require('../controllers/authenticate');
import { API_VERSION } from '../config';

/**
 * AUTHENTICATION
 */
router.get(`/auth/google`, auth.authenticateGoogle());

router.get(`/auth/google/callback`, auth.authenticateGoogle());

router.get(`}/auth/facebook`, auth.authenticateFacebook());

router.get(`/auth/facebook/callback`, auth.authenticateFacebook());

module.exports = router;
