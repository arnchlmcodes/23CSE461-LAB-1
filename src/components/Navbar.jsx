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
    </nav>
);

export default Navbar;
