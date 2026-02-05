import { useState, useEffect, useCallback, useRef } from 'react';
import useActivities from './useActivities';

const useGameLogic = (category, completionThreshold = 3) => {
    const { data: activities, loading } = useActivities(category);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', null
    const [isComplete, setIsComplete] = useState(false);

    // Keep track of used questions to avoid immediate repetition
    const lastQuestionId = useRef(null);

    // Initialize or pick new question
    const pickRandomQuestion = useCallback(() => {
        if (!activities || activities.length === 0) return;

        // If only one question, just pick it
        if (activities.length === 1) {
            setCurrentQuestion(activities[0]);
            return;
        }

        let randomIndex;
        let newQuestion;
        let attempts = 0;

        // Try to find a different question than the last one
        do {
            randomIndex = Math.floor(Math.random() * activities.length);
            newQuestion = activities[randomIndex];
            attempts++;
        } while (newQuestion.id === lastQuestionId.current && attempts < 10);

        lastQuestionId.current = newQuestion.id;

        // Shuffle options for the new question to add variety
        const shuffledOptions = [...newQuestion.options].sort(() => Math.random() - 0.5);
        setCurrentQuestion({ ...newQuestion, options: shuffledOptions });

        setFeedback(null);
    }, [activities]);

    // Initial load
    useEffect(() => {
        if (!currentQuestion && activities && activities.length > 0) {
            pickRandomQuestion();
        }
    }, [activities, currentQuestion, pickRandomQuestion]);

    const handleOptionClick = (isCorrect) => {
        if (feedback) return; // Prevent double clicks during feedback

        if (isCorrect) {
            setFeedback('correct');
            const newConsecutive = consecutiveCorrect + 1;
            setConsecutiveCorrect(newConsecutive);

            if (newConsecutive >= completionThreshold) {
                setTimeout(() => setIsComplete(true), 1000);
            } else {
                // Delay then next question
                setTimeout(() => {
                    pickRandomQuestion();
                }, 1500);
            }
        } else {
            setFeedback('incorrect');
            setConsecutiveCorrect(0); // Reset progress
            // Delay then clear feedback to let try again
            setTimeout(() => {
                setFeedback(null);
            }, 1000);
        }
    };

    const resetGame = () => {
        setConsecutiveCorrect(0);
        setIsComplete(false);
        pickRandomQuestion();
    };

    return {
        loading,
        currentQuestion,
        feedback,
        consecutiveCorrect,
        isComplete,
        handleOptionClick,
        resetGame,
        totalToWin: completionThreshold
    };
};

export default useGameLogic;
