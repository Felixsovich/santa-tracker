
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Circle, Globe, ShieldCheck, Gift, Zap } from 'lucide-react';
import { TrackingEvent } from '../types';

interface TimelineItemProps {
  event: TrackingEvent;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index }) => {
  const isWarning = event.status === 'warning';
  const isCompleted = event.status === 'completed';
  const isPending = event.status === 'pending';
  const isNew = event.isNew;

  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

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
      className={`relative pl-20 pb-24 group last:pb-60 ${isNew ? 'z-30' : 'z-10'}`}
    >
      {/* Connector Line */}
      <div className={`absolute left-[31px] top-[40px] w-[4px] h-[calc(100%-20px)] bg-gradient-to-b ${isCompleted ? 'from-green-500 via-yellow-400 to-transparent shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'from-gray-800 to-transparent'}`} />

      {/* 3D Icon Node */}
      <motion.div
        whileHover={{ scale: 1.3, rotate: 180 }}
        className={`absolute left-3 top-0 w-12 h-12 rounded-[1rem] flex items-center justify-center z-10 transition-all border-2 border-white/20
          ${isNew ? 'bg-gradient-to-br from-cyan-400 to-blue-600 animate-pulse shadow-[0_0_40px_rgba(34,211,238,0.8)]' :
            isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-700 shadow-[0_0_40px_rgba(34,197,94,0.8)]' :
              isWarning ? 'bg-gradient-to-br from-red-500 to-red-800 animate-neon-pulse shadow-[0_0_50px_rgba(239,68,68,0.8)]' :
                'bg-gray-900 shadow-xl'}`}
      >
        {isNew ? <Zap size={26} className="text-white fill-white" /> :
          isCompleted ? <CheckCircle2 size={26} className="text-white" /> :
            isWarning ? <AlertTriangle size={26} className="text-white" /> :
              <Gift size={22} className="text-white/20" />}
      </motion.div>

      {/* 3D Content Card */}
      <div className={`glass p-10 rounded-[3rem] border-2 transition-all duration-500 shadow-[0_20px_80px_rgba(0,0,0,0.5)]
        ${isNew ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.2)]' :
          isWarning ? 'border-red-500/50 bg-red-500/10' :
            'border-white/10 group-hover:border-green-500/40'}
        relative overflow-hidden
      `}
      >
        {isNew && (
          <div className="absolute top-0 right-0 bg-cyan-500 text-black font-black px-6 py-2 rounded-bl-3xl text-[10px] tracking-widest uppercase flex items-center gap-2">
            <Zap size={12} fill="black" />
            ОПЕРАТИВНАЯ СВОДКА
          </div>
        )}

        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors"></div>
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors"></div>

        <div className="flex flex-wrap items-center justify-between gap-8 mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${isNew ? 'bg-cyan-500 text-black' : isCompleted ? 'bg-green-500 text-white' : 'bg-white/10 text-white/40'}`}>
                {event.originalLanguage}
              </span>
              {isCompleted && !isNew && <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}><ShieldCheck size={18} className="text-green-400" /></motion.div>}
              {isNew && <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>}
            </div>
            <h3 className={`text-3xl md:text-4xl font-black tracking-tighter leading-none 
              ${isNew ? 'text-cyan-400' : isWarning ? 'text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]' : 'text-white'}`}>
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
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
