import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PlusSquare, LayoutDashboard, LogOut, User, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/auth');
    };

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            padding: '16px 0',
            backdropFilter: 'blur(8px)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <div style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '6px',
                        borderRadius: '10px',
                        display: 'flex'
                    }}>
                        <Search size={22} />
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                        TraceIt
                    </span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <Link to="/" className="btn-ghost" style={{ fontSize: '0.95rem', fontWeight: '500' }}>Explore</Link>
                    {user && (
                        <>
                            <Link to="/dashboard" className="btn-ghost" style={{ fontSize: '0.95rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                            <Link to="/report-lost" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem', textDecoration: 'none' }}>Report Lost</Link>
                            <Link to="/post-found" style={{ color: 'var(--secondary)', fontWeight: '600', fontSize: '0.95rem', textDecoration: 'none' }}>Post Found</Link>
                        </>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--bg)', borderRadius: '12px' }}>
                                <User size={18} color="var(--text-muted)" />
                                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.displayName || user.email.split('@')[0]}</span>
                            </div>
                            <button onClick={handleLogout} className="btn-ghost" style={{ color: '#ef4444', padding: '8px' }}>
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/auth" className="btn btn-primary" style={{ padding: '8px 24px' }}>Get Started</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
