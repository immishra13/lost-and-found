import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Package, MapPin, Phone, Tag, AlignLeft, ArrowLeft, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const ReportItem = ({ type }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        description: '',
        location: '',
        contactInfo: ''
    });

    const categories = ['Electronics', 'Pets', 'Documents', 'Jewelry', 'Apparel', 'Wallets/Bags', 'Keys', 'Others'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error('Please login to report an item');
        
        setLoading(true);
        try {
            const collectionName = type === 'lost' ? 'lostItems' : 'foundItems';
            await addDoc(collection(db, collectionName), {
                ...formData,
                status: type,
                userId: user.uid,
                createdAt: new Date().toISOString()
            });
            toast.success(`${type === 'lost' ? 'Lost' : 'Found'} item reported successfully!`);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '32px' }}>
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card" 
                style={{ padding: '48px', border: 'none', boxShadow: 'var(--shadow-lg)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                    <div style={{ 
                        background: type === 'lost' ? 'var(--error-soft)' : 'var(--secondary-soft)', 
                        color: type === 'lost' ? 'var(--error)' : 'var(--secondary)',
                        padding: '12px',
                        borderRadius: '12px'
                    }}>
                        <Package size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                            {type === 'lost' ? 'Report Lost Item' : 'Post Found Item'}
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            Please provide as much detail as possible to help the community.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Item Name</label>
                            <div style={{ position: 'relative' }}>
                                <Package size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input 
                                    name="itemName"
                                    type="text" 
                                    placeholder="e.g. iPhone 13 Pro Max" 
                                    className="input" 
                                    style={{ paddingLeft: '48px' }}
                                    value={formData.itemName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Category</label>
                            <div style={{ position: 'relative' }}>
                                <Tag size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <select 
                                    name="category"
                                    className="input" 
                                    style={{ paddingLeft: '48px', appearance: 'none' }}
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Location Details</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                            <input 
                                name="location"
                                type="text"
                                placeholder="e.g. Near Central Park Metro Station" 
                                className="input" 
                                style={{ paddingLeft: '48px' }}
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Description</label>
                        <div style={{ position: 'relative' }}>
                            <AlignLeft size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                            <textarea 
                                name="description"
                                placeholder="Describe the item's condition, color, and unique marks..." 
                                className="input" 
                                style={{ paddingLeft: '48px', minHeight: '120px', resize: 'vertical' }}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Contact Information</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                name="contactInfo"
                                type="text" 
                                placeholder="e.g. Phone number or Social media handle" 
                                className="input" 
                                style={{ paddingLeft: '48px' }}
                                value={formData.contactInfo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary" 
                        style={{ alignSelf: 'flex-start', padding: '14px 48px', fontSize: '1rem' }}
                    >
                        {loading ? 'Submitting...' : 'Submit Report'}
                        {!loading && <Send size={20} />}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ReportItem;
