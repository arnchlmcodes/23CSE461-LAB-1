import React from 'react';
import ActivityList from './ActivityList';

const Home = () => {
    return (
        <div className="home-container" style={{ padding: '2rem', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <header className="home-header animate-fade-in">
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--primary)' }}>CogniCare</h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '4rem' }}>
                    Fun learning for bright minds.
                </p>
            </header>

            <ActivityList />
        </div>
    );
};

export default Home;
