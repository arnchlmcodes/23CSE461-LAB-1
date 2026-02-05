import React from 'react';
import Navbar from './Navbar';
import useGameLogic from '../hooks/useGameLogic';
import { CheckCircle, Circle, Square, Triangle, Star, Heart, Diamond, Hexagon, Pentagon, Trophy } from 'lucide-react';

const ShapeMatch = () => {
    const {
        loading,
        currentQuestion,
        feedback,
        consecutiveCorrect,
        isComplete,
        handleOptionClick,
        resetGame,
        totalToWin
    } = useGameLogic('shapes');

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
    if (!currentQuestion) return <div>No activities.</div>;

    const renderShapeIcon = (shape) => {
        switch (shape) {
            case 'circle': return <Circle size={100} fill="#63b3ed" color="#2b6cb0" strokeWidth={2} />;
            case 'square': return <Square size={100} fill="#f6ad55" color="#c05621" strokeWidth={2} />;
            case 'triangle': return <Triangle size={100} fill="#68d391" color="#2f855a" strokeWidth={2} />;
            case 'star': return <Star size={100} fill="#f6e05e" color="#b7791f" strokeWidth={2} />;
            case 'heart': return <Heart size={100} fill="#f43f5e" color="#e11d48" strokeWidth={2} />;
            case 'diamond': return <Diamond size={100} fill="#818cf8" color="#4f46e5" strokeWidth={2} />;
            case 'hexagon': return <Hexagon size={100} fill="#2dd4bf" color="#0d9488" strokeWidth={2} />;
            case 'pentagon': return <Pentagon size={100} fill="#a78bfa" color="#7c3aed" strokeWidth={2} />;
            default: return <Circle size={100} fill="#cbd5e0" color="#718096" strokeWidth={2} />;
        }
    };

    if (isComplete) {
        return (
            <div className="activity-page">
                <Navbar />
                <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <div className="animate-fade-in">
                        <Trophy size={120} color="#fbbf24" style={{ margin: '0 auto', display: 'block' }} />
                        <h1 style={{ fontSize: '3rem', margin: '2rem 0', color: 'var(--text-main)' }}>
                            Level Mastered!
                        </h1>
                        <p style={{ fontSize: '1.5rem', marginBottom: '3rem', color: 'var(--text-light)' }}>
                            You got 3 in a row!
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
                    gap: '2rem',
                    flexWrap: 'wrap',
                    marginTop: '2rem'
                }}>
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option.isCorrect)}
                            style={{
                                width: '160px',
                                height: '160px',
                                borderRadius: '24px',
                                backgroundColor: 'white',
                                border: feedback === 'correct' && option.isCorrect
                                    ? '4px solid var(--success)'
                                    : '2px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                cursor: 'pointer',
                                transform: feedback === 'correct' && option.isCorrect ? 'scale(1.1)' : 'scale(1)',
                                transition: 'all 0.3s ease'
                            }}
                            className="option-btn card"
                            disabled={feedback !== null}
                        >
                            {renderShapeIcon(option.shape)}
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
export default ShapeMatch;
