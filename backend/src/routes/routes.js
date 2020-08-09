import express from 'express';

import auth from '../controllers/authenticate';
import { uploadImage } from '../controllers/s3';
import { API_VERSION } from '../config';

const router = express.Router();

/**
 * AUTHENTICATION
 */
router.get(`${API_VERSION}/auth/google`, auth.authenticateGoogle());

router.get(`${API_VERSION}/auth/google/callback`, auth.authenticateGoogleCallback());

router.get(`${API_VERSION}/auth/facebook`, auth.authenticateFacebook());

router.get(`${API_VERSION}/auth/facebook/callback`, auth.authenticateFacebook());

/**
 * S3 FILE STORAGE
 */
router.get(`${API_VERSION}/upload`, uploadImage());

module.exports = router;
