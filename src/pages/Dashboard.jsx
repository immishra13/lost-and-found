import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';
import FilterBar from '../components/FilterBar';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Package, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const [lostItems, setLostItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filter states
    const [activeTab, setActiveTab] = useState('lost');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const qLost = query(collection(db, 'lostItems'), orderBy('createdAt', 'desc'));
        const qFound = query(collection(db, 'foundItems'), orderBy('createdAt', 'desc'));

        const unsubLost = onSnapshot(qLost, (snapshot) => {
            setLostItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            if (activeTab === 'lost') setLoading(false);
        });

        const unsubFound = onSnapshot(qFound, (snapshot) => {
            setFoundItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            if (activeTab === 'found') setLoading(false);
        });

        return () => {
            unsubLost();
            unsubFound();
        };
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this report?')) return;
        
        try {
            const collectionName = activeTab === 'lost' ? 'lostItems' : 'foundItems';
            await deleteDoc(doc(db, collectionName, id));
            toast.success('Report deleted successfully');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getFilteredItems = () => {
        const items = activeTab === 'lost' ? lostItems : foundItems;
        return items.filter(item => {
            const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    };

    const filteredItems = getFilteredItems();

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', gap: '20px', flexWrap: 'wrap' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px' }}>Community Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Help the community by reporting what you find or search for your lost belongings.</p>
                </div>
                {user ? (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link to={activeTab === 'lost' ? "/report-lost" : "/post-found"} className="btn btn-primary" style={{ padding: '12px 24px' }}>
                            <Plus size={20} /> {activeTab === 'lost' ? 'Report Lost' : 'Post Found'}
                        </Link>
                    </div>
                ) : (
                    <Link to="/auth" className="btn btn-primary" style={{ padding: '12px 24px' }}>Login to Post</Link>
                )}
            </div>

            <FilterBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px' }}>
                    <div style={{ 
                        border: '4px solid var(--primary-soft)', 
                        borderTop: '4px solid var(--primary)', 
                        borderRadius: '50%', 
                        width: '40px', 
                        height: '40px', 
                        animation: 'spin 1s linear infinite', 
                        margin: '0 auto' 
                    }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                        gap: '24px',
                        marginBottom: '60px'
                    }}>
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item) => (
                                <ItemCard 
                                    key={item.id} 
                                    item={item} 
                                    isOwner={user?.uid === item.userId}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredItems.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '120px 20px', background: 'var(--surface)', borderRadius: '30px', border: '1px dashed var(--border)' }}>
                            <Package size={64} style={{ color: 'var(--border)', marginBottom: '24px' }} strokeWidth={1} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No items found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters to find what you're looking for.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
