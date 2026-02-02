import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        universityId: ''
    });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            alert('Registration failed.');
        }
    };

    return (
        <div className="login-container fade-in">
            <div className="glass login-card">
                <h1>Join Campus Compass</h1>
                <p>Start your engineering journey with clarity.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" onChange={handleChange} placeholder="e.g. Alex Smith" required />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" onChange={handleChange} placeholder="alex@university.edu" required />
                    </div>
                    <div className="form-group">
                        <label>University ID</label>
                        <input type="text" name="universityId" onChange={handleChange} placeholder="ENG123456" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" onChange={handleChange} placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="btn-primary">Create Account</button>
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>

            <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          padding: 2rem;
        }
        .login-card {
          padding: 3rem;
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 500px;
          text-align: center;
        }
        h1 { color: var(--primary); margin-bottom: 0.5rem; }
        p { color: var(--text-muted); margin-bottom: 2rem; }
        .form-group { text-align: left; margin-bottom: 1.2rem; }
        label { display: block; margin-bottom: 0.4rem; font-weight: 600; font-size: 0.9rem; }
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

export default Register;
