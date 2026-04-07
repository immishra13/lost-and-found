import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, googleProvider } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { toast } from 'react-toastify';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!isLogin) {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, 'users', res.user.uid), {
                    displayName: name,
                    email: email,
                    uid: res.user.uid,
                    createdAt: new Date().toISOString()
                });
                toast.success('Account created successfully!');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Welcome back!');
            }
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const res = await signInWithPopup(auth, googleProvider);
            await setDoc(doc(db, 'users', res.user.uid), {
                displayName: res.user.displayName,
                email: res.user.email,
                uid: res.user.uid,
                createdAt: new Date().toISOString()
            }, { merge: true });
            toast.success('Logged in with Google!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)', padding: '40px 20px', background: 'var(--bg)' }}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card" 
                style={{ width: '100%', maxWidth: '480px', padding: '48px', border: 'none', background: 'var(--surface)', boxShadow: 'var(--shadow-lg)' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '12px' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {isLogin ? 'Recover your lost items or help others find theirs.' : 'Join the TraceIt community to help recover lost items.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {!isLogin && (
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                className="input" 
                                style={{ paddingLeft: '48px' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            className="input" 
                            style={{ paddingLeft: '48px' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="input" 
                            style={{ paddingLeft: '48px' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary" 
                        style={{ height: '52px', fontSize: '1rem', width: '100%' }}
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Login to TraceIt' : 'Create Account')}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                <div style={{ position: 'relative', margin: '32px 0', textAlign: 'center' }}>
                    <hr style={{ border: '0', borderTop: '1px solid var(--border)' }} />
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--surface)', padding: '0 16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        OR CONTINUE WITH
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <button 
                        onClick={handleGoogleLogin} 
                        disabled={loading}
                        className="btn" 
                        style={{ flex: 1, border: '1px solid var(--border)', background: 'white', color: 'var(--text-main)' }}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '20px' }} />
                        Google
                    </button>
                </div>

                <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'} {' '}
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        style={{ color: 'var(--primary)', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default Auth;
