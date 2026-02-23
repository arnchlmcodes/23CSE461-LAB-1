
import express from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv to read from .env in the root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const router = express.Router();

// Initialize Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "YOUR_API_KEY_HERE"
});

router.post('/', async (req, res) => {
    try {
        const { ageGroup, difficulty, topic, sensoryMode, attentionSpan, quizLength, learningStyle, questionType, supportLevel, specialInterests } = req.body;

        // Construct the prompt based on user inputs
        const prompt = `
        You are an expert educational assistant specializing in creating autism-friendly quiz questions for children.
        
        STRICT REQUIREMENTS:
        - Use very simple, clear language appropriate for age ${ageGroup}
        - NO metaphors, idioms, sarcasm, or abstract concepts
        - ${sensoryMode.includes('Minimal Text') ? 'Use extremely short sentences (max 5 words per sentence)' : 'Use simple, direct sentences'}
        - ${sensoryMode.includes('Large Text') ? 'Design for large text display' : ''}
        - ${sensoryMode.includes('High Contrast') ? 'Consider high contrast visual elements' : ''}
        - One clear concept per question
        - Positive, encouraging, and supportive tone
        - ${supportLevel === 'High Support' ? 'Provide extra clear instructions and simple language' : ''}
        - ${supportLevel === 'Independent' ? 'Can use slightly more complex language' : ''}
        - Output must be valid JSON array ONLY. No markdown formatting, no code blocks, no explanations.

        CHILD PROFILE:
        - Age: ${ageGroup} years old
        - Difficulty Level: ${difficulty}
        - Topic: ${topic}
        - Learning Style: ${learningStyle}
        - Question Type: ${questionType}
        - Quiz Length: ${quizLength} questions
        - Attention Span: ${attentionSpan}
        - Support Level: ${supportLevel}
        ${specialInterests ? `- Special Interests: ${specialInterests} (try to incorporate these when relevant)` : ''}
        - Sensory Preferences: ${sensoryMode.length > 0 ? sensoryMode.join(', ') : 'None specified'}

        CONTENT GUIDELINES:
        - ${learningStyle === 'Visual' ? 'Focus on visual descriptions and picture-based questions' : ''}
        - ${learningStyle === 'Auditory' ? 'Include sound-related questions and descriptions' : ''}
        - ${learningStyle === 'Kinesthetic' ? 'Include action-based and movement-related questions' : ''}
        - ${questionType === 'True/False' ? 'Create simple true/false questions' : ''}
        - ${questionType === 'Picture Match' ? 'Focus on visual matching and identification' : ''}
        - ${attentionSpan === 'Very Short' ? 'Keep questions very simple and quick to answer' : ''}
        - ${attentionSpan === 'Long' ? 'Can include slightly more detailed questions' : ''}

        Generate exactly ${quizLength} questions as a JSON array. Each object must have:
        - "id" (number, starting from 1)
        - "question" (string, clear and simple)
        - "options" (array of exactly 3 strings for multiple choice, or 2 for true/false)
        - "correctAnswer" (string, must exactly match one of the options)
        - "visualHint" (string, describe what a helpful visual aid would show)
        - "explanation" (string, simple explanation of why the answer is correct)

        Example format:
        [
            {
                "id": 1,
                "question": "What color is the sun?",
                "options": ["Yellow", "Blue", "Green"],
                "correctAnswer": "Yellow",
                "visualHint": "Bright yellow sun in the sky",
                "explanation": "The sun looks yellow when we see it in the sky"
            }
        ]

        Remember: Create exactly ${quizLength} questions about ${topic} at ${difficulty} level for a ${ageGroup} year old child.
        `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
            max_tokens: 2048,
        });

        let text = chatCompletion.choices[0]?.message?.content || "";

        // Clean up markdown if model adds it
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const quiz = JSON.parse(text);

        res.json({ quiz });

    } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({
            error: "Failed to generate quiz",
            details: error.message
        });
    }
});

export default router;
