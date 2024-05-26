import express from 'express';
import { getAnalyticsOfURL, getShortenURL, handleGenerateNewShortURL } from '../controllers/url.js';

const router = express.Router();

router.post('/url', handleGenerateNewShortURL)

router.get('/:shortId', getShortenURL)

router.get('/analytics/:shortId', getAnalyticsOfURL)

export default router