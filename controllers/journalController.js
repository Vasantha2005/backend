const Journal = require("../models/journalModel");

// Create a new journal entry
const path = require("path");
const Journal = require("../models/Journal");

const createJournal = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    
    // If images are uploaded, we create an array of image URLs
    const imageUrls = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);

    const newJournal = await Journal.create({
      title,
      description,
      date,
      images: imageUrls, // Store the array of image URLs
    });

    res.status(201).json({
      message: "Journal entry created successfully",
      journal: newJournal,
      images: imageUrls, // Return the image URLs to the frontend
    });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all journal entries
const getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get 3 most recent journal entries
const getRecentJournals = async (req, res) => {
  try {
    const recentJournals = await Journal.findAll({
      limit: 3,
      order: [['createdAt', 'DESC']],
    });

    res.json(recentJournals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a journal entry by ID
const deleteJournal = async (req, res) => {
  try {
    const journalId = req.params.id;

    const deleted = await Journal.destroy({
      where: { id: journalId }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting journal:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createJournal,
  getAllJournals,
  getRecentJournals,
  deleteJournal, // Exported properly now
};
