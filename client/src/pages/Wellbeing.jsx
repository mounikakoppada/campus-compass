import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { db, collection, addDoc } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import emailjs from '@emailjs/browser';

const Wellbeing = () => {
    const { user } = useContext(AuthContext);
    // ^ Assuming context provides { user: { email: '...', displayName: '...' } }

    const [activeResource, setActiveResource] = useState(null);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [supportSent, setSupportSent] = useState(false);
    const [formData, setFormData] = useState({ topic: '', details: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- CONFIGURATION ---
    // User must replace these with their actual EmailJS keys
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    const resources = [
        {
            id: 1,
            title: 'Homesickness: A Guide for Hostel Life',
            type: 'Article',
            time: '5 min read',
            content: `
### 🏠 Missing Home? It's Okay.
First year in a hostel can be tough. The food tastes different, the bed feels weird, and you miss your parents (even if they were annoying).

**How to Cope:**
1. **Decorate Your Space:** Put up photos or posters. Make your dorm feel like *yours*.
2. **The "Call Home" Rule:** Call your parents, but not every hour. Try once a day. If you stay on the phone all the time, you miss out on bonding with your roommates.
3. **Find a "Third Place":** Apart from your room and class, find a spot (library, canteen, park) where you feel comfortable.
4. **Give it 21 Days:** It takes about 3 weeks to form a new habit. Hang in there!`
        },
        {
            id: 2,
            title: "Engineer's Sleep Schedule Hacks",
            type: 'Video',
            time: '10 min',
            content: `
### 😴 Hack Your Sleep (Video Summary)

**The Engineering Reality:**
You can't code well on 3 hours of sleep. Your brain needs REM sleep to consolidate memories (what you studied).

**The 90-Minute Rule:**
Sleep cycles are typically 90 minutes.
- Good: 6 Hours (4 cycles)
- Better: 7.5 Hours (5 cycles)
- Best: 9 Hours (6 cycles)
*Waking up in the middle of a cycle leaves you groggy.*

**Tips:**
- No Caffeine after 3 PM.
- Blue light filter on phone at night.
- If pulling an all-nighter, nap for 20 mins (power nap) or 90 mins (full cycle). Nothing in between.`
        },
        {
            id: 3,
            title: 'Overcoming Imposter Syndrome',
            type: 'Exercise',
            time: '15 min',
            content: `
### 🎭 "They made a mistake admitting me..."
Feel like everyone else is a genius and you're a fraud? That's Imposter Syndrome. 70% of students feel it.

**5-Minute Reality Check Exercise:**
1. **Write it down:** List 3 things you achieved *before* getting here (e.g., passing entrance exams, a school project).
2. **The "Spotlight Effect":** Realize that nobody is analyzing you as closely as you are analyzing yourself.
3. **Ask a Peer:** Ask a friend "What is one thing you find difficult?" You'll realize they struggle too.
   
**Mantra:** You are here because you earned it. Growth mindset > Natural talent.`
        },
        {
            id: 4,
            title: 'Exam Stress: You Are More Than Grades',
            type: 'Article',
            time: '4 min read',
            content: `
### 😵 Panic Mode On?
Exams are stressful, but panic makes you forget what you know.

**De-Stress Protocol:**
1. **Chunking:** Don't look at the whole syllabus. Break it into "Units". Finish Unit 1. Celebrate.
2. **The 4-7-8 Breath:** Inhale for 4s, Hold for 7s, Exhale for 8s. Resets your nervous system.
3. **Worst Case Scenario:** What happens if you fail? You write a supplementary exam. It's not the end of the world. Life goes on.
   
**Remember:** Your CGPA is just a number. Your skills are your career.`
        }
    ];

    const sendEmailNotification = (data) => {
        // Prepare template params matching typical EmailJS structure
        // The user should set their template to use these variables:
        // {{from_name}}, {{from_email}}, {{topic}}, {{message}}
        const templateParams = {
            from_name: data.userName || 'Anonymous Student',
            from_email: data.userEmail || 'No Email Provided',
            topic: data.topic,
            message: data.details,
            to_email: 'optimusprimecoc99@gmail.com' // Forwarding target if template supports it
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then((result) => {
                console.log('Email sent:', result.text);
            }, (error) => {
                console.error('Email failed:', error.text);
            });
    };

    const handleSupportSubmit = async (e) => {
        e.preventDefault();

        // EmailJS: Sending silently if keys exist. If not, only DB is used.
        setIsSubmitting(true);

        const requestData = {
            topic: formData.topic,
            details: formData.details,
            createdAt: new Date(),
            status: 'pending',
            // Capture User Info if available
            userId: user ? user.uid : 'anonymous',
            userEmail: user ? user.email : 'anonymous',
            userName: user ? (user.displayName || user.name || 'Student') : 'Anonymous'
        };

        try {
            // 1. Save to Firestore
            await addDoc(collection(db, "support_requests"), requestData);

            // 2. Send Email Notification (Only if configured)
            if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
                sendEmailNotification(requestData);
            }

            setSupportSent(true);
            setTimeout(() => {
                setShowSupportModal(false);
                setSupportSent(false);
                setFormData({ topic: '', details: '' });
            }, 3000);
        } catch (error) {
            console.error("Error sending request: ", error);
            alert("Failed to send request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="wellbeing-page">
            <Navbar />
            <main className="container fade-in">
                <header className="wellbeing-header">
                    <h1>Well-being Hub 🧘</h1>
                    <p>Great engineering starts with a healthy mind.</p>
                </header>

                <section className="resource-hub">
                    <h2>Mental Health Resources</h2>
                    <div className="resources-grid">
                        {resources.map((res) => (
                            <div key={res.id} className="resource-card glass">
                                <span className="res-type">{res.type}</span>
                                <h3>{res.title}</h3>
                                <p>Estimated time: {res.time}</p>
                                <button className="btn-read" onClick={() => setActiveResource(res)}>
                                    {res.type === 'Video' ? 'Watch Now' : 'Read Now'}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="support-section glass">
                    <div className="support-content">
                        <h2>Need immediate help?</h2>
                        <p>Our anonymous feedback system connects you with campus counseling. <strong>Anti-Ragging Helpline: 1800-XXX-XXXX</strong></p>
                        <button className="btn-query" onClick={() => setShowSupportModal(true)}>
                            🙋 Request Anonymous Support
                        </button>
                    </div>
                </section>
            </main>

            {/* Content Modal (Same as before) */}
            {activeResource && (
                <div className="modal-overlay" onClick={() => setActiveResource(null)}>
                    <div className="modal-content glass" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setActiveResource(null)}>✕</button>
                        <span className="modal-type">{activeResource.type}</span>
                        <h2>{activeResource.title}</h2>
                        <div className="modal-body">
                            {activeResource.content.split('\n').map((line, i) => (
                                <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Support Modal */}
            {showSupportModal && (
                <div className="modal-overlay" onClick={() => !supportSent && setShowSupportModal(false)}>
                    <div className="modal-content glass" onClick={e => e.stopPropagation()}>
                        {!supportSent ? (
                            <>
                                <button className="close-btn" onClick={() => setShowSupportModal(false)}>✕</button>
                                <h2>Anonymous Support Request</h2>
                                <p className="modal-subtitle">Your identity will remain hidden. A counselor will reach out via the app's secure channel.</p>

                                {/* User Confirmation Badge */}
                                <div className="user-badge" style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0fdf4', borderRadius: '6px', fontSize: '0.85rem', color: '#166534', border: '1px solid #bbf7d0' }}>
                                    Logged in as: <strong>{user ? user.email : 'Guest'}</strong>
                                </div>

                                <form onSubmit={handleSupportSubmit} className="support-form">
                                    <label>What's on your mind?</label>
                                    <select
                                        required
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    >
                                        <option value="">Select a topic...</option>
                                        <option value="stress">Academic Stress</option>
                                        <option value="homesick">Homesickness</option>
                                        <option value="harassment">Harassment / Ragging</option>
                                        <option value="anxiety">Anxiety / Depression</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <label>Details (Optional)</label>
                                    <textarea
                                        placeholder="Share as much or as little as you want..."
                                        value={formData.details}
                                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                    ></textarea>

                                    <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send Request'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="success-message">
                                <div className="checkmark">✓</div>
                                <h3>Request Sent</h3>
                                <p>Help is on the way. You are not alone.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
        .wellbeing-page { min-height: 100vh; background: #f8fafc; padding-bottom: 4rem; }
        .wellbeing-header { margin: 2rem 0; text-align: center; }
        .wellbeing-header h1 { font-size: 2.2rem; color: var(--primary); margin-bottom: 0.5rem; }
        
        .resource-hub h2 { margin-bottom: 1.5rem; color: var(--text-main); text-align: center; }
        .resources-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
        
        .resource-card { 
            padding: 1.5rem; border-radius: 12px; border-left: 5px solid var(--primary); 
            background: white; transition: transform 0.2s;
        }
        .resource-card:hover { transform: translateY(-5px); }
        .res-type { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
        .resource-card h3 { margin: 0.8rem 0; color: var(--text-main); font-size: 1.1rem; line-height: 1.4; }
        .resource-card p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }
        
        .btn-read { 
            background: none; border: 1px solid var(--primary); color: var(--primary); 
            padding: 0.6rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; 
            width: 100%; transition: all 0.2s;
        }
        .btn-read:hover { background: var(--primary); color: white; }

        .support-section { margin-top: 4rem; padding: 3rem 2rem; border-radius: 20px; text-align: center; background: white; border: 1px solid #e2e8f0; }
        .support-content { max-width: 600px; margin: 0 auto; }
        .support-section h2 { margin-bottom: 1rem; color: var(--primary); font-size: 1.5rem; }
        .btn-query { margin-top: 1rem; padding: 0.8rem 1.5rem; background: var(--primary); color: white; border-radius: 50px; font-weight: 600; cursor: pointer; border: none; transition: transform 0.2s; }
        .btn-query:hover { transform: translateY(-2px); background: #1a4316; opacity: 0.9; }
        .btn-primary { padding: 1rem 2rem; background: var(--primary); color: white; border-radius: 8px; font-weight: 600; font-size: 1rem; margin-top: 1.5rem; }
        .btn-primary:hover { background: var(--primary-light); }

        /* Modals */
        .modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5); z-index: 2000;
            display: flex; align-items: center; justify-content: center;
            padding: 1rem; backdrop-filter: blur(4px);
            animation: fadeIn 0.2s ease-out;
        }
        .modal-content {
            background: white; padding: 2.5rem; border-radius: 16px;
            width: 100%; max-width: 600px; max-height: 85vh; overflow-y: auto;
            position: relative; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; }}

        .close-btn { position: absolute; top: 1rem; right: 1rem; font-size: 1.5rem; background: none; color: #94a3b8; }
        .modal-type { color: var(--primary); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }
        .modal-content h2 { margin: 0.5rem 0 1.5rem 0; font-size: 1.5rem; color: var(--text-main); }
        .modal-body p { margin-bottom: 0.8rem; line-height: 1.7; color: var(--text-secondary); }
        .modal-body strong { color: var(--primary); }

        /* Form */
        .modal-subtitle { color: var(--text-muted); margin-bottom: 1.5rem; }
        .support-form { display: flex; flex-direction: column; gap: 1rem; text-align: left; }
        .support-form label { font-weight: 600; color: var(--text-main); font-size: 0.95rem; }
        .support-form select, .support-form textarea {
            padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px;
            font-family: inherit; font-size: 1rem;
        }
        .support-form textarea { height: 100px; resize: vertical; }
        .submit-btn { width: 100%; margin-top: 0.5rem; }

        .success-message { text-align: center; padding: 2rem 0; }
        .checkmark { 
            width: 60px; height: 60px; background: #22c55e; color: white; 
            border-radius: 50%; font-size: 2.5rem; display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1.5rem auto;
        }
      `}</style>
        </div>
    );
};

export default Wellbeing;
