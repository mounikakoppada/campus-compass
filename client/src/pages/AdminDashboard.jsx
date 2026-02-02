import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { db, collection, getDocs, query, orderBy, updateDoc, doc } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- HARDCODED ADMINS ---
    // Add more emails here correctly to grant access
    const ADMIN_EMAILS = ['optimusprimecoc99@gmail.com', 'admin@campuscompass.com'];

    useEffect(() => {
        if (!loading) {
            if (!user || !ADMIN_EMAILS.includes(user.email)) {
                alert("Access Denied: Admins Only.");
                navigate('/dashboard');
                return;
            }
            fetchRequests();
        }
    }, [user, loading, navigate]);

    const fetchRequests = async () => {
        try {
            const q = query(collection(db, "support_requests"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRequests(data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsResolved = async (id) => {
        try {
            const reqRef = doc(db, "support_requests", id);
            await updateDoc(reqRef, { status: 'resolved' });
            // Update local state to reflect change instantly
            setRequests(requests.map(req => req.id === id ? { ...req, status: 'resolved' } : req));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (loading || isLoading) return <div className="loading">Loading Admin Panel...</div>;

    return (
        <div className="admin-page">
            <Navbar />
            <div className="container content-wrap">
                <header className="admin-header">
                    <h1>🛡️ Counselor Dashboard</h1>
                    <p>Confidential Support Requests</p>
                </header>

                <div className="table-container glass">
                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Topic</th>
                                <th>Student (Email)</th>
                                <th>Details</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No pending requests.</td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req.id} className={req.status === 'resolved' ? 'resolved-row' : ''}>
                                        <td>{req.createdAt?.seconds ? new Date(req.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}</td>
                                        <td>
                                            <span className={`tag ${req.topic}`}>{req.topic}</span>
                                        </td>
                                        <td>
                                            <div className="student-info">
                                                <strong>{req.userName || 'Anonymous'}</strong>
                                                <span>{req.userEmail || 'No Email Tracked'}</span>
                                            </div>
                                        </td>
                                        <td className="details-cell">{req.details}</td>
                                        <td>
                                            <span className={`status-badge ${req.status}`}>{req.status.toUpperCase()}</span>
                                        </td>
                                        <td>
                                            {req.status !== 'resolved' && (
                                                <button className="btn-resolve" onClick={() => markAsResolved(req.id)}>Done ✓</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
        .admin-page { min-height: 100vh; background: #f1f5f9; }
        .content-wrap { padding: 2rem 1rem; max-width: 1200px; }
        
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .admin-header h1 { color: var(--primary); font-size: 1.8rem; }

        .table-container { overflow-x: auto; background: white; border-radius: 12px; padding: 1rem; }
        .requests-table { width: 100%; border-collapse: collapse; min-width: 800px; }
        
        .requests-table th { text-align: left; padding: 1rem; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; }
        .requests-table td { padding: 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: top; color: var(--text-main); font-size: 0.95rem; }
        
        .student-info { display: flex; flex-direction: column; }
        .student-info span { font-size: 0.8rem; color: var(--text-muted); }

        .tag { padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; text-transform: capitalize; }
        .tag.stress { background: #fee2e2; color: #991b1b; }
        .tag.homesick { background: #e0f2fe; color: #075985; }
        .tag.harassment { background: #fef9c3; color: #854d0e; }
        .tag.anxiety { background: #f3e8ff; color: #6b21a8; }
        
        .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .status-badge.pending { background: #fff7ed; color: #c2410c; border: 1px solid #ffedd5; }
        .status-badge.resolved { background: #eff6ff; color: #1e3a8a; border: 1px solid #dbeafe; }

        .btn-resolve { 
            background: #22c55e; color: white; border: none; padding: 0.4rem 0.8rem; 
            border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600;
        }
        .btn-resolve:hover { background: #16a34a; }

        .resolved-row { opacity: 0.6; background: #f8fafc; }
        .details-cell { max-width: 300px; white-space: pre-wrap; }
        
        .loading { display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 1.2rem; color: var(--text-muted); }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
