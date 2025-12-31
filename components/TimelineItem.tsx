
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Circle, Globe, ShieldCheck, Gift } from 'lucide-react';
import { TrackingEvent } from '../types';

interface TimelineItemProps {
  event: TrackingEvent;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index }) => {
  const isWarning = event.status === 'warning';
  const isCompleted = event.status === 'completed';
  const isPending = event.status === 'pending';
  
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 3D Star Wars / Casino Wheel effects - Amplified for "Coolness"
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-400, 0, -400]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [15, 0, 0, 0, 15]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ 
        rotateX, 
        translateZ, 
        scale, 
        opacity,
        filter: `blur(${blur}px)`
      }}
      className="relative pl-20 pb-24 group last:pb-60"
    >
      {/* Connector Line with Intense Neon */}
      <div className={`absolute left-[31px] top-[40px] w-[4px] h-[calc(100%-20px)] bg-gradient-to-b ${isCompleted ? 'from-green-500 via-yellow-400 to-transparent shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'from-gray-800 to-transparent'}`} />

      {/* 3D Icon Node */}
      <motion.div 
        whileHover={{ scale: 1.3, rotate: 180 }}
        className={`absolute left-3 top-0 w-12 h-12 rounded-[1rem] flex items-center justify-center z-10 transition-all border-2 border-white/20
          ${isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-700 shadow-[0_0_40px_rgba(34,197,94,0.8)]' : 
            isWarning ? 'bg-gradient-to-br from-red-500 to-red-800 animate-neon-pulse shadow-[0_0_50px_rgba(239,68,68,0.8)]' : 
            'bg-gray-900 shadow-xl'}`}
      >
        {isCompleted && <CheckCircle2 size={26} className="text-white" />}
        {isWarning && <AlertTriangle size={26} className="text-white" />}
        {isPending && <Gift size={22} className="text-white/20" />}
      </motion.div>

      {/* 3D Content Card */}
      <div className={`glass p-10 rounded-[3rem] border-2 transition-all duration-500 shadow-[0_20px_80px_rgba(0,0,0,0.5)]
        ${isWarning ? 'border-red-500/50 bg-red-500/10' : 'border-white/10 group-hover:border-green-500/40'}
        relative overflow-hidden
      `}
      >
        {/* Animated Background Ornaments inside card */}
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors"></div>
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors"></div>

        <div className="flex flex-wrap items-center justify-between gap-8 mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${isCompleted ? 'bg-green-500 text-white' : 'bg-white/10 text-white/40'}`}>
                {event.originalLanguage}
              </span>
              {isCompleted && <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}><ShieldCheck size={18} className="text-green-400" /></motion.div>}
            </div>
            <h3 className={`text-3xl md:text-4xl font-black tracking-tighter leading-none ${isWarning ? 'text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]' : 'text-white'}`}>
              {event.title}
            </h3>
          </div>
          <div className="text-right bg-white/[0.05] p-5 rounded-[2rem] border border-white/10 shadow-inner">
            <p className="text-2xl font-black text-white/90">{event.date}</p>
            <p className="text-xs font-mono text-yellow-400 uppercase font-black tracking-widest">{event.time}</p>
          </div>
        </div>

        <p className="text-gray-300 text-xl leading-snug mb-8 font-bold tracking-tight">
          {event.description}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-sm font-black text-white bg-white/10 px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
            <Globe size={18} className="text-green-400 animate-spin-slow" />
            <span className="tracking-widest uppercase">{event.location}</span>
          </div>
          {isWarning && (
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-[12px] font-black text-white uppercase tracking-[0.3em] bg-red-600 px-5 py-3 rounded-2xl border-2 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
            >
              КРИТИЧЕСКИЙ СБОЙ МАТРИЦЫ
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
