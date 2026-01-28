import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import Modal from '../components/Modal';
import { PRICING_PLANS } from '../constants'; // Kurslar ro'yxati
import { PricingPlan } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Smartphone, CreditCard, CheckCircle2, Upload, Send } from 'lucide-react';

// ⚠️ DIQQAT: Bot Token va ID ni shu yerga yozing
const TELEGRAM_BOT_TOKEN = "8543158894:AAHkaN83tLCgNrJ-Omutn744aTui784GScc"; // BotFather dan olingan token
const ADMIN_CHAT_ID = "8543158894"; // @userinfobot dan olingan ID

const Landing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Chek yuklash uchun state
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Faylni tanlash funksiyasi
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

 // 2. Telegramga chek yuborish funksiyasi (YANGILANDI ✅)
  const sendReceiptToTelegram = async () => {
    if (!receiptFile || !selectedPlan || !user) return;

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("chat_id", "8215056224");
    formData.append("photo", receiptFile);
    
    // Rasm tagidagi matn
    const caption = `
🆕 <b>Yangi To'lov!</b>
👤 <b>Mijoz:</b> ${user.name || "Noma'lum"}
📧 <b>Email:</b> ${user.email}
📦 <b>Tarif:</b> ${selectedPlan.name}
💰 <b>Narxi:</b> ${selectedPlan.price.toLocaleString()} so'm

👇 <i>To'lovni tasdiqlash uchun tugmani bosing:</i>
    `;
    formData.append("caption", caption);
    formData.append("parse_mode", "HTML");

    // 🔥 MUHIM: Telegram tugmalarini qo'shamiz
    const keyboard = {
      inline_keyboard: [
        [
          { text: "✅ Tasdiqlash", callback_data: `pay_confirm_${user.email}` },
          { text: "❌ Bekor qilish", callback_data: "pay_reject" }
        ]
      ]
    };
    formData.append("reply_markup", JSON.stringify(keyboard));

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setSelectedPlan(null);
          setReceiptFile(null);
          navigate('/dashboard'); 
        }, 3000);
      } else {
        alert("Xatolik! Rasm yuborilmadi.");
      }
    } catch (error) {
      console.error("Telegram error:", error);
      alert("Internet bilan aloqa yo'q!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlanSelect = (plan: PricingPlan) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedPlan(plan);
    setReceiptFile(null); // Eski faylni tozalash
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Bilimingizni <span className="text-violet-600">yangi bosqichga</span> ko'taring
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed">
          O'zbekistondagi eng zamonaviy o'quv platformasi. Pinduoduo va IT kurslarini o'rganing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              onSelect={handlePlanSelect} 
            />
          ))}
        </div>
      </div>

      <Modal 
        isOpen={!!selectedPlan} 
        onClose={() => !isProcessing && setSelectedPlan(null)} 
        title={isSuccess ? "Qabul qilindi!" : "To'lovni tasdiqlash"}
      >
        {isSuccess ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Chek yuborildi!</h3>
            <p className="text-gray-600">Adminlarimiz to'lovni tekshirib, kursni 15 daqiqa ichida ochib berishadi.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Tanlangan tarif info */}
            <div className="p-4 bg-violet-50 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                 <CreditCard className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Tanlangan kurs</p>
                <p className="text-lg font-bold text-gray-900">{selectedPlan?.name}</p>
                <p className="text-sm text-gray-600">{selectedPlan?.price.toLocaleString()} so'm</p>
              </div>
            </div>

            {/* Karta ma'lumotlari */}
            <div className="bg-white border-2 border-gray-100 p-4 rounded-2xl text-center">
              <p className="text-gray-500 text-sm mb-1">To'lov uchun karta raqam:</p>
              <p className="text-xl font-mono font-bold text-gray-900 select-all">4073 4200 6735 5457</p>
              <p className="text-gray-400 text-xs mt-1">(Gulzebo Xolboyeva)</p>
            </div>

            {/* Fayl yuklash */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                To'lov chekini (skrinshot) yuklang:
              </label>
              
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden" 
                  id="receipt-upload"
                />
                <label 
                  htmlFor="receipt-upload"
                  className={`w-full p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    receiptFile ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-violet-400'
                  }`}
                >
                  {receiptFile ? (
                    <>
                       <CheckCircle2 className="w-8 h-8 text-violet-600 mb-2" />
                       <span className="text-sm font-medium text-violet-700">{receiptFile.name}</span>
                       <span className="text-xs text-violet-500">O'zgartirish uchun bosing</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Rasm tanlash uchun bosing</span>
                    </>
                  )}
                </label>
              </div>

              {/* Yuborish tugmasi */}
              <button 
                onClick={sendReceiptToTelegram}
                disabled={!receiptFile || isProcessing}
                className="w-full py-4 px-6 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-200"
              >
                {isProcessing ? (
                  <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Chekni yuborish
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Landing;
// Taxminan shunday joyni toping va o'zgartiring:

// ESKI HOLAT (o'chiring):
// const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
// const chatId = import.meta.env.VITE_ADMIN_CHAT_ID;

// YANGI HOLAT (shunday yozing):
const token = "8543158894:AAHkaN83tLCgNrJ-Omutn744aTui784GScc"; // Bot tokeningiz
const chatId = "8215056224"; // O'zingizning aniq ID raqamingiz (qo'shtirnoq ichida!)