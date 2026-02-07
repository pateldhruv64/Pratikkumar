import express from 'express';
import { subscribeToNewsletter, getAllSubscribers } from '../controllers/newsletterController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/', subscribeToNewsletter);          // ✅ Public
router.get('/', protect, getAllSubscribers);      // ✅ Admin only

export default router;
