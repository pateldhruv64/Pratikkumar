import Newsletter from '../models/Newsletter.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
export const subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already subscribed.' });
    }

    const newEmail = new Newsletter({ email });
    await newEmail.save();

    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while subscribing.' });
  }
};

// @desc    Get all newsletter emails (admin only)
// @route   GET /api/newsletter
// @access  Private (admin)
export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscribers.' });
  }
};
