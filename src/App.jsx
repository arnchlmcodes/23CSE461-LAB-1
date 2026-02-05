import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ColorMatch from './components/ColorMatch';
import ShapeMatch from './components/ShapeMatch';
import EmojiGame from './components/EmojiGame';
import QuizGenerator from './components/QuizGenerator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities/colors" element={<ColorMatch />} />
        <Route path="/activities/shapes" element={<ShapeMatch />} />

        <Route
          path="/activities/emotions"
          element={<EmojiGame category="emotions" completionMessage="You know your emotions!" />}
        />
        <Route
          path="/activities/daily"
          element={<EmojiGame category="daily" completionMessage="Great job with daily routines!" />}
        />
        <Route
          path="/activities/animals"
          element={<EmojiGame category="animals" completionMessage="You found all the animals!" />}
        />
        <Route
          path="/activities/numbers"
          element={<EmojiGame category="numbers" completionMessage="You are great at counting!" />}
        />

        {/* AI Quiz Generator Route */}
        <Route path="/generate-quiz" element={<QuizGenerator />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
