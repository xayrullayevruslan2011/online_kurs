
import React from 'react';
import { Check } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (plan: PricingPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  return (
    <div className={`relative flex flex-col p-8 bg-white rounded-3xl transition-all duration-300 ${plan.isPopular ? 'border-2 border-violet-500 shadow-xl shadow-violet-100 scale-105 z-10' : 'border border-gray-100 hover:border-violet-200 hover:shadow-lg'}`}>
      {plan.isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
          Eng ko'p tanlangan
        </span>
      )}
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-gray-900">
            {plan.price.toLocaleString()}
          </span>
          <span className="text-gray-500 font-medium">so'm</span>
        </div>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
            <div className="flex-shrink-0 w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-emerald-600" />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3 mt-auto">
        <button
          onClick={() => onSelect(plan)}
          className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-200 ${plan.isPopular ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-violet-50 text-violet-600 hover:bg-violet-100'}`}
        >
          Sotib olish
        </button>
        <button
          onClick={() => onSelect(plan)}
          className="w-full py-3 px-6 rounded-2xl font-bold text-xs text-gray-500 hover:text-gray-900 transition-colors border border-gray-100 hover:border-gray-200"
        >
          Uzum Bank orqali to'lash
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
