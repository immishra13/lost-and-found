import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User, Phone, Tag, Trash2, ExternalLink } from 'lucide-react';

const ItemCard = ({ item, isOwner, onDelete }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card" 
            style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                position: 'relative',
                padding: '28px'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className={`badge ${item.status === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                    {item.status}
                </span>
                {isOwner && (
                    <button 
                        onClick={() => onDelete(item.id)}
                        className="btn-ghost"
                        style={{ padding: '6px', color: 'var(--error)' }}
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>

            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
                    {item.itemName}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem' }}>
                    <Tag size={14} />
                    {item.category}
                </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>
                {item.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <MapPin size={16} />
                    {item.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Calendar size={16} />
                    {formatDate(item.createdAt)}
                </div>
            </div>

            <div style={{ 
                marginTop: '12px', 
                padding: '16px', 
                background: 'var(--bg)', 
                borderRadius: '12px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
                    <User size={14} />
                    Contact Info
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-main)', wordBreak: 'break-all' }}>
                    <Phone size={14} color="var(--text-muted)" />
                    {item.contactInfo}
                </div>
            </div>
        </motion.div>
    );
};

export default ItemCard;
