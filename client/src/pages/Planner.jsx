import React from 'react';
import Navbar from '../components/Navbar';

const Planner = () => {
    const schedule = [
        { time: '9:00 AM - 4:00 PM', activity: '🏛️ College Grind', notes: 'Attend classes. If a lecture is boring, read a book or solve a code problem quietly.' },
        { time: '4:00 PM - 5:00 PM', activity: '🍕 Social Recharge', notes: 'Hang out with friends, eat snacks, complain about assignments. Decompress.' },
        { time: '5:00 PM - 6:00 PM', activity: '⚡ The Golden Hour (Coding)', notes: 'Strict Focus. No Phone. Learn one new logic concept or solve 2 problems.' },
        { time: '6:00 PM - 7:30 PM', activity: '🏠 Commute / Relax', notes: 'Listen to a podcast or music. Rest your eyes.' },
        { time: '7:30 PM - 9:00 PM', activity: '📚 Academic Study', notes: 'Finish assignments or study for upcoming tests. Keep the GPA safe.' },
        { time: '9:00 PM - 9:30 PM', activity: '🍽️ Dinner', notes: 'Eat good food.' },
        { time: '9:30 PM - 10:30 PM', activity: '🎨 Hobby / Chill', notes: 'Netflix, Gaming, Guitar. Do what makes you happy.' },
        { time: '10:30 PM - 11:00 PM', activity: '📝 20-Minute Review', notes: 'Plan tomorrow. Pack your bag. Review what you learned today.' },
        { time: '11:00 PM', activity: '😴 Sleep', notes: '8 Hours is non-negotiable for brain growth.' }
    ];

    return (
        <div className="page-container">
            <Navbar />
            <div className="container content-wrap">
                <h1 className="page-title">High-Performance Weekly Template ⏳</h1>
                <p className="subtitle">A routine for balance, not burnout.</p>

                <div className="schedule-table-container glass">
                    <table className="schedule-table">
                        <thead>
                            <tr>
                                <th>Time Block</th>
                                <th>Activity</th>
                                <th>Pro-Tip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="time-col">{row.time}</td>
                                    <td className="activity-col"><strong>{row.activity}</strong></td>
                                    <td>{row.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
        .page-container { min-height: 100vh; background: #f8fafc; }
        .content-wrap { padding: 2rem 1rem; max-width: 900px; }
        .page-title { text-align: center; }
        .subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 3rem; }

        .schedule-table-container { overflow-x: auto; border-radius: 12px; padding: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        
        .schedule-table { width: 100%; border-collapse: collapse; min-width: 600px; }
        .schedule-table th { text-align: left; padding: 1rem; background: var(--primary); color: white; }
        .schedule-table td { padding: 1rem; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
        .schedule-table tr:last-child td { border-bottom: none; }
        
        .time-col { white-space: nowrap; font-weight: 600; color: var(--primary); background: #f8fafc; width: 180px; }
        .activity-col { font-size: 1.05rem; width: 250px; }
      `}</style>
        </div>
    );
};

export default Planner;
