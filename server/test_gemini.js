
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function listModels() {
    console.log("Checking API Key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");
    if (!process.env.GEMINI_API_KEY) {
        console.error("Error: No API key found in .env");
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        console.log("Fetching available models...");
        // Note: listModels is on the genAI instance or via the model manager depending on SDK version
        // In 0.24.x it might be on a helper. Let's try to just get the 'gemini-1.5-flash' explicitly to see if it works in a simple script.

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success! gemini-1.5-flash is working.");
        console.log("Response:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);

        // Try fallback
        try {
            console.log("Retrying with gemini-1.0-pro...");
            const model2 = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
            const result2 = await model2.generateContent("Hello");
            console.log("Success! gemini-1.0-pro is working.");
        } catch (err2) {
            console.error("Error with gemini-1.0-pro:", err2.message);
        }
    }
}

listModels();
