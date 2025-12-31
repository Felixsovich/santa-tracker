
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Sparkles, MessageSquare, Star, Gift, Rocket, Volume2, VolumeX, Music } from 'lucide-react';
import MagicBackground from './components/MagicBackground';
import Header from './components/Header';
import TimelineItem from './components/TimelineItem';
import { TRACKING_DATA } from './constants';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
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

  // --- GENAI HELPER ---
  const askMagicAssistant = async () => {
    setIsAiLoading(true);
    // Play a festive chime sound
    const chime = new Audio('https://assets.mixkit.co/active_storage/sfx/2012/2012-preview.mp3');
    chime.volume = 0.3;
    chime.play().catch(() => { });

    try {
      // Correct initialization using process.env.API_KEY directly as per guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Обратись к мальчику по имени Иван, ему 9 лет. Он сын Деда Мороза и ждет подарок. Напиши ему крутое, развернутое сообщение (примерно на 15 строк), объясняющее на геймерско-магическом языке, что подарок задерживается из-за секретной дозаправки саней энергией Северного Сияния в секторе Марса. Напиши, что эльфы сейчас делают 'апгрейд' его подарка, добавляя в него легендарные свойства, и он будет самым мощным в этом году. Используй много праздничных эмодзи (ракеты, подарки, искры, дед мороз). В конце обязательно напиши: 'Конец связи, Спецагент Иван! Ты лучший!'.",
      });
      // Extracting text output from GenerateContentResponse using the .text property.
      setAiResponse(response.text || "Эльфы говорят, что сани в гиперпрыжке к Ивану! 🚀✨");
    } catch (e) {
      console.error("Gemini API Error:", e);
      // Detailed fallback message if API call fails
      setAiResponse(`Привет, Иван! Это экстренный протокол связи «Снежинка-9». ❄️
Наши магические антенны зафиксировали помехи в секторе Северного Полюса. 📡
Похоже, эльфы случайно пролили горячий шоколад на главный квантовый процессор! ☕️⚡️
А олени Рудольфа решили устроить дрифт вокруг колец Сатурна и временно вышли из зоны Wi-Fi. 🦌💨
Но ты не переживай, твой статус в нашей системе — «СУПЕР-ВАЖНЫЙ ГЕРОЙ». 🏆
Твой подарок сейчас проходит финальную стадию закалки звёздной пылью на Марсе. ✨🔴
Мы делаем полный «апгрейд» и добавляем +100 к крутости и +50 к магии! 🛠️💎
Главный эльф-инженер лично полирует каждую деталь твоего артефакта. 🧝‍♂️🔧
Мы уже активировали секретные гипер-двигатели, чтобы сократить время задержки. 🚀🔥
Пока ты ждешь, проверь уровень праздничного настроения — оно должно быть на максимуме! 🎄📈
Мы следим за каждым квантовым прыжком твоих саней в реальном времени. 🛰️🎯
Весь штаб Деда Мороза верит в твою выдержку и геймерский дух! 🎅🤘
Скоро небо озарится яркой вспышкой — это значит, мы входим в твою атмосферу. 🌌🌠
Оставайся на связи, Иван! Ты лучший агент в этом году! 🎖️✨
Конец связи, Спецагент Иван! Победа близко! 🚩🎁`);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-24 selection:bg-purple-500 selection:text-white">
      <MagicBackground />

      {/* Snowfall Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`snow-${i}`}
            initial={{ y: -20, x: Math.random() * 100 + '%' }}
            animate={{
              y: '105vh',
              x: (Math.random() * 100 - 10) + '%'
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute text-white/40 text-xl"
            style={{ fontSize: Math.random() * 10 + 10 + 'px' }}
          >
            ❄
          </motion.div>
        ))}
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="https://www.chosic.com/wp-content/uploads/2021/11/We-Wish-You-A-Merry-Christmas.mp3"
      />

      {/* Music Toggle Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-2xl flex items-center justify-center border-2 border-white/20 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isMusicPlaying ? (
          <Volume2 className="text-white animate-pulse" size={28} />
        ) : (
          <VolumeX className="text-white/60" size={28} />
        )}
        <motion.div
          animate={isMusicPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1 -right-1"
        >
          <Music size={14} className="text-yellow-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0, x: '50%', y: '50%' }}
                  animate={{ scaleX: 20, x: `${Math.random() * 200 - 50}%`, y: `${Math.random() * 200 - 50}%` }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeIn" }}
                  className="absolute h-[1px] w-4 bg-white"
                />
              ))}
            </div>

            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 0.9, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative z-10"
            >
              <div className="w-32 h-32 border-4 border-t-red-500 border-r-green-500 border-b-yellow-500 border-l-white rounded-full shadow-[0_0_60px_rgba(239,68,68,0.5)]"></div>
              <Gift className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-bounce" size={40} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center relative z-10"
            >
              <p className="text-red-400 font-mono tracking-[0.6em] text-sm uppercase font-black mb-2 animate-pulse">
                ЗАГРУЗКА ПРАЗДНИКА...
              </p>
              <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto border border-white/5">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1/2 h-full bg-gradient-to-r from-red-500 via-green-500 to-yellow-500"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Header
          orderId="SANTA-IVAN-2026-X"
          eta="06.01 - 09.01"
        />

        <main className="max-w-4xl mx-auto px-6">
          {/* Main Hero Console */}
          <motion.div
            initial={{ opacity: 0, rotateX: 25 }}
            animate={{ opacity: 1, rotateX: 0 }}
            className="glass p-10 md:p-20 rounded-[4rem] border-white/10 mb-20 text-center relative overflow-hidden group shadow-[0_0_120px_rgba(0,0,0,0.9)] perspective-container"
          >
            {/* Christmas Garland Effect */}
            <div className="absolute top-0 left-0 w-full flex justify-around opacity-30">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full mt-2 animate-pulse ${i % 2 === 0 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-green-500 shadow-[0_0_10px_green]'}`} />
              ))}
            </div>

            <div className="flex justify-center gap-6 mb-12">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-yellow-400"><Star size={48} fill="currentColor" /></motion.div>
            </div>

            <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter text-white uppercase italic">
              МЕГА <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 animate-gradient-x">
                ЗАДЕРЖКА!
              </span>
            </h2>

            <p className="text-gray-300 text-2xl mb-14 max-w-2xl mx-auto font-black leading-relaxed tracking-tight">
              "Йо-хо-хо, Иван! Наши олени попали в межгалактическую пробку. Подзаряжаем турбо-сани для супер-прыжка!" 🎅✨
            </p>

            <div className="flex flex-col items-center gap-10">
              <button
                onClick={askMagicAssistant}
                disabled={isAiLoading}
                className="group relative px-16 py-8 bg-gradient-to-r from-red-600 to-green-600 text-white font-black rounded-[2rem] hover:scale-110 transition-all flex items-center gap-6 shadow-[0_20px_60px_rgba(220,38,38,0.4)] active:scale-95 border-b-8 border-black/20"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <MessageSquare size={32} className="animate-bounce" />
                <span className="text-2xl uppercase tracking-tighter">
                  {isAiLoading ? 'ПЕРЕХВАТ СИГНАЛА ДЛЯ ИВАНА...' : 'РАДИОСВЯЗЬ С ЭЛЬФОМ'}
                </span>
              </button>
            </div>

            <AnimatePresence>
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-16 p-12 bg-gradient-to-br from-red-900/60 to-black/80 rounded-[3rem] border-2 border-white/20 text-white text-left relative overflow-hidden backdrop-blur-3xl shadow-2xl"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Sparkles size={100} className="text-yellow-400" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center animate-spin-slow rotate-12">
                      <Gift size={28} className="text-red-600" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-[0.5em] text-red-400">СЕКРЕТНЫЙ КАНАЛ ДЛЯ АГЕНТА ИВАНА</span>
                  </div>
                  <div className="text-xl md:text-2xl font-bold leading-relaxed text-white mb-4 tracking-tight whitespace-pre-line">
                    {aiResponse}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Timeline Section */}
          <div className="space-y-16 perspective-container">
            <div className="flex items-center justify-between px-8 mb-20">
              <div className="flex flex-col">
                <span className="text-xs text-red-500 font-black tracking-[0.6em] uppercase mb-3">IVAN_LOGS_2026</span>
                <h3 className="text-4xl font-black text-white flex items-center gap-6 italic">
                  ХРОНИКА ПУТЕШЕСТВИЯ
                  <Rocket size={40} className="text-yellow-400 rotate-45 animate-pulse" />
                </h3>
              </div>
            </div>

            <div className="relative pb-60">
              <div className="absolute left-[31px] top-0 bottom-0 w-[6px] bg-gradient-to-b from-red-500 via-green-500 to-transparent blur-xl opacity-30"></div>

              <div className="space-y-6">
                {TRACKING_DATA.map((event, index) => (
                  <TimelineItem
                    key={event.id}
                    event={event}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-60 py-32 text-center relative overflow-hidden bg-black/40 border-t border-white/5">
          <div className="absolute inset-0 opacity-10 flex justify-center items-center">
            <Gift size={300} className="text-red-500" />
          </div>
          <div className="relative z-10">
            <div className="flex justify-center gap-10 mb-14 opacity-40">
              <Star size={32} />
              <Gift size={32} />
              <Star size={32} />
            </div>
            <p className="text-[14px] font-black uppercase tracking-[1.5em] text-white/20">
              NORTH POLE HQ // FOR IVAN // 2026
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
