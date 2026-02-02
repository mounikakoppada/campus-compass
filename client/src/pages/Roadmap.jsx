import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Roadmap = () => {
    const quarters = [
        {
            id: 1,
            title: 'Quarter 1: The Transition 🏁',
            focus: 'Unlearning school habits & settling in.',
            powerMoves: [
                'Talk to 5 Seniors: Find out which clubs are actually active and which are just for show.',
                'Explore Campus: Locate the library, labs, and the best food spots. Feel at home.',
                'Fix Your Sleep: College freedom ruins sleep. Set a "No-Screen" curfew at 11 PM.'
            ]
        },
        {
            id: 2,
            title: 'Quarter 2: Skill Foundation 🧱',
            focus: 'C-Programming & Logic Building.',
            powerMoves: [
                'Code Everyday: Even if it’s just 5 lines. Consistency > Intensity.',
                'Master Logic: Don’t memorize code. Understand "Why" a loop works.',
                'Typing Speed: Reach 40 WPM. It saves hours in the long run.'
            ]
        },
        {
            id: 3,
            title: 'Quarter 3: Exploration 🔭',
            focus: 'First Hackathon & LinkedIn.',
            powerMoves: [
                'LinkedIn Profile: Create one. Add a professional photo. Connect with batchmates.',
                'Hackathon Participation: Join one just to watch and learn. Don’t aim to win yet.',
                'Mini-Project: Build something useless but fun (e.g., a coin toss app).'
            ]
        },
        {
            id: 4,
            title: 'Quarter 4: Project Building 🏗️',
            focus: 'Applying what you learned.',
            powerMoves: [
                'Team Up: Find 2 reliable friends for future projects. Chemistry matters.',
                'Resume V1: Write your first draft. It will be empty, and that’s the motivation to fill it.',
                'Web Dev Basics: Learn HTML/CSS. It’s the visual side of coding.'
            ]
        }
    ];

    const [activeQ, setActiveQ] = useState(null);

    return (
        <div className="page-container">
            <Navbar />
            <div className="container content-wrap">
                <h1 className="page-title">B.Tech Success Roadmap 🗺️</h1>
                <p className="subtitle">First Year: 4 Quarters to Glory</p>

                <div className="roadmap-list">
                    {quarters.map((q) => (
                        <div key={q.id} className={`roadmap-card ${activeQ === q.id ? 'active' : ''}`} onClick={() => setActiveQ(activeQ === q.id ? null : q.id)}>
                            <div className="card-header">
                                <div>
                                    <h3>{q.title}</h3>
                                    <span className="focus-text">Focus: {q.focus}</span>
                                </div>
                                <span className="arrow">{activeQ === q.id ? '▼' : '▶'}</span>
                            </div>

                            {activeQ === q.id && (
                                <div className="card-body">
                                    <h4>🚀 Quarter Power Moves:</h4>
                                    <ul>
                                        {q.powerMoves.map((move, i) => (
                                            <li key={i}>{move}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .page-container { min-height: 100vh; background: #f8fafc; }
        .content-wrap { padding: 2rem 1rem; max-width: 800px; }
        .page-title { text-align: center; }
        .subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 3rem; }

        .roadmap-list { display: flex; flex-direction: column; gap: 1rem; }

        .roadmap-card { 
            background: white; border-radius: 12px; overflow: hidden; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer;
            transition: all 0.3s;
        }
        .roadmap-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
        .roadmap-card.active { border: 2px solid var(--primary); }

        .card-header { padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
        .card-header h3 { margin: 0 0 0.5rem 0; color: var(--primary); }
        .focus-text { color: var(--text-secondary); font-size: 0.9rem; }
        .arrow { font-size: 1.2rem; color: #cbd5e1; }

        .card-body { padding: 0 1.5rem 1.5rem 1.5rem; border-top: 1px solid #f1f5f9; background: #f8fafc; }
        .card-body h4 { color: #f59e0b; margin-top: 1rem; }
        .card-body ul { padding-left: 1.2rem; }
        .card-body li { margin-bottom: 0.5rem; line-height: 1.6; }
      `}</style>
        </div>
    );
};

export default Roadmap;
