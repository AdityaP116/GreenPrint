import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      // Wait, we need to create the user profile on the backend, 
      // but for now, just navigate to onboarding
      navigate('/onboarding');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <div className="flex-center" style={{ minHeight: '100vh' }}>
      <Card className="p-xl" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="h2-text text-center mb-lg">Sign Up</h2>
        {error && <div className="text-center mb-md" style={{ color: 'var(--error)' }}>{error}</div>}
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
            className="mb-md"
          />
          <Input 
            label="Confirm Password" 
            type="password" 
            value={passwordConfirm} 
            onChange={(e) => setPasswordConfirm(e.target.value)} 
            required 
            className="mb-lg"
          />
          <Button type="submit" disabled={loading} className="w-100" style={{ width: '100%' }}>
            Sign Up
          </Button>
        </form>
        <div className="text-center mt-md text-secondary">
          Already have an account? <Link to="/login" className="text-primary">Log In</Link>
        </div>
      </Card>
    </div>
  );
}
