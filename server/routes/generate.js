
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv to read from .env in the root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE");

router.post('/', async (req, res) => {
    try {
        const { ageGroup, difficulty, topic, sensoryMode, attentionSpan } = req.body;

        // Construct the prompt based on user inputs
        // Note: We ask for JSON only to ensure easy parsing
        const prompt = `
        You are an assistant that creates autism-friendly quiz questions for children.
        
        Rules:
        - Use very simple language suitable for age ${ageGroup}
        - No metaphors, idioms, or abstract concepts
        - ${sensoryMode.includes('Minimal Text') ? 'Use extremely short sentences (max 5 words)' : 'Use simple sentences'}
        - One clear concept per question
        - Positive and encouraging tone
        - Output must be valid JSON array ONLY. No markdown formatting, no code blocks.

        Child details:
        - Age group: ${ageGroup}
        - Difficulty: ${difficulty}
        - Topic: ${topic}
        - Count: ${attentionSpan === 'Short' ? 5 : 10} questions

        Generate a JSON array of objects. Each object must have:
        - "id" (number)
        - "question" (string)
        - "options" (array of exactly 3 strings)
        - "correctAnswer" (string, must be one of the options)
        - "visualHint" (string, a short description of what a visual aid would look like, e.g., "A red apple")

        Example Output format:
        [
            {
                "id": 1,
                "question": "Which one is RED?",
                "options": ["Apple", "Grass", "Sky"],
                "correctAnswer": "Apple",
                "visualHint": "Red apple"
            }
        ]
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up markdown if model adds it
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const quiz = JSON.parse(text);

        res.json({ quiz });

    } catch (error) {
        console.error("GenAI Error:", error);
        res.status(500).json({
            error: "Failed to generate quiz",
            details: error.message
        });
    }
});

export default router;
