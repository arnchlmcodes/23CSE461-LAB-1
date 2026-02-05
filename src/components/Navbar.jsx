import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => (
    <nav style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'var(--text-main)',
            fontWeight: 'bold',
            fontSize: '1.2rem'
        }}>
            <div style={{ background: 'white', padding: '0.5rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
                <Home size={24} color="var(--primary)" />
            </div>
            <span>Home</span>
        </Link>
        <Link to="/generate-quiz" style={{
            marginLeft: 'auto',
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            padding: '0.8rem 1.5rem',
            borderRadius: '24px',
            boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)'
        }}>
            ✨ AI Quiz
        </Link>
    </nav>
);

export default Navbar;
