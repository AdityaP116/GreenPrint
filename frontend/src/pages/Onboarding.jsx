import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [responses, setResponses] = useState({
    transport: { mode: 'car_gasoline', kmPerMonth: 500, flightsShort: 0, flightsLong: 0 },
    energy: { source: 'mixed_grid', kwhPerMonth: 300 },
    diet: 'average',
    shopping: 'average',
    waste: 'average'
  });

  const updateResponse = (category, field, value) => {
    if (field) {
      setResponses(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value
        }
      }));
    } else {
      setResponses(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    // In a real app, send to /api/assessments/submit
    // For now, mock the delay and navigate
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="container" style={{ paddingTop: '64px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="mb-lg">
          <div className="flex-between mb-sm">
            <span className="label text-secondary">Step {step} of 5</span>
            <span className="label text-primary">{step * 20}%</span>
          </div>
          <div style={{ height: '8px', background: 'var(--surface-container-high)', borderRadius: '4px' }}>
            <div style={{ height: '100%', width: `${step * 20}%`, background: 'var(--primary)', borderRadius: '4px', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>

        <Card className="p-xl">
          {step === 1 && (
            <div>
              <h2 className="h2-text mb-md">How do you usually get around?</h2>
              <div className="mb-lg">
                <label className="label mb-sm" style={{ display: 'block' }}>Primary Transport Mode</label>
                <select 
                  className="input-field mb-md"
                  value={responses.transport.mode}
                  onChange={(e) => updateResponse('transport', 'mode', e.target.value)}
                >
                  <option value="car_gasoline">Gasoline Car</option>
                  <option value="car_electric">Electric Car</option>
                  <option value="public_transit">Public Transit</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="walking">Walking</option>
                </select>

                <label className="label mb-sm" style={{ display: 'block' }}>Distance per month (km)</label>
                <input 
                  type="number" 
                  className="input-field mb-md"
                  value={responses.transport.kmPerMonth}
                  onChange={(e) => updateResponse('transport', 'kmPerMonth', Number(e.target.value))}
                />

                <label className="label mb-sm" style={{ display: 'block' }}>Short Flights (per year)</label>
                <input 
                  type="number" 
                  className="input-field mb-md"
                  value={responses.transport.flightsShort}
                  onChange={(e) => updateResponse('transport', 'flightsShort', Number(e.target.value))}
                />

                <label className="label mb-sm" style={{ display: 'block' }}>Long Flights (per year)</label>
                <input 
                  type="number" 
                  className="input-field"
                  value={responses.transport.flightsLong}
                  onChange={(e) => updateResponse('transport', 'flightsLong', Number(e.target.value))}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="h2-text mb-md">Tell us about your home energy</h2>
              <div className="mb-lg">
                <label className="label mb-sm" style={{ display: 'block' }}>Primary Energy Source</label>
                <select 
                  className="input-field mb-md"
                  value={responses.energy.source}
                  onChange={(e) => updateResponse('energy', 'source', e.target.value)}
                >
                  <option value="mixed_grid">Mixed Grid (Standard)</option>
                  <option value="renewable">100% Renewable</option>
                  <option value="natural_gas">Natural Gas Heavy</option>
                  <option value="coal">Coal Heavy</option>
                </select>

                <label className="label mb-sm" style={{ display: 'block' }}>Monthly Usage (kWh)</label>
                <input 
                  type="number" 
                  className="input-field"
                  value={responses.energy.kwhPerMonth}
                  onChange={(e) => updateResponse('energy', 'kwhPerMonth', Number(e.target.value))}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="h2-text mb-md">What's your typical diet?</h2>
              <div className="mb-lg flex" style={{ flexDirection: 'column', gap: '12px' }}>
                {['meat_heavy', 'average', 'vegetarian', 'vegan'].map(opt => (
                  <button 
                    key={opt}
                    type="button"
                    className={`input-field text-left ${responses.diet === opt ? 'selected' : ''}`}
                    style={{ 
                      borderColor: responses.diet === opt ? 'var(--primary)' : 'var(--outline-variant)',
                      backgroundColor: responses.diet === opt ? 'rgba(22, 163, 74, 0.05)' : 'white',
                      cursor: 'pointer'
                    }}
                    onClick={() => updateResponse('diet', null, opt)}
                  >
                    {opt.replace('_', ' ').charAt(0).toUpperCase() + opt.replace('_', ' ').slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="h2-text mb-md">How often do you shop for non-essentials?</h2>
              <div className="mb-lg flex" style={{ flexDirection: 'column', gap: '12px' }}>
                {['frequent', 'average', 'minimal'].map(opt => (
                  <button 
                    key={opt}
                    type="button"
                    className={`input-field text-left ${responses.shopping === opt ? 'selected' : ''}`}
                    style={{ 
                      borderColor: responses.shopping === opt ? 'var(--primary)' : 'var(--outline-variant)',
                      backgroundColor: responses.shopping === opt ? 'rgba(22, 163, 74, 0.05)' : 'white',
                      cursor: 'pointer'
                    }}
                    onClick={() => updateResponse('shopping', null, opt)}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="h2-text mb-md">How much waste do you generate?</h2>
              <div className="mb-lg flex" style={{ flexDirection: 'column', gap: '12px' }}>
                {['high', 'average', 'low'].map(opt => (
                  <button 
                    key={opt}
                    type="button"
                    className={`input-field text-left ${responses.waste === opt ? 'selected' : ''}`}
                    style={{ 
                      borderColor: responses.waste === opt ? 'var(--primary)' : 'var(--outline-variant)',
                      backgroundColor: responses.waste === opt ? 'rgba(22, 163, 74, 0.05)' : 'white',
                      cursor: 'pointer'
                    }}
                    onClick={() => updateResponse('waste', null, opt)}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex-between mt-xl">
            <Button variant="ghost" onClick={handlePrev} disabled={step === 1}>Back</Button>
            {step < 5 ? (
              <Button variant="primary" onClick={handleNext}>Next</Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Calculating...' : 'See Results'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
