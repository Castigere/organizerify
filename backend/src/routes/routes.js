const express = require('express');

const router = express.Router();
const auth = require('../controllers/authenticate');
import { API_VERSION } from '../config';

/**
 * AUTHENTICATION
 */
router.get(`${API_VERSION}/auth/google`, auth.authenticateGoogle());

router.get(`${API_VERSION}/auth/google/callback`, auth.authenticateGoogle());

router.get(`${API_VERSION}/auth/facebook`, auth.authenticateFacebook());

router.get(`${API_VERSION}/auth/facebook/callback`, auth.authenticateFacebook());

module.exports = router;
