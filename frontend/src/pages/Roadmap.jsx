import React from 'react';
import Card from '../components/ui/Card';

export default function Roadmap() {
  const weeks = [
    {
      week: 1,
      title: 'Quick Wins',
      tasks: [
        { id: 1, title: 'Switch to LED bulbs', completed: true, points: 50 },
        { id: 2, title: 'Unplug idle electronics', completed: false, points: 30 },
        { id: 3, title: 'Meatless Monday', completed: false, points: 40 }
      ]
    },
    {
      week: 2,
      title: 'Habit Building',
      tasks: [
        { id: 4, title: 'Bike or walk for short trips', completed: false, points: 60 },
        { id: 5, title: 'Start composting', completed: false, points: 40 }
      ]
    },
    {
      week: 3,
      title: 'Energy Optimization',
      tasks: [
        { id: 6, title: 'Adjust thermostat by 2 degrees', completed: false, points: 50 },
        { id: 7, title: 'Wash clothes in cold water', completed: false, points: 30 }
      ]
    },
    {
      week: 4,
      title: 'Long-term Impact',
      tasks: [
        { id: 8, title: 'Research renewable energy providers', completed: false, points: 100 },
        { id: 9, title: 'Complete first zero-waste grocery trip', completed: false, points: 80 }
      ]
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
      <div className="flex-between mb-xl">
        <h1 className="h1-text">Your 30-Day Roadmap</h1>
        <div className="label text-secondary">Week 1 of 4</div>
      </div>
      
      <div className="grid-12">
        {weeks.map((week, idx) => (
          <div key={idx} style={{ gridColumn: 'span 6' }}>
            <Card className="mb-md h-100">
              <h3 className="h3-text mb-xs">Week {week.week}: {week.title}</h3>
              <div className="flex flex-col gap-sm mt-md" style={{ display: 'flex', flexDirection: 'column' }}>
                {week.tasks.map(task => (
                  <div key={task.id} className="flex-between p-sm" style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input type="checkbox" defaultChecked={task.completed} style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                      <span className={task.completed ? 'text-secondary' : 'text-primary'} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                      </span>
                    </div>
                    <span className="tag" style={{ background: 'var(--surface-container)', color: 'var(--primary)' }}>+{task.points} GP</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
