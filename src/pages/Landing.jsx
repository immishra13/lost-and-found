import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Shield, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
    return (
        <div style={{ background: 'var(--surface)' }}>
            {/* Hero Section */}
            <section style={{ 
                padding: '100px 0 80px',
                background: 'linear-gradient(180deg, var(--primary-soft) 0%, var(--surface) 100%)',
                textAlign: 'center'
            }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 style={{ fontSize: '4rem', color: 'var(--text-main)', marginBottom: '24px', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                            Find What <span style={{ color: 'var(--primary)' }}>Was Lost</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                            A modern, community-driven platform to report lost items and return found ones. Helping people reunite with their belongings.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <Link to="/report-lost" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
                                Report Lost Item
                            </Link>
                            <Link to="/auth" className="btn btn-ghost" style={{ border: '1px solid var(--border)', padding: '14px 32px', fontSize: '1.1rem' }}>
                                Join the Community
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How it Works Section */}
            <section style={{ padding: '100px 0', background: 'var(--bg)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>How TraceIt Works</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Simple steps to recover your items or help others.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                        {[
                            { icon: <Search size={32} />, title: "Report Lost Items", desc: "List your missing items with detailed descriptions and locations to alert the community." },
                            { icon: <Shield size={32} />, title: "Post Found Items", desc: "Found something? Post it here and we'll help match it with potential owners securely." },
                            { icon: <Clock size={32} />, title: "Search & Recover", desc: "Browse the community listings using smart filters and get in touch with finders." }
                        ].map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -8 }}
                                className="card" 
                                style={{ textAlign: 'center', padding: '40px' }}
                            >
                                <div style={{ 
                                    width: '64px', 
                                    height: '64px', 
                                    background: 'var(--primary-soft)', 
                                    color: 'var(--primary)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 24px'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTAs Section */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="card" style={{ 
                        background: 'var(--primary)', 
                        color: 'white', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '60px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{ maxWidth: '500px', zIndex: 1 }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Ready to help out?</h2>
                            <p style={{ opacity: 0.9, marginBottom: '32px' }}>Join thousands of community members helping each other every day.</p>
                            <Link to="/auth" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '14px 32px' }}>
                                Create Free Account <ArrowRight size={20} />
                            </Link>
                        </div>
                        <div style={{ position: 'absolute', right: '-50px', top: '0', opacity: 0.1 }}>
                            <Search size={300} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
