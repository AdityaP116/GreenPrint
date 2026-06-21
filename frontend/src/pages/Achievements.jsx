import React from 'react';
import Card from '../components/ui/Card';

export default function Achievements() {
  const badges = [
    { id: 1, name: 'First Step', desc: 'Completed onboarding quiz', icon: '🌱', unlocked: true },
    { id: 2, name: 'Energy Saver', desc: 'Reduced energy footprint by 10%', icon: '⚡', unlocked: true },
    { id: 3, name: 'Plant Based', desc: 'Ate vegetarian for a week', icon: '🥗', unlocked: false },
    { id: 4, name: 'Zero Waste', desc: 'Composted for 30 days straight', icon: '♻️', unlocked: false },
    { id: 5, name: 'Transit Hero', desc: 'Took public transit 10 times', icon: '🚌', unlocked: false },
    { id: 6, name: 'Climate Champion', desc: 'Reached a carbon score of 90+', icon: '🌍', unlocked: false },
  ];

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
      <div className="flex-between mb-xl">
        <h1 className="h1-text">Achievements & Challenges</h1>
        <div className="tag" style={{ background: 'var(--primary)', color: 'white', fontSize: '14px', padding: '8px 16px' }}>
          80 Green Points
        </div>
      </div>

      <div className="grid-12">
        {badges.map(badge => (
          <div key={badge.id} style={{ gridColumn: 'span 4' }}>
            <Card className="text-center h-100 flex-center" style={{ flexDirection: 'column', opacity: badge.unlocked ? 1 : 0.5 }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{badge.icon}</div>
              <h3 className="h3-text mb-xs">{badge.name}</h3>
              <p className="body-sm text-secondary mb-md">{badge.desc}</p>
              {badge.unlocked ? (
                <span className="label text-primary">Unlocked!</span>
              ) : (
                <span className="label text-secondary">Locked</span>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
