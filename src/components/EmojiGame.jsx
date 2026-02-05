import React from 'react';
import Navbar from './Navbar';
import useGameLogic from '../hooks/useGameLogic';
import { CheckCircle, Trophy, Star } from 'lucide-react';

const EmojiGame = ({ category, completionMessage }) => {
    const {
        loading,
        currentQuestion,
        feedback,
        consecutiveCorrect,
        isComplete,
        handleOptionClick,
        resetGame,
        totalToWin
    } = useGameLogic(category);

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
    if (!currentQuestion) return <div>No activities found for {category}.</div>;

    if (isComplete) {
        return (
            <div className="activity-page">
                <Navbar />
                <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <div className="animate-fade-in">
                        <Trophy size={120} color="#fbbf24" style={{ margin: '0 auto', display: 'block' }} />
                        <h1 style={{ fontSize: '3rem', margin: '2rem 0', color: 'var(--text-main)' }}>
                            Great Job!
                        </h1>
                        <p style={{ fontSize: '1.5rem', marginBottom: '3rem', color: 'var(--text-light)' }}>
                            {completionMessage || "You mastered this level!"}
                        </p>
                        <button className="btn-primary" onClick={resetGame}>
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="activity-page">
            <Navbar />

            {/* Progress Header */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                {[...Array(totalToWin)].map((_, i) => (
                    <Star
                        key={i}
                        size={32}
                        fill={i < consecutiveCorrect ? "#fbbf24" : "none"}
                        color={i < consecutiveCorrect ? "#fbbf24" : "#cbd5e0"}
                    />
                ))}
            </div>

            <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                <h1 className="animate-fade-in" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>
                    {currentQuestion.question}
                </h1>

                <div className="options-grid" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '3rem',
                    flexWrap: 'wrap',
                    marginTop: '2rem'
                }}>
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option.isCorrect)}
                            style={{
                                width: '180px',
                                height: '180px',
                                borderRadius: '50%',
                                backgroundColor: '#fff',
                                border: feedback === 'correct' && option.isCorrect
                                    ? '6px solid var(--success)'
                                    : '4px solid #fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: feedback === 'correct' && option.isCorrect ? 'scale(1.1)' : 'scale(1)',
                            }}
                            className="option-btn card"
                            disabled={feedback !== null}
                        >
                            <span style={{ fontSize: '5rem', lineHeight: 1 }}>{option.emoji}</span>
                            {/* Label removed as requested to rely on visuals */}
                        </button>
                    ))}
                </div>

                {feedback === 'correct' && (
                    <div className="animate-fade-in" style={{ marginTop: '3rem', color: 'var(--success)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                            <CheckCircle size={40} />
                            <h2 style={{ fontSize: '2rem' }}>Correct!</h2>
                        </div>
                    </div>
                )}

                {feedback === 'incorrect' && (
                    <div className="animate-fade-in" style={{ marginTop: '3rem', color: '#fc8181' }}>
                        <h2 style={{ fontSize: '2rem' }}>Try Again</h2>
                    </div>
                )}
            </div>
        </div>
    );
};
export default EmojiGame;
