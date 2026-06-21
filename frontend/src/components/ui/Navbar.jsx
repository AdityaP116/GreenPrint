import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav style={{ background: 'var(--surface-container-lowest)', padding: '16px 64px', borderBottom: '1px solid var(--outline-variant)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link to="/" className="h2-text text-primary" style={{ textDecoration: 'none' }}>GreenPrint</Link>
        {currentUser && (
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/" className="label" style={{ color: 'var(--on-surface)', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/roadmap" className="label" style={{ color: 'var(--on-surface)', textDecoration: 'none' }}>Roadmap</Link>
            <Link to="/progress" className="label" style={{ color: 'var(--on-surface)', textDecoration: 'none' }}>Progress</Link>
            <Link to="/achievements" className="label" style={{ color: 'var(--on-surface)', textDecoration: 'none' }}>Achievements</Link>
            <Link to="/reports" className="label" style={{ color: 'var(--on-surface)', textDecoration: 'none' }}>Reports</Link>
          </div>
        )}
      </div>
      <div>
        {currentUser ? (
          <Button variant="ghost" onClick={logout}>Log Out</Button>
        ) : (
          <Link to="/login"><Button variant="primary">Log In</Button></Link>
        )}
      </div>
    </nav>
  );
}
