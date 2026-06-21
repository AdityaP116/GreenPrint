import React from 'react';
import Card from '../ui/Card';
import { Sparkles } from 'lucide-react';

export default function InsightsCard({ insights }) {
  return (
    <Card insight className="h-100 flex" style={{ height: '100%', flexDirection: 'column' }}>
      <div className="flex items-center gap-sm mb-md" style={{ color: 'var(--primary)' }}>
        <Sparkles size={20} />
        <h3 className="h3-text" style={{ margin: 0 }}>AI Insights</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {insights.map((insight, idx) => (
          <div key={idx} className="body-sm" style={{ padding: '12px', background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}>
            {insight}
          </div>
        ))}
      </div>
    </Card>
  );
}
