import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import BreakdownChart from '../components/dashboard/BreakdownChart';
import InsightsCard from '../components/dashboard/InsightsCard';
import WhatIfSimulator from '../components/simulator/WhatIfSimulator';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);

  // Mock data for hackathon
  useEffect(() => {
    setData({
      score: 78,
      monthlyTotal: 450,
      persona: 'Urban Cyclist',
      categories: {
        transport: 120,
        energy: 150,
        diet: 80,
        shopping: 60,
        waste: 40
      },
      insights: [
        'Your largest emission source is Energy. Consider switching to renewable sources.',
        'You are doing great on Transport compared to average users!'
      ]
    });
  }, []);

  if (!data) return <div className="container mt-xl text-center">Loading...</div>;

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
      <header className="flex-between mb-xl">
        <div>
          <h1 className="h1-text">Hello, {currentUser?.email?.split('@')[0] || 'Eco Warrior'}</h1>
          <p className="text-secondary">Persona: <span className="text-primary font-bold">{data.persona}</span></p>
        </div>
        <div className="text-right">
          <div className="label text-secondary mb-xs">Carbon Score</div>
          <div className="hero-text text-primary">{data.score}</div>
        </div>
      </header>

      <div className="grid-12 mb-xl">
        <div style={{ gridColumn: 'span 8' }}>
          <BreakdownChart categories={data.categories} total={data.monthlyTotal} />
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <InsightsCard insights={data.insights} />
        </div>
      </div>

      <div className="grid-12">
        <div style={{ gridColumn: 'span 12' }}>
          <WhatIfSimulator initialCategories={data.categories} />
        </div>
      </div>
    </div>
  );
}
