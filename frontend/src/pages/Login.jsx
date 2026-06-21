import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <div className="flex-center" style={{ minHeight: '100vh' }}>
      <Card className="p-xl" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="h2-text text-center mb-lg">Log In</h2>
        {error && <div className="text-center" style={{ color: 'var(--error)' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <Input 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="mb-md"
          />
          <Input 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="mb-lg"
          />
          <Button type="submit" disabled={loading} className="w-100" style={{ width: '100%' }}>
            Log In
          </Button>
        </form>
        <div className="text-center mt-md text-secondary">
          Need an account? <Link to="/signup" className="text-primary">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
}
