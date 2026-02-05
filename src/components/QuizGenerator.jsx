
import React, { Component, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Sparkles, Play, CheckCircle, RotateCcw, ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* 
   ================================================================================
   CONCEPT 1: STATELESS COMPONENT
   - A pure function that receives read-only properties (props) and returns JSX.
   - Does not manage any internal state.
   ================================================================================
*/
const QuizHeader = ({ title, subtitle }) => (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Sparkles size={48} color="#8b5cf6" style={{ margin: '0 auto', display: 'block' }} />
        <h2 style={{ color: '#4c1d95', margin: '1rem 0' }}>{title}</h2>
        <p style={{ color: '#6b7280' }}>{subtitle}</p>
    </div>
);

/* 
   ================================================================================
   CONCEPT 2: FUNCTION COMPONENT + HOOKS
   - Demonstrates 'Hooks' (useState, useEffect, useNavigate).
   - Demonstrates 'Forms'.
   - Demonstrates 'Routing' (via useNavigate).
   ================================================================================
*/
const QuizForm = ({ onSubmit, initialData }) => {
    // HOOK: useState (State Management in Function Component)
    const [localFormData, setLocalFormData] = useState(initialData);
    const [showAdvanced, setShowAdvanced] = useState(false);

    // HOOK: useNavigate (Routing)
    const navigate = useNavigate();

    // HOOK: useEffect (Side Effect)
    useEffect(() => {
        console.log("Form Mounted - Concept: LifeCycle in Functional Component");
    }, []);

    // EVENT: Handle Input Change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'sensoryMode') {
            // Complex state update logic
            setLocalFormData(prev => {
                const currentModes = [...prev.sensoryMode];
                if (checked) currentModes.push(value);
                else {
                    const idx = currentModes.indexOf(value);
                    if (idx > -1) currentModes.splice(idx, 1);
                }
                return { ...prev, sensoryMode: currentModes };
            });
        } else {
            setLocalFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // EVENT: Form Submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default browser reload
        onSubmit(localFormData); // Pass data up to Parent Class Component
    };

    return (
        <div className="card fade-in" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
            {/* Stateless Component Usage */}
            <QuizHeader title="Create Your Quiz" subtitle="Customize your learning experience" />

            <button
                onClick={() => navigate('/')}
                className="btn-text"
                style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}
            >
                <ArrowLeft size={16} /> Back Home
            </button>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Standard Inputs */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Topic</label>
                    <select name="topic" value={localFormData.topic} onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
                        <option value="Animals">Animals</option>
                        <option value="Colors">Colors</option>
                        <option value="Shapes">Shapes</option>
                        <option value="Emotions">Emotions</option>
                        <option value="Daily Routine">Daily Routine</option>
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Difficulty</label>
                        <select name="difficulty" value={localFormData.difficulty} onChange={handleChange}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Age</label>
                        <select name="ageGroup" value={localFormData.ageGroup} onChange={handleChange}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
                            <option value="3-5">3-5</option>
                            <option value="6-8">6-8</option>
                        </select>
                    </div>
                </div>

                {/* Conditional Rendering based on State (Hooks) */}
                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        style={{ background: 'none', border: 'none', color: '#8b5cf6', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Settings size={16} />
                        {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
                    </button>

                    {showAdvanced && (
                        <div className="animate-fade-in" style={{ marginTop: '1rem', background: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Sensory Preferences</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {['Minimal Text', 'No Sound', 'Muted Colors'].map(mode => (
                                    <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                        <input
                                            type="checkbox"
                                            name="sensoryMode"
                                            value={mode}
                                            checked={localFormData.sensoryMode.includes(mode)}
                                            onChange={handleChange}
                                        />
                                        {mode}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <Play size={24} />
                    Generate & Play
                </button>
            </form>
        </div>
    );
};

/* 
   ================================================================================
   CONCEPT 3: CLASS COMPONENT
   - The main container.
   - Demonstrates 'Class Component'.
   - Demonstrates 'State Management' (this.state).
   - Demonstrates 'Events' (Methods).
   ================================================================================
*/
class QuizGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'form', // States: form -> loading -> quiz -> result
            quizData: [],
            currentQuestionIndex: 0,
            score: 0,
            feedback: null,
            error: null
        };
    }

    // EVENT: Method dealing with data fetched from API
    handleFormSubmit = async (formData) => {
        this.setState({ step: 'loading', error: null });

        try {
            console.log("Sending Data:", formData);
            const response = await fetch('http://localhost:5000/api/generate-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('API Request Failed');

            const data = await response.json();

            if (data.quiz && data.quiz.length > 0) {
                this.setState({
                    quizData: data.quiz,
                    step: 'quiz',
                    currentQuestionIndex: 0,
                    score: 0
                });
            } else {
                throw new Error('No quiz returned');
            }
        } catch (err) {
            console.error(err);
            this.setState({
                step: 'form',
                error: 'Oops! AI is sleeping. Please try again.'
            });
        }
    };

    handleOptionSelect = (option) => {
        if (this.state.feedback) return;

        const currentQ = this.state.quizData[this.state.currentQuestionIndex];
        const isCorrect = option === currentQ.correctAnswer;

        this.setState(prev => ({
            feedback: isCorrect ? 'correct' : 'incorrect',
            score: isCorrect ? prev.score + 1 : prev.score
        }));

        setTimeout(() => {
            if (this.state.currentQuestionIndex + 1 < this.state.quizData.length) {
                this.setState(prev => ({
                    currentQuestionIndex: prev.currentQuestionIndex + 1,
                    feedback: null
                }));
            } else {
                this.setState({ step: 'result' });
            }
        }, 1500);
    };

    renderQuiz() {
        const { quizData, currentQuestionIndex, feedback } = this.state;
        const question = quizData[currentQuestionIndex];

        return (
            <div className="container" style={{ maxWidth: '800px', textAlign: 'center', marginTop: '3rem' }}>
                <h2>Question {currentQuestionIndex + 1}/{quizData.length}</h2>
                <h1 style={{ fontSize: '2.5rem', margin: '2rem 0' }}>{question.question}</h1>
                <p style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', display: 'inline-block' }}>
                    💡 Visual: {question.visualHint}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                    {question.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => this.handleOptionSelect(opt)}
                            className="card option-btn"
                            disabled={!!feedback}
                            style={{
                                padding: '2rem',
                                fontSize: '1.5rem',
                                border: '4px solid transparent',
                                backgroundColor: feedback && opt === question.correctAnswer ? '#d1fae5' : 'white',
                                borderColor: feedback && opt === question.correctAnswer ? '#10b981' : 'transparent'
                            }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
                {feedback === 'correct' && <h2 style={{ color: 'green', marginTop: '1rem' }}>Correct! 🎉</h2>}
                {feedback === 'incorrect' && <h2 style={{ color: 'red', marginTop: '1rem' }}>Nice try!</h2>}
            </div>
        );
    }

    render() {
        return (
            <div className="activity-page" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
                <Navbar />

                {this.state.step === 'form' && (
                    <QuizForm
                        initialData={{
                            topic: 'Animals', // Default State
                            difficulty: 'Easy',
                            ageGroup: '6-8',
                            sensoryMode: [],
                            attentionSpan: 'Short'
                        }}
                        onSubmit={this.handleFormSubmit}
                    />
                )}

                {this.state.step === 'loading' && (
                    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                        <div className="loader"></div>
                        <h2>Generating specific quiz...</h2>
                    </div>
                )}

                {this.state.step === 'quiz' && this.renderQuiz()}

                {this.state.step === 'result' && (
                    <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <h1 style={{ fontSize: '3rem' }}>All Done! 🏆</h1>
                        <p style={{ fontSize: '2rem' }}>Score: {this.state.score}</p>
                        <button className="btn-primary" onClick={() => this.setState({ step: 'form' })}>
                            <RotateCcw /> Try Again
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default QuizGenerator;
