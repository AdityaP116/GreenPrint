import React from 'react';
import Card from '../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function BreakdownChart({ categories, total }) {
  const data = [
    { name: 'Transport', value: categories.transport, color: 'var(--cat-transport)' },
    { name: 'Energy', value: categories.energy, color: 'var(--cat-energy)' },
    { name: 'Diet', value: categories.diet, color: 'var(--cat-diet)' },
    { name: 'Shopping', value: categories.shopping, color: 'var(--cat-shopping)' },
    { name: 'Waste', value: categories.waste, color: 'var(--cat-waste)' },
  ];

  return (
    <Card className="h-100" style={{ height: '100%' }}>
      <h3 className="h3-text mb-md">Monthly Footprint: {total} kg CO2e</h3>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-ambient)' }}
              itemStyle={{ color: 'var(--on-surface)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
