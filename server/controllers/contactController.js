import Contact from '../models/Contact.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  const { name, email, number, message } = req.body;

  // Input validation
  if (!name || !email || !number || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  // Phone number validation
  const phoneStr = String(number).trim();
  if (phoneStr.length < 10 || phoneStr.length > 15) {
    return res.status(400).json({ message: 'Please enter a valid phone number.' });
  }

  try {
    const contact = new Contact({ name, email, number, message });
    await contact.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while submitting message.' });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (admin)
export const getAllContacts = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).lean();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages.' });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting message' });
  }
};