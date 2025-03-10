const ContactMessage = require('../models/ContactMessage');

exports.getForm = (req, res) => {
  if (req.query.format === 'json') {
    return res.json({ message: "Contact form is not available in JSON format." });
  }
  res.render('contact', { title: "Contact" });
};

exports.submitForm = async (req, res) => {
  try {
    const { name, message } = req.body;
    const newMessage = new ContactMessage({ name, message });
    await newMessage.save();
    res.render('contact_success', { title: "Thank You", name });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
