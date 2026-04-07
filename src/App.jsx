import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ReportItem from './pages/ReportItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 80px)' }}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/report-lost" element={<ReportItem type="lost" />} />
                        <Route path="/post-found" element={<ReportItem type="found" />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
                <ToastContainer position="bottom-right" theme="light" />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
