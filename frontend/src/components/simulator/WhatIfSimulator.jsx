import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function WhatIfSimulator({ initialCategories }) {
  const [reductions, setReductions] = useState({
    transport: 0,
    energy: 0,
    diet: 0,
    shopping: 0,
    waste: 0
  });

  const [projected, setProjected] = useState([]);

  useEffect(() => {
    const currentTotal = Object.values(initialCategories).reduce((a, b) => a + b, 0);
    const newTransport = initialCategories.transport * (1 - reductions.transport / 100);
    const newEnergy = initialCategories.energy * (1 - reductions.energy / 100);
    const newDiet = initialCategories.diet * (1 - reductions.diet / 100);
    const newShopping = initialCategories.shopping * (1 - reductions.shopping / 100);
    const newWaste = initialCategories.waste * (1 - reductions.waste / 100);
    const newTotal = newTransport + newEnergy + newDiet + newShopping + newWaste;

    setProjected([
      { name: 'Current', total: currentTotal, fill: 'var(--outline-variant)' },
      { name: 'Projected', total: Math.round(newTotal), fill: 'var(--primary)' }
    ]);
  }, [initialCategories, reductions]);

  const handleSliderChange = (cat, val) => {
    setReductions(prev => ({ ...prev, [cat]: val }));
  };

  const getSavings = () => {
    const currentTotal = Object.values(initialCategories).reduce((a, b) => a + b, 0);
    return Math.round(currentTotal - projected[1]?.total);
  };

  return (
    <Card>
      <div className="flex-between mb-md">
        <h2 className="h2-text">What-If Simulator</h2>
        <div className="tag" style={{ backgroundColor: 'var(--surface-container)', color: 'var(--primary)' }}>
          Potential Savings: -{getSavings()} kg CO2e
        </div>
      </div>
      <p className="text-secondary mb-lg">Move the sliders to see how lifestyle changes could impact your footprint.</p>
      
      <div className="grid-12">
        <div style={{ gridColumn: 'span 7' }}>
          {Object.keys(initialCategories).map(cat => (
            <div key={cat} className="mb-md">
              <div className="flex-between mb-sm">
                <span className="label capitalize" style={{ textTransform: 'capitalize' }}>
                  Reduce {cat} by {reductions[cat]}%
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={reductions[cat]}
                onChange={(e) => handleSliderChange(cat, parseInt(e.target.value))}
                style={{ width: '100%', accentColor: `var(--cat-${cat})` }}
              />
            </div>
          ))}
        </div>
        
        <div style={{ gridColumn: 'span 5', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projected} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{fill: 'var(--on-surface-variant)'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: 'var(--on-surface-variant)'}} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-ambient)' }}
              />
              <Bar dataKey="total" radius={[8, 8, 0, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
