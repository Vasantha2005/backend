const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");

// Import journalController and ensure you're using the correct method
const journalController = require("../controllers/journalController");

/**
 * @swagger
 * tags:
 *   name: Journals
 *   description: Travel journal management
 */

/**
 * @swagger
 * /api/journals:
 *   post:
 *     summary: Create a new journal entry
 *     tags: [Journals]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Journal created
 *       500:
 *         description: Server error
 */
router.post("/", upload.array("images", 5), journalController.createJournal);

/**
 * @swagger
 * /api/journals:
 *   get:
 *     summary: Get all journal entries
 *     tags: [Journals]
 *     responses:
 *       200:
 *         description: List of journals
 *       500:
 *         description: Server error
 */
router.get("/", journalController.getAllJournals);

/**
 * @swagger
 * /api/journals/recent:
 *   get:
 *     summary: Get the 3 most recent journal entries
 *     tags: [Journals]
 *     responses:
 *       200:
 *         description: List of 3 most recent journals
 *       500:
 *         description: Server error
 */
router.get("/recent", journalController.getRecentJournals); // New route for recent journals

module.exports = router;
