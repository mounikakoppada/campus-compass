import React from 'react';
import Navbar from '../components/Navbar';

const Mentors = () => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Template copied to clipboard!');
    };

    const templates = [
        {
            title: 'Asking for Notes (To Senior)',
            text: `Hi [Senior's Name], 👋
Hope you're doing well! I'm [Your Name] from 1st Year [Branch].

I heard you're really good at [Subject Name], and I'm finding it a bit tricky to understand. Would it be possible for you to share your notes or any resources you used?

No pressure at all, assume I'm asking just in case you have them handy! Thanks a ton. 😄`
        },
        {
            title: 'Asking for Hackathon Advice (To Senior)',
            text: `Hey [Name], 🚀
I saw that you participated in [Hackathon Name] recently—congrats on that!

I'm thinking of participating in my first hackathon soon but I'm a bit nervous about where to start. 😅

If you have 5 minutes effectively, could you share one piece of advice you wish you knew before your first hackathon? Would really appreciate your guidance!`
        },
        {
            title: 'General Guidance (To Teacher/Mentor)',
            text: `Dear [Professor's Name],

I hope you are having a good week. I am [Your Name], a student in your [Subject] class.

I am really interested in the topic we covered today regarding [Topic]. I was wondering if you could recommend any extra reading or projects I could do to understand this better?

I want to make sure I build a strong foundation in this. Thank you for your time!

Regards,
[Your Name]`
        }
    ];

    return (
        <div className="page-container">
            <Navbar />
            <div className="container content-wrap">
                <h1 className="page-title">Ice-Breaker Templates 🧊</h1>
                <p className="subtitle">Don't overthink it. Just copy, edit, and send.</p>

                <div className="templates-list">
                    {templates.map((t, idx) => (
                        <div key={idx} className="template-card glass">
                            <div className="template-header">
                                <h3>{t.title}</h3>
                                <button className="copy-btn" onClick={() => copyToClipboard(t.text)}>Copy Text</button>
                            </div>
                            <div className="text-area">
                                {t.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .page-container { min-height: 100vh; background: #f8fafc; }
        .content-wrap { padding: 2rem 1rem; max-width: 700px; }
        .page-title { text-align: center; }
        .subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 3rem; }

        .templates-list { display: flex; flex-direction: column; gap: 2rem; }

        .template-card { padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }

        .template-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .template-header h3 { margin: 0; color: var(--primary); font-size: 1.2rem; }

        .copy-btn {
            background: var(--primary); color: white; border: none; padding: 0.5rem 1rem;
            border-radius: 6px; cursor: pointer; font-size: 0.9rem;
            transition: background 0.2s;
        }
        .copy-btn:hover { background: var(--primary-dark); }

        .text-area {
            background: #f1f5f9; padding: 1rem; border-radius: 8px;
            font-family: 'Inter', sans-serif; white-space: pre-wrap; line-height: 1.6;
            color: #334155; border: 1px dashed #cbd5e1;
        }
      `}</style>
        </div>
    );
};

export default Mentors;
