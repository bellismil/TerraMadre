import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Moon, Sun, Heart, Wind } from 'lucide-react';

export const WellnessQuiz: React.FC = () => {
  const { setWellnessGoal, wellnessGoal } = useShop();

  const goals = [
    { id: 'Sleep', label: 'Better Sleep', icon: <Moon size={20} /> },
    { id: 'Energy', label: 'More Energy', icon: <Sun size={20} /> },
    { id: 'Stress', label: 'Stress Relief', icon: <Wind size={20} /> },
    { id: 'Detox', label: 'Detox & Digestion', icon: <Sparkles size={20} /> },
    { id: 'Skin', label: 'Radiant Skin', icon: <Heart size={20} /> },
  ];

  if (wellnessGoal) {
    return (
      <div className="bg-earth-50 p-6 rounded-lg border border-earth-200 text-center">
        <p className="text-earth-600 text-sm mb-2">Your Focus</p>
        <h3 className="font-serif text-2xl text-earth-900 mb-4 flex items-center justify-center gap-2">
            {goals.find(g => g.id === wellnessGoal)?.icon}
            {goals.find(g => g.id === wellnessGoal)?.label}
        </h3>
        <button 
          onClick={() => setWellnessGoal(null)} 
          className="text-xs text-moss-600 underline hover:text-moss-800"
        >
          Change Focus
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-earth-100">
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl md:text-3xl text-earth-900 mb-2">How can we support you today?</h2>
        <p className="text-earth-600">Select a wellness goal to get personalized recommendations.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setWellnessGoal(goal.id)}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-earth-200 hover:border-moss-400 hover:bg-earth-50 transition-all group"
          >
            <div className="text-earth-500 group-hover:text-moss-600 mb-2 transition-colors">
              {goal.icon}
            </div>
            <span className="text-sm font-medium text-earth-800">{goal.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
