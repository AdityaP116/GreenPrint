// Carbon Engine - Local Rule-Based Emissions Calculator
// Calculates kg CO2e per month

const EMISSION_FACTORS = {
  transport: {
    car_gasoline: 0.25, // kg CO2e per km
    car_electric: 0.05, // kg CO2e per km
    public_transit: 0.08, // kg CO2e per km
    bicycle: 0,
    walking: 0,
    flight_short: 150, // kg CO2e per flight
    flight_long: 800, // kg CO2e per flight
  },
  energy: {
    coal: 0.9, // kg CO2e per kWh
    natural_gas: 0.4, // kg CO2e per kWh
    mixed_grid: 0.5, // kg CO2e per kWh
    renewable: 0.05, // kg CO2e per kWh
  },
  diet: {
    meat_heavy: 250, // kg CO2e per month
    average: 150,
    vegetarian: 100,
    vegan: 70,
  },
  shopping: {
    frequent: 200, // kg CO2e per month
    average: 100,
    minimal: 50,
  },
  waste: {
    high: 50, // kg CO2e per month
    average: 20,
    low: 5,
  }
};

const calculateFootprint = (responses) => {
  let transportEmissions = 0;
  if (responses.transport) {
    const mode = responses.transport.mode || 'car_gasoline';
    const kmPerMonth = responses.transport.kmPerMonth || 0;
    transportEmissions += (EMISSION_FACTORS.transport[mode] || 0) * kmPerMonth;
    
    if (responses.transport.flightsShort) {
      transportEmissions += responses.transport.flightsShort * EMISSION_FACTORS.transport.flight_short;
    }
    if (responses.transport.flightsLong) {
      transportEmissions += responses.transport.flightsLong * EMISSION_FACTORS.transport.flight_long;
    }
  }

  let energyEmissions = 0;
  if (responses.energy) {
    const source = responses.energy.source || 'mixed_grid';
    const kwhPerMonth = responses.energy.kwhPerMonth || 300;
    energyEmissions += (EMISSION_FACTORS.energy[source] || 0) * kwhPerMonth;
  }

  let dietEmissions = EMISSION_FACTORS.diet[responses.diet || 'average'] || 150;
  let shoppingEmissions = EMISSION_FACTORS.shopping[responses.shopping || 'average'] || 100;
  let wasteEmissions = EMISSION_FACTORS.waste[responses.waste || 'average'] || 20;

  const total = transportEmissions + energyEmissions + dietEmissions + shoppingEmissions + wasteEmissions;

  return {
    monthlyTotal: Math.round(total),
    categories: {
      transport: Math.round(transportEmissions),
      energy: Math.round(energyEmissions),
      diet: Math.round(dietEmissions),
      shopping: Math.round(shoppingEmissions),
      waste: Math.round(wasteEmissions)
    },
    // Carbon score out of 100. Lower emissions = higher score. 
    // Assuming 1000 kg CO2e/month is average (Score 50).
    score: Math.max(0, Math.min(100, Math.round(100 - (total / 20)))) 
  };
};

const generateAIInsights = (footprint) => {
  const { categories } = footprint;
  
  // Find highest category
  let maxCategory = 'transport';
  let maxValue = 0;
  for (const [cat, val] of Object.entries(categories)) {
    if (val > maxValue) {
      maxValue = val;
      maxCategory = cat;
    }
  }

  const insights = [];
  insights.push(`Your largest emission source is ${maxCategory}. Focus on reducing this area for the biggest impact.`);
  
  if (maxCategory === 'transport') {
    insights.push('Consider substituting 2 car trips a week with public transit or biking to reduce transport emissions by 15%.');
  } else if (maxCategory === 'energy') {
    insights.push('Switching to a renewable energy provider can cut your energy emissions by up to 90%.');
  } else if (maxCategory === 'diet') {
    insights.push('Having 2 plant-based days a week can significantly lower your diet-related carbon footprint.');
  }

  // Persona logic
  let persona = 'Balanced Lifestyle';
  if (categories.transport < 50 && categories.energy < 100) persona = 'Urban Cyclist';
  else if (categories.energy < 50) persona = 'Energy Optimizer';
  else if (footprint.score > 80) persona = 'Climate Champion';
  else if (categories.shopping < 60) persona = 'Conscious Consumer';

  return { insights, persona, maxCategory };
};

module.exports = {
  calculateFootprint,
  generateAIInsights,
  EMISSION_FACTORS
};
