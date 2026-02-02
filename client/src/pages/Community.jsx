import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getDiscussions, createDiscussion } from '../services/firebaseService';
import Navbar from '../components/Navbar';

const Community = () => {
    const [discussions, setDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '', category: 'academic' });
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchDiscussions = async () => {
            const data = await getDiscussions();
            setDiscussions(data);
        };
        fetchDiscussions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const discussion = await createDiscussion({
            ...newDiscussion,
            authorId: user.uid,
            authorName: user.name || user.email
        });
        setDiscussions([discussion, ...discussions]);
        setNewDiscussion({ title: '', content: '', category: 'academic' });
    };

    return (
        <div className="community-page">
            <Navbar />
            <main className="container fade-in">
                <header className="community-header">
                    <h1>Peer & Mentor Interaction</h1>
                    <p>Connect with seniors and peers to ease your engineering journey.</p>
                </header>

                <div className="community-content">
                    <section className="discussion-form glass">
                        <h3>Start a Discussion</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Topic Title"
                                value={newDiscussion.title}
                                onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="What's on your mind?"
                                value={newDiscussion.content}
                                onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                                required
                            />
                            <select
                                value={newDiscussion.category}
                                onChange={(e) => setNewDiscussion({ ...newDiscussion, category: e.target.value })}
                            >
                                <option value="academic">Academic Support</option>
                                <option value="fresher-queries">First Year Queries</option>
                                <option value="social">Social & Campus Life</option>
                                <option value="mentor-qa">Mentor Q&A</option>
                            </select>
                            <button type="submit" className="btn-primary">Post Discussion</button>
                        </form>
                    </section>

                    <section className="discussion-list">
                        <h3>Recent Discussions</h3>
                        <div className="discussions-grid">
                            {discussions.map((d) => (
                                <div key={d.id} className="discussion-card glass">
                                    <div className="d-header">
                                        <span className={`category-tag ${d.category}`}>{d.category.replace('-', ' ')}</span>
                                        <span className="author">by {d.authorName || 'Anonymous'}</span>
                                    </div>
                                    <h4>{d.title}</h4>
                                    <p>{d.content.substring(0, 120)}...</p>
                                    <div className="d-footer">
                                        <span>{d.replies?.length || 0} replies</span>
                                        <button className="btn-text">View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <style jsx>{`
        .community-page { min-height: 100vh; background: var(--bg-main); padding-bottom: 4rem; }
        .community-header { margin: 2rem 0; text-align: center; }
        .community-header h1 { font-size: 2.2rem; color: var(--primary); }

        .community-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
        }

        @media (min-width: 769px) {
          .community-content {
            grid-template-columns: 350px 1fr;
          }
        }

        .discussion-form { padding: 1.5rem; border-radius: var(--radius-md); }
        .discussion-form form { display: flex; flex-direction: column; gap: 1rem; }
        .discussion-form input, .discussion-form textarea, .discussion-form select {
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
          font-size: 1rem;
        }
        .discussion-form textarea { height: 100px; resize: none; }

        .discussions-grid { display: flex; flex-direction: column; gap: 1rem; }
        .discussion-card { padding: 1.25rem; border-radius: var(--radius-md); }
        .d-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem; }
        .category-tag { font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 10px; font-weight: 700; text-transform: uppercase; background: #eee; }
        .mentor-qa { background: var(--accent); color: white; }
        .fresher-queries { background: #FF9800; color: white; }
        .academic { background: var(--primary); color: white; }
        
        .author { font-size: 0.75rem; color: var(--text-muted); }
        h4 { margin-bottom: 0.5rem; color: var(--text-main); font-size: 1.1rem; }
        .discussion-card p { font-size: 0.9rem; color: var(--text-muted); }
        .d-footer { display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted); }
        .btn-text { background: none; border: none; color: var(--accent); font-weight: 600; padding: 0; }
      `}</style>
        </div>
    );
};

export default Community;
