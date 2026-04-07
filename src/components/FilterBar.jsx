import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const FilterBar = ({ 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory,
    activeTab,
    setActiveTab 
}) => {
    const categories = ['All', 'Electronics', 'Pets', 'Documents', 'Jewelry', 'Apparel', 'Wallets/Bags', 'Keys', 'Others'];

    return (
        <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Tab Switcher */}
            <div style={{ 
                display: 'flex', 
                background: 'var(--primary-soft)', 
                padding: '6px', 
                borderRadius: '14px',
                width: 'fit-content'
            }}>
                <button 
                    onClick={() => setActiveTab('lost')}
                    className="btn"
                    style={{ 
                        background: activeTab === 'lost' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'lost' ? 'white' : 'var(--primary)',
                        padding: '8px 24px',
                        borderRadius: '10px'
                    }}
                >
                    Lost Items
                </button>
                <button 
                    onClick={() => setActiveTab('found')}
                    className="btn"
                    style={{ 
                        background: activeTab === 'found' ? 'var(--secondary)' : 'transparent',
                        color: activeTab === 'found' ? 'white' : 'var(--secondary)',
                        padding: '8px 24px',
                        borderRadius: '10px'
                    }}
                >
                    Found Items
                </button>
            </div>

            {/* Search and Category Filter */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                        type="text" 
                        placeholder="Search items by name..." 
                        className="input"
                        style={{ paddingLeft: '48px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', paddingBottom: '8px', WebkitOverflowScrolling: 'touch' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '12px',
                                border: '1px solid',
                                borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border)',
                                background: selectedCategory === cat ? 'var(--primary-soft)' : 'var(--surface)',
                                color: selectedCategory === cat ? 'var(--primary)' : 'var(--text-muted)',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
