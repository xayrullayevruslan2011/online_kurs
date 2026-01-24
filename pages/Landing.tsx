
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import Modal from '../components/Modal';
import { PRICING_PLANS } from '../constants';
import { PricingPlan } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Smartphone, CreditCard, CheckCircle2 } from 'lucide-react';

const Landing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async (plan: PricingPlan) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsProcessing(true);
    // Simulating Uzum Bank / Click API integration
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Simulate auto-redirect to dashboard
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedPlan(null);
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Bilimingizni <span className="text-violet-600">yangi bosqichga</span> ko'taring
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed">
          O'zbekistondagi eng zamonaviy o'quv platformasi orqali dunyo darajasidagi mutaxassisga aylaning. Kurslarni tanlang va bugunoq o'rganishni boshlang.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              onSelect={(p) => setSelectedPlan(p)} 
            />
          ))}
        </div>
      </div>

      <Modal 
        isOpen={!!selectedPlan} 
        onClose={() => !isProcessing && setSelectedPlan(null)} 
        title={isSuccess ? "To'lov muvaffaqiyatli" : "To'lov sahifasi"}
      >
        {isSuccess ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Muvaffaqiyatli!</h3>
            <p className="text-gray-600">Sizning to'lovingiz qabul qilindi. Kurslar avtomatik tarzda ochildi.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-violet-50 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                 <CreditCard className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Tanlangan tarif</p>
                <p className="text-lg font-bold text-gray-900">{selectedPlan?.name} — {selectedPlan?.price.toLocaleString()} so'm</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">To'lov usulini tanlang:</p>
              <button 
                onClick={() => selectedPlan && handlePayment(selectedPlan)}
                disabled={isProcessing}
                className="w-full p-4 border-2 border-gray-100 hover:border-violet-500 rounded-2xl flex items-center justify-between transition-all group disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                    <Smartphone className="w-5 h-5 text-gray-600 group-hover:text-violet-600" />
                  </div>
                  <span className="font-bold text-gray-900">Uzum Bank</span>
                </div>
                {isProcessing && <div className="animate-spin w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full" />}
              </button>
              
              <button 
                onClick={() => selectedPlan && handlePayment(selectedPlan)}
                disabled={isProcessing}
                className="w-full p-4 border-2 border-gray-100 hover:border-violet-500 rounded-2xl flex items-center justify-between transition-all group disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                    <CreditCard className="w-5 h-5 text-gray-600 group-hover:text-violet-600" />
                  </div>
                  <span className="font-bold text-gray-900">Click.uz</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Landing;
