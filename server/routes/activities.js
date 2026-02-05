import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../data/activities.json');

const router = express.Router();

router.get('/', (req, res) => {
    // Read file on every request to ensure fresh data without server restart
    try {
        const data = fs.readFileSync(jsonPath, 'utf-8');
        const activities = JSON.parse(data);
        res.json(activities);
    } catch (error) {
        console.error("Error reading activities:", error);
        res.status(500).json({ error: "Failed to load activities" });
    }
});

export default router;
