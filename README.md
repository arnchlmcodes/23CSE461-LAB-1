# Lab Evaluation -1

---

### 1. About the use case

**CogniCare** is a specialized web application designed to support basic cognitive development in children with autism. It provides a structured, distraction-free environment where children can practice essential skills such as identifying **Colors, Shapes, Emotions, Daily Routines, Animals, and Numbers**. The application uses a "visual-first" approach, minimizing text usage and relying on clear iconography and emojis to reduce cognitive load. 

**NEW: AI-Powered Quiz Generation** - The application now features an advanced AI quiz generator that creates personalized, autism-friendly quizzes using Groq's language models. This feature allows for dynamic content creation tailored to each child's specific needs, learning style, and developmental level.

The activities are designed to be repetitive and consistent, offering immediate positive reinforcement (visual feedback and progress stars) to build confidence and engagement without the pressure of time limits or "game over" states.

### 2. Purpose

This application provides comfort and improvement for autistic children in several ways:
*   **Reduced Anxiety:** The UI uses a calming pastel color palette (soft teals, creams, and oranges) and avoids jarring animations or loud noises, creating a safe sensory space.
*   **Focus & Attention:** By presenting one question at a time with a clear goal (e.g., "Find the Red Circle"), it helps children practice sustained attention.
*   **Confidence Building:** The "3-streak" logic ensures that children must demonstrate consistency to master a level, but errors simply reset the streak without harsh penalties, encouraging resilience.
*   **Visual Communication:** Using standard emojis and icons helps children who may be non-verbal or pre-verbal to understand concepts like emotions (Happy vs. Sad) and daily tasks (Brushing Teeth).
*   **Personalized Learning:** The AI quiz generator adapts to individual needs, considering factors like age, learning style, sensory preferences, and support requirements.

### 3. List of similar applications

*   **Autism iHelp:** Focuses heavily on vocabulary and categorization using real-world photography.
*   **Otsimo:** A comprehensive gamified platform with speech therapy and curriculum-based learning, though often complex and subscription-based.
*   **Choiceworks:** Specifically designed for daily routines and emotional regulation using visual schedules.

**Difference:** CogniCare is a lightweight, accessible web-based alternative that specifically targets *foundational* discrimination skills (matching and identifying) with an infinite-loop mechanic, making it easier for quick practice sessions compared to full commercial suites. The addition of AI-powered quiz generation provides unlimited, personalized content without requiring manual content creation.

### 4. Technology stack

**Frontend:**
*   **React 19 (Vite):** Core framework for building the dynamic user interface.
*   **React Router 7:** Handles SPA (Single Page Application) navigation between Home and Activities.
*   **Lucide React:** Provides scalable, consistent SVG icons for shapes and UI elements.
*   **CSS3:** Uses CSS Variables for theming and CSS Grid/Flexbox for layout.

**Backend:**
*   **Node.js:** Runtime environment for the server.
*   **Express.js:** Lightweight web server to create API endpoints.
*   **Groq SDK:** Integration with Groq's AI models for dynamic quiz generation.
*   **File System (fs):** Reads activity data dynamically from JSON files.

**AI Integration:**
*   **Groq API:** Powers the intelligent quiz generation using Llama models.
*   **Dynamic Prompt Engineering:** Creates context-aware prompts based on user preferences.

### 5. AI Quiz Generator Features

The AI Quiz Generator is a comprehensive tool that creates personalized quizzes for children with autism. It includes:

**Form Fields:**
*   **Basic Settings:**
    - Topic selection (Animals, Colors, Shapes, Numbers, Letters, Emotions, Daily Routine, Food, Transportation, Weather)
    - Difficulty levels (Very Easy, Easy, Medium, Challenging)
    - Age groups (3-4, 5-6, 7-8, 9-10, 11-12 years)
    - Quiz length (5, 10, 15, 20 questions)
    - Learning style (Visual, Auditory, Kinesthetic, Mixed)
    - Question type (Multiple Choice, True/False, Picture Match, Mixed)

*   **Advanced Options:**
    - Sensory preferences (Minimal Text, No Sound, Muted Colors, Large Text, High Contrast)
    - Attention span settings (Very Short 2-3min, Short 5-7min, Medium 10-15min, Long 15+min)
    - Support level (Independent, Minimal Support, Moderate Support, High Support)
    - Special interests field for personalization

**AI Features:**
*   **Adaptive Language:** Adjusts complexity based on age and support level
*   **Sensory Considerations:** Modifies content based on sensory preferences
*   **Interest Integration:** Incorporates special interests when relevant
*   **Educational Explanations:** Provides simple explanations for correct answers
*   **Visual Hints:** Includes descriptions for visual aids

### 6. Responsiveness of the application

The application achieves full responsiveness using purely modern CSS techniques within React:
*   **Fluid Grids:** The main dashboard uses `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` to automatically adjust the number of columns based on screen width (Mobile: 1 col, Tablet: 2 cols, Desktop: 3-4 cols).
*   **Touch-Optimized Targets:** Interactive elements (activity cards, answer buttons) are sized using `rem` units to ensure they are large enough (min 44px tap target) for children with varying motor control on touch devices.
*   **Flexible Layouts:** Game screens use Flexbox (`display: flex`) with `flex-wrap: wrap` to ensure answer options flow naturally to the next line on smaller screens without breaking the layout.
*   **Adaptive Forms:** The AI quiz form uses CSS Grid for responsive field layouts that stack appropriately on mobile devices.

### 7. Workflow of the application

**Traditional Activities:**
1.  **Dashboard:** The user lands on the Home page and views clearly colored cards for different categories (Colors, Shapes, Animals, etc.).
2.  **Selection:** Clicking a category triggers a request to the backend API (`/api/activities`) to fetch the specific dataset for that game.
3.  **Game Initialization:** The `useGameLogic` hook loads the data, picks a random question, and shuffles the answer options to prevent memorization by position.
4.  **Interaction Loop:**
    *   Child sees a prompt (e.g., "Where is the CIRCLE?") and clicks an option.
    *   **If Correct:** A green visual cue appears, a gold star is added to the "Streak Bar", and a new question loads after a short delay.
    *   **If Incorrect:** A red reset animation plays, and the streak is reset to zero, encouraging the child to try again.
5.  **Completion:** Once the child achieves 3 correct answers in a row, a "Trophy/Mastery" screen appears to celebrate the achievement, with an option to "Play Again".

**AI Quiz Generation:**
1.  **Form Access:** User clicks "AI Quiz" from the dashboard or navigation
2.  **Customization:** User fills out the comprehensive form with child's preferences and needs
3.  **AI Processing:** Form data is sent to Groq API with a detailed prompt for quiz generation
4.  **Dynamic Content:** AI generates personalized questions with explanations and visual hints
5.  **Interactive Quiz:** Child takes the quiz with immediate feedback and educational explanations
6.  **Results:** Final score is displayed with option to generate a new quiz

### 8. List of files with its purpose

**Frontend (`src/`):**
*   `App.jsx`: Main entry point defining the routing structure for the application.
*   `components/Home.jsx`: Landing page displaying the grid of activity categories.
*   `components/ActivityList.jsx`: Reusable component to render the list of category cards.
*   `components/Navbar.jsx`: Consistent top navigation bar with "Home" and "AI Quiz" buttons.
*   `components/QuizGenerator.jsx`: **NEW** - Comprehensive AI quiz generator with form and quiz interface.
*   `components/EmojiGame.jsx`: A universal game component used for text-to-emoji matching games (Animals, Daily, Numbers, Emotions).
*   `components/ShapeMatch.jsx`: Specialized component for rendering SVG shapes (Circle, Square, etc.).
*   `components/ColorMatch.jsx`: Specialized component for rendering colored div blocks.
*   `hooks/useGameLogic.js`: Custom hook containing the core engine (streak counting, shuffling, question selection, win state).
*   `hooks/useActivities.js`: Custom hook handling data fetching from the API with fallback capabilities.
*   `data/activities.json`: Local fallback data in case the server is unreachable.

**Backend (`server/`):**
*   `server.js`: Express server setup, CORS configuration, and server startup.
*   `routes/activities.js`: API endpoint that reads the JSON data file and serves it to the frontend.
*   `routes/generate.js`: **NEW** - AI quiz generation endpoint using Groq API.
*   `test_groq.js`: **NEW** - Test file for validating Groq API integration.
*   `data/activities.json`: The source of truth for all game content.

**Configuration:**
*   `.env`: Environment variables including `GROQ_API_KEY` for AI integration.
*   `package.json`: Updated dependencies including `groq-sdk`.

### 9. Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   - Create a `.env` file in the root directory
   - Add your Groq API key: `GROQ_API_KEY=your_api_key_here`
   - Get your API key from: https://console.groq.com/keys

3. **Test AI Integration:**
   ```bash
   node server/test_groq.js
   ```

4. **Run the Application:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` with the backend running on `http://localhost:5000`.
