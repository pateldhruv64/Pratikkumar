import express from 'express';
import {
  submitContactForm,
  getAllContacts,
  deleteContactMessage
} from '../controllers/contactController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// Public - user submits contact form
router.post('/', submitContactForm);

// Private - admin views all contact submissions
router.get('/', protect, getAllContacts);

// Private - delete a contact message by ID
router.delete('/:id', protect, deleteContactMessage);

export default router;
