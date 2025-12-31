
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Sparkles, MessageSquare, Star, Gift, Rocket, Volume2, VolumeX, Music, FileText, X } from 'lucide-react';
import MagicBackground from './components/MagicBackground';
import Header from './components/Header';
import TimelineItem from './components/TimelineItem';
import { TRACKING_DATA } from './constants';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const askMagicAssistant = async () => {
    setIsAiLoading(true);
    const chime = new Audio('https://assets.mixkit.co/active_storage/sfx/2012/2012-preview.mp3');
    chime.volume = 0.3;
    chime.play().catch(() => { });

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Обратись к мальчику по имени Иван, ему 9 лет. Он ждет подарок от Деда Мороза. Напиши ему крутое, геймерское сообщение, что подарок задерживается из-за секретной дозаправки саней на Марсе. Скажи, что эльфы делают ему лучший апгрейд подарка. Используй много эмодзи.",
      });
      setAiResponse(response.text || "Эльфы говорят, что сани в гиперпрыжке к Ивану! 🚀✨");
    } catch (e) {
      console.error("Gemini API Error:", e);
      setAiResponse(`Привет, Иван! Это экстренный протокол связи «Снежинка-9». ❄️
Наши магические антенны зафиксировали помехи в секторе Северного Полюса. 📡
Похоже, эльфы случайно пролили горячий шоколад на главный квантовый процессор! ☕️⚡️
Твой подарок сейчас проходит финальную стадию закалки звёздной пылью на Марсе. ✨🔴
Мы делаем полный «апгрейд» и добавляем +100 к крутости! 🛠️💎
Скоро небо озарится яркой вспышкой — это значит, мы входим в твою атмосферу. 🌌🌠
Конец связи, Спецагент Иван! Ты лучший! 🎖️✨`);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-24 selection:bg-purple-500 selection:text-white">
      <MagicBackground />

      {/* Snowfall Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`snow-${i}`}
            initial={{ y: -20, x: Math.random() * 100 + '%' }}
            animate={{ y: '105vh', x: (Math.random() * 100 - 10) + '%' }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
            className="absolute text-white/20 text-xl"
          >❄</motion.div>
        ))}
      </div>

      <audio ref={audioRef} loop src="https://www.chosic.com/wp-content/uploads/2021/11/We-Wish-You-A-Merry-Christmas.mp3" />

      {/* Music Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-full bg-red-600 shadow-2xl flex items-center justify-center border-2 border-white/20 group"
      >
        {isMusicPlaying ? <Volume2 className="text-white" size={24} /> : <VolumeX className="text-white/60" size={24} />}
      </motion.button>

      <AnimatePresence>
        {!isLoaded && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }} className="relative">
              <div className="w-24 h-24 border-4 border-red-500 border-t-transparent rounded-full animate-pulse"></div>
              <Gift className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={32} />
            </motion.div>
            <p className="mt-8 text-red-500 font-black tracking-widest uppercase">Загрузка Магии...</p>
          </motion.div>
        )}

        {showOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass max-w-2xl w-full p-10 rounded-[3rem] relative overflow-hidden border-2 border-white/20"
            >
              <button onClick={() => setShowOrder(false)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                <X size={32} />
              </button>
              <div className="text-red-500 font-mono text-xs mb-4 tracking-widest uppercase">Secret Order #IVAN-2026</div>
              <h2 className="text-3xl font-black text-white mb-6 uppercase italic">Приказ штаба Северного Полюса</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed font-bold text-lg">
                <p>Иван, твоё праздничное желание было перехвачено нашими радарами ещё 30 ноября.</p>
                <p>В данный момент твой подарок проходит финальную стадию закалки звёздной пылью в секторе Марса. Мы делаем его самым крутым в этой части галактики!</p>
                <p>Используй этот терминал для слежения за нашими маневрами. Мы уже почти на месте!</p>
                <p className="text-yellow-400">Конец связи, Спецагент Иван!</p>
              </div>
              <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-75"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-150"></div>
                </div>
                <span className="text-[10px] font-mono text-white/20">VERIFIED BY SANTA</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Header orderId="SANTA-IVAN-2026-X" eta="06.01 - 09.01" />

        <main className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-12 md:p-20 rounded-[4rem] border-white/10 mb-20 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500"></div>

            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none italic uppercase">
              МЕГА <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 animate-gradient-x">
                ЗАДЕРЖКА!
              </span>
            </h2>

            <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-bold">
              "Йо-хо-хо, Иван! Наши олени попали в межгалактическую пробку. Подзаряжаем турбо-сани!" 🎅✨
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={askMagicAssistant}
                disabled={isAiLoading}
                className="px-10 py-6 bg-gradient-to-r from-red-600 to-red-800 text-white font-black rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95"
              >
                <MessageSquare size={24} />
                <span>{isAiLoading ? 'ПЕРЕХВАТ...' : 'РАДИОСВЯЗЬ С ЭЛЬФОМ'}</span>
              </button>

              <button
                onClick={() => setShowOrder(true)}
                className="px-10 py-6 bg-white/5 border border-white/10 text-white font-black rounded-3xl hover:bg-white/10 transition-all flex items-center justify-center gap-4 active:scale-95"
              >
                <FileText size={24} />
                <span>СЕКРЕТНЫЙ ПРИКАЗ</span>
              </button>
            </div>

            <AnimatePresence>
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="mt-12 p-10 bg-black/60 rounded-[3rem] border-2 border-white/10 text-left relative overflow-hidden"
                >
                  <Sparkles className="absolute -top-4 -right-4 text-yellow-400/20" size={120} />
                  <div className="text-lg md:text-xl font-bold leading-relaxed whitespace-pre-line relative z-10">
                    {aiResponse}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Timeline Section */}
          <div className="space-y-12">
            <div className="flex flex-col px-8">
              <span className="text-xs text-red-500 font-black tracking-widest uppercase mb-2">IVAN_LOGS_2026</span>
              <h3 className="text-3xl font-black text-white italic flex items-center gap-4">
                ХРОНИКА ПУТЕШЕСТВИЯ
                <Rocket size={32} className="text-yellow-400 rotate-45" />
              </h3>
            </div>

            <div className="relative">
              <div className="absolute left-[31px] top-0 bottom-0 w-[4px] bg-white/5"></div>
              <div className="space-y-4">
                {TRACKING_DATA.map((event, index) => (
                  <TimelineItem key={event.id} event={event} index={index} />
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-40 py-20 text-center border-t border-white/5 opacity-40">
          <p className="text-[12px] font-black uppercase tracking-[1em]">NORTH POLE LOGISTICS // 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
