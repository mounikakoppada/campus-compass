import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container fade-in">
            <div className="glass login-card">
                <h1>Campus Compass</h1>
                <p>Welcome back, future engineer.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. alex@university.edu"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Sign In</button>
                </form>
                <p className="auth-footer">
                    New here? <Link to="/register">Create an account</Link>
                </p>
            </div>

            <style jsx>{`
        .login-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
        }
        .login-card {
          padding: 3rem;
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 450px;
          text-align: center;
        }
        h1 { color: var(--primary); margin-bottom: 0.5rem; }
        p { color: var(--text-muted); margin-bottom: 2rem; }
        .form-group { text-align: left; margin-bottom: 1.5rem; }
        label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem; }
        input {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid #ddd;
          background: rgba(255,255,255,0.9);
        }
        .btn-primary {
          width: 100%;
          padding: 1rem;
          background: var(--primary);
          color: white;
          border-radius: var(--radius-sm);
          font-weight: 600;
          margin-top: 1rem;
        }
        .btn-primary:hover { background: var(--primary-light); transform: translateY(-2px); }
        .auth-footer { margin-top: 1.5rem; font-size: 0.9rem; }
        .auth-footer a { color: var(--accent); font-weight: 600; }
      `}</style>
        </div>
    );
};

export default Login;
