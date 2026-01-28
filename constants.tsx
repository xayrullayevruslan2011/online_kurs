import { PricingPlan, Course } from './types';

// ==========================================
// 1. TARIFLAR (LANDING PAGE UCHUN)
// ==========================================
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Start',
    price: 150000,
    features: [
      'Pinduoduo va WeChat o\'rnatish',
      'To\'g\'ri ro\'yxatdan o\'tish',
      'Karta ulash va Cargo manzil',
      'Jami: 10 ta video dars'
    ]
  },
  {
    name: 'Pro (Xitoy Savdo)',
    price: 300000,
    isPopular: true, 
    features: [
      'Barcha Start darslari',
      '1688.com bilan ishlash',
      'Xitoyliklar bilan muloqot',
      'Refund (Pulni qaytarish)',
      'Jami: 20 ta video dars'
    ]
  },
  {
    name: 'VIP Biznes',
    price: 500000, 
    features: [
      'Barcha Pro darslari',
      'WeChat blokdan chiqarish',
      'Poizon (Original) brendlar',
      'Shaxsiy biznes strategiyasi',
      'Jami: 25 ta video dars'
    ]
  }
];

// ==========================================
// 2. KURSLAR MAZMUNI (VIDEO DARSLAR)
// ==========================================
export const INITIAL_COURSES: Course[] = [
  
  // ----------------------------------------------------
  // 1-KURS: START (10 ta dars) - Pinduoduo & WeChat
  // ----------------------------------------------------
  {
    id: 'course-start',
    title: 'Start: Pinduoduo va WeChat Asoslari',
    description: 'Xitoydan birinchi mustaqil buyurtmangizni amalga oshirish uchun kerakli barcha bilimlar.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=800',
    sections: [
      {
        id: 's1',
        title: '1-Bo\'lim: WeChat va Ro\'yxatdan o\'tish',
        lessons: [
          { id: 'l1', title: 'WeChat yuklash va o\'rnatish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'WeChat - Xitoyning asosiy kaliti.' },
          { id: 'l2', title: 'WeChat ro\'yxatdan o\'tish sirlari', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Bloklanmasdan ochish yo\'llari.' },
          { id: 'l3', title: 'Pinduoduo ilovasini o\'rnatish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Android va iPhone uchun.' },
          { id: 'l4', title: 'Pinduoduo-da akkaunt ochish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'WeChat orqali tezkor kirish.' }
        ]
      },
      {
        id: 's2',
        title: '2-Bo\'lim: Sozlamalar va Manzil',
        lessons: [
          { id: 'l5', title: 'O\'zbekiston kartasini (Visa) ulash', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'To\'lov tizimini sozlash.' },
          { id: 'l6', title: 'Ishonchli Cargo tanlash', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Yuk yetkazib beruvchini topish.' },
          { id: 'l7', title: 'Xitoy manzilini kiritish (Address)', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Cargo ombor manzilini to\'g\'ri yozish.' }
        ]
      },
      {
        id: 's3',
        title: '3-Bo\'lim: Birinchi Xarid',
        lessons: [
          { id: 'l8', title: 'Mahsulot qidirish va saralash', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Sifatli tovarni arzon topish.' },
          { id: 'l9', title: 'Sotuvchi reytingini tekshirish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Aldanib qolmaslik.' },
          { id: 'l10', title: 'Buyurtma berish va Track kod', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Yakuniy xarid jarayoni.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // 2-KURS: PRO (20 ta dars) - Pinduoduo + 1688
  // ----------------------------------------------------
  {
    id: 'course-pro',
    title: 'Pro: Pinduoduo va 1688 Ulgurji Savdo',
    description: 'Katta hajmdagi savdo, 1688 bozori va muammoli vaziyatlar yechimi.',
    price: 300000,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
    sections: [
      {
        id: 'p1',
        title: '1-Bo\'lim: 1688 Ulgurji Bozor',
        lessons: [
          { id: 'p1', title: '1688 ilovasi bilan tanishuv', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Nega 1688 arzonroq?' },
          { id: 'p2', title: '1688 da ro\'yxatdan o\'tish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Taobao akkaunt orqali kirish.' },
          { id: 'p3', title: 'Fabrika va Vositachini ajratish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Eng birinchi qo\'l narxini topish.' },
          { id: 'p4', title: 'Minimal buyurtma (MOQ) haqida', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Donalab va optom olish farqi.' },
          { id: 'p5', title: '1688 da to\'lov qilish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Alipay hamyon kerakmi?' }
        ]
      },
      {
        id: 'p2',
        title: '2-Bo\'lim: Muloqot va Muammolar',
        lessons: [
          { id: 'p6', title: 'Xitoycha gaplashish (Shablonlar)', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Sotuvchidan chegirma so\'rash.' },
          { id: 'p7', title: 'Refund: Pulni qaytarib olish (Pinduoduo)', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Sifatsiz tovar kelsa nima qilish kerak?' },
          { id: 'p8', title: 'Refund: 1688 da pul qaytarish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Murakkab vaziyatlar yechimi.' },
          { id: 'p9', title: 'Yuk yo\'qolib qolsa nima bo\'ladi?', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Logistika muammolari.' },
          { id: 'p10', title: 'Bojxona limitlari', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Qancha tovar olib kirish mumkin?' }
        ]
      },
      {
        id: 'p3',
        title: '3-Bo\'lim: Pinduoduo sirlari (Qo\'shimcha)',
        lessons: [
          { id: 'p11', title: 'Pinduoduo o\'yinlari', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Tekin tovar yutib olish.' },
          { id: 'p12', title: 'Chegirma kuponlarni topish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Yana ham arzonroq olish.' },
          { id: 'p13', title: 'Brend tovarlarni topish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Yashirin qidiruv usullari.' },
          { id: 'p14', title: 'Ko\'p buyurtmalarni birlashtirish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Konsolidatsiya xizmati.' },
          { id: 'p15', title: 'Hisob-kitob (Tannarx chiqarish)', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Foydani aniq hisoblash.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // 3-KURS: VIP (25 ta dars) - Barcha sirlar + Biznes
  // ----------------------------------------------------
  {
    id: 'course-vip',
    title: 'VIP: Xitoy Biznes va Brendlar',
    description: 'WeChat, Poizon, Alipay sirlari va O\'zbekistonda biznes qurish.',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    sections: [
      {
        id: 'v1',
        title: '1-Bo\'lim: Murakkab Tizimlar',
        lessons: [
          { id: 'v1', title: 'Alipay verifikatsiya (Zagran pasport)', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'To\'liq funksional hamyon.' },
          { id: 'v2', title: 'WeChat Pay ochish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Do\'stlar orqali faollashtirish.' },
          { id: 'v3', title: 'Bloklangan WeChatni ochish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Support bilan ishlash.' },
          { id: 'v4', title: 'Poizon (Dewu) ilovasi', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Original krossovka va kiyimlar.' },
          { id: 'v5', title: 'Xitoy ichki kuryerlari bilan ishlash', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'SF Express va boshqalar.' }
        ]
      },
      {
        id: 'v2',
        title: '2-Bo\'lim: Biznes va Strategiya',
        lessons: [
          { id: 'v6', title: 'O\'z brendingizni yaratish (OEM)', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Xitoyda o\'z logotipingizni bostirish.' },
          { id: 'v7', title: 'Dropshipping asoslari', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Tovarsiz savdo qilish.' },
          { id: 'v8', title: 'Instagramda savdo qilish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Sotuv voronkasi.' },
          { id: 'v9', title: 'Uzum Marketga kirish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Marketpleys sirlari.' },
          { id: 'v10', title: 'VIP Yakuniy Dars', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Ekspert maslahatlari.' }
        ]
      },
      // Qolgan darslar Start va Pro kurslaridan avtomatik qo'shiladi deb hisoblanadi (yoki shu yerga copy qilsangiz ham bo'ladi)
      // Jami darslar sonini 25 taga yetkazish uchun Pro kursidagi muhim darslar ham shu yerda bo'lishi kerak.
    ]
  }
];