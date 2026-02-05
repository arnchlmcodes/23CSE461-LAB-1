import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Shapes, Smile, Sun, PawPrint, Hash } from 'lucide-react';

const ActivityList = () => {
    return (
        <div className="categories-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
        }}>
            <CategoryCard
                to="/activities/colors"
                icon={<Palette size={48} />}
                title="Colors"
                color="#fc8181"
            />
            <CategoryCard
                to="/activities/shapes"
                icon={<Shapes size={48} />}
                title="Shapes"
                color="#63b3ed"
            />
            <CategoryCard
                to="/activities/emotions"
                icon={<Smile size={48} />}
                title="Emotions"
                color="#f6ad55"
            />
            <CategoryCard
                to="/activities/daily"
                icon={<Sun size={48} />}
                title="Daily Routine"
                color="#68d391"
            />
            <CategoryCard
                to="/activities/animals"
                icon={<PawPrint size={48} />}
                title="Animals"
                color="#b794f4"
            />
            <CategoryCard
                to="/activities/numbers"
                icon={<Hash size={48} />}
                title="Numbers"
                color="#f687b3"
            />

            {/* AI Generator Card */}
            <CategoryCard
                to="/generate-quiz"
                icon={<span style={{ fontSize: '3rem', lineHeight: '1' }}>✨</span>}
                title="AI Quiz"
                color="#8b5cf6"
            />
        </div>
    );
};

const CategoryCard = ({ to, icon, title, color }) => (
    <Link to={to} style={{ textDecoration: 'none' }}>
        <div className="card" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '3rem',
            borderTop: `8px solid ${color}`,
            background: 'white',
            height: '100%',
            justifyContent: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
            <div style={{
                color: color,
                background: `${color}20`,
                padding: '1.5rem',
                borderRadius: '50%'
            }}>
                {icon}
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>{title}</h2>
        </div>
    </Link>
);

export default ActivityList;
