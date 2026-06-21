import React from 'react';
import Card from '../components/ui/Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Progress() {
  const data = [
    { month: 'Jan', score: 45, footprint: 800 },
    { month: 'Feb', score: 50, footprint: 750 },
    { month: 'Mar', score: 62, footprint: 620 },
    { month: 'Apr', score: 68, footprint: 580 },
    { month: 'May', score: 75, footprint: 500 },
    { month: 'Jun', score: 78, footprint: 450 },
  ];

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
      <h1 className="h1-text mb-xl">Progress & Goals</h1>
      
      <div className="grid-12 mb-xl">
        <div style={{ gridColumn: 'span 4' }}>
          <Card className="text-center h-100 flex-center" style={{ flexDirection: 'column' }}>
            <h3 className="label text-secondary mb-xs">Current Goal</h3>
            <div className="hero-text text-primary mb-sm">20%</div>
            <p className="body-sm text-secondary">Reduction by end of year</p>
          </Card>
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <Card className="text-center h-100 flex-center" style={{ flexDirection: 'column' }}>
            <h3 className="label text-secondary mb-xs">Total Saved</h3>
            <div className="hero-text text-primary mb-sm">350</div>
            <p className="body-sm text-secondary">kg CO2e this year</p>
          </Card>
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <Card className="text-center h-100 flex-center" style={{ flexDirection: 'column' }}>
            <h3 className="label text-secondary mb-xs">Current Score</h3>
            <div className="hero-text text-primary mb-sm">78</div>
            <p className="body-sm text-secondary">Top 15% of users</p>
          </Card>
        </div>
      </div>

      <Card>
        <h3 className="h3-text mb-lg">Carbon Score History</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" tick={{fill: 'var(--on-surface-variant)'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: 'var(--on-surface-variant)'}} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-ambient)' }}
              />
              <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={4} dot={{ r: 6, fill: 'var(--primary)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
