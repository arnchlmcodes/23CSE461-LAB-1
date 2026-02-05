# Lab Evaluation -1

**RollNo :** [Your Roll Number]  
**Name :** [Your Name]

---

### 1. About the use case

**CogniCare** is a specialized web application designed to support basic cognitive development in children with autism. It provides a structured, distraction-free environment where children can practice essential skills such as identifying **Colors, Shapes, Emotions, Daily Routines, Animals, and Numbers**. The application uses a "visual-first" approach, minimizing text usage and relying on clear iconography and emojis to reduce cognitive load. The activities are designed to be repetitive and consistent, offering immediate positive reinforcement (visual feedback and progress stars) to build confidence and engagement without the pressure of time limits or "game over" states.

### 2. Purpose

This application provides comfort and improvement for autistic children in several ways:
*   **Reduced Anxiety:** The UI uses a calming pastel color palette (soft teals, creams, and oranges) and avoids jarring animations or loud noises, creating a safe sensory space.
*   **Focus & Attention:** By presenting one question at a time with a clear goal (e.g., "Find the Red Circle"), it helps children practice sustained attention.
*   **Confidence Building:** The "3-streak" logic ensures that children must demonstrate consistency to master a level, but errors simply reset the streak without harsh penalties, encouraging resilience.
*   **Visual Communication:** Using standard emojis and icons helps children who may be non-verbal or pre-verbal to understand concepts like emotions (Happy vs. Sad) and daily tasks (Brushing Teeth).

### 3. List of similar applications

*   **Autism iHelp:** Focuses heavily on vocabulary and categorization using real-world photography.
*   **Otsimo:** A comprehensive gamified platform with speech therapy and curriculum-based learning, though often complex and subscription-based.
*   **Choiceworks:** Specifically designed for daily routines and emotional regulation using visual schedules.

**Difference:** CogniCare is a lightweight, accessible web-based alternative that specifically targets *foundational* discrimination skills (matching and identifying) with an infinite-loop mechanic, making it easier for quick practice sessions compared to full commercial suites.

### 4. Technology stack

**Frontend:**
*   **React 19 (Vite):** Core framework for building the dynamic user interface.
*   **React Router 7:** Handles SPA (Single Page Application) navigation between Home and Activities.
*   **Lucide React:** Provides scalable, consistent SVG icons for shapes and UI elements.
*   **CSS3:** Uses CSS Variables for theming and CSS Grid/Flexbox for layout.

**Backend:**
*   **Node.js:** Runtime environment for the server.
*   **Express.js:** Lightweight web server to create API endpoints.
*   **File System (fs):** Reads activity data dynamically from JSON files.

### 5. Responsiveness of the application

The application achieves full responsiveness using purely modern CSS techniques within React:
*   **Fluid Grids:** The main dashboard uses `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` to automatically adjust the number of columns based on screen width (Mobile: 1 col, Tablet: 2 cols, Desktop: 3-4 cols).
*   **Touch-Optimized Targets:** Interactive elements (activity cards, answer buttons) are sized using `rem` units to ensure they are large enough (min 44px tap target) for children with varying motor control on touch devices.
*   **Flexible Layouts:** Game screens use Flexbox (`display: flex`) with `flex-wrap: wrap` to ensure answer options flow naturally to the next line on smaller screens without breaking the layout.

### 6. Workflow of the application

1.  **Dashboard:** The user lands on the Home page and views clearly colored cards for different categories (Colors, Shapes, Animals, etc.).
2.  **Selection:** Clicking a category triggers a request to the backend API (`/api/activities`) to fetch the specific dataset for that game.
3.  **Game Initialization:** The `useGameLogic` hook loads the data, picks a random question, and shuffles the answer options to prevent memorization by position.
4.  **Interaction Loop:**
    *   Child sees a prompt (e.g., "Where is the CIRCLE?") and clicks an option.
    *   **If Correct:** A green visual cue appears, a gold star is added to the "Streak Bar", and a new question loads after a short delay.
    *   **If Incorrect:** A red reset animation plays, and the streak is reset to zero, encouraging the child to try again.
5.  **Completion:** Once the child achieves 3 correct answers in a row, a "Trophy/Mastery" screen appears to celebrate the achievement, with an option to "Play Again".

### 7. List of files with its purpose

**Frontend (`src/`):**
*   `App.jsx`: Main entry point defining the routing structure for the application.
*   `components/Home.jsx`: Landing page displaying the grid of activity categories.
*   `components/ActivityList.jsx`: Reusable component to render the list of category cards.
*   `components/Navbar.jsx`: Consistent top navigation bar with a "Home" button.
*   `components/EmojiGame.jsx`: A universal game component used for text-to-emoji matching games (Animals, Daily, Numbers, Emotions).
*   `components/ShapeMatch.jsx`: Specialized component for rendering SVG shapes (Circle, Square, etc.).
*   `components/ColorMatch.jsx`: Specialized component for rendering colored div blocks.
*   `hooks/useGameLogic.js`: Custom hook containing the core engine (streak counting, shuffling, question selection, win state).
*   `hooks/useActivities.js`: Custom hook handling data fetching from the API with fallback capabilities.
*   `data/activities.json`: Local fallback data in case the server is unreachable.

**Backend (`server/`):**
*   `server.js`: Express server setup, CORS configuration, and server startup.
*   `routes/activities.js`: API endpoint that reads the JSON data file and serves it to the frontend.
*   `data/activities.json`: The source of truth for all game content.
