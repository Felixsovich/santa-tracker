
import React from 'react';
import { Package, Clock, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  orderId: string;
  eta: string;
}

const Header: React.FC<HeaderProps> = ({ orderId, eta }) => {
  return (
    <div className="relative z-20 w-full max-w-5xl mx-auto px-6 py-12 text-center md:text-left">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-green-500/30 rounded-full blur-3xl animate-pulse"></div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-[950] tracking-tighter mb-4 leading-none"
          >
            SANTA<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-500">
              LOGISTICS
            </span>
          </motion.h1>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-[10px] font-mono text-green-400 font-bold uppercase tracking-widest">
            <Package size={14} className="animate-bounce" />
            <span>CODE: {orderId}</span>
          </div>
        </div>

        <div className="glass p-1 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="bg-black/40 px-10 py-8 rounded-[2.3rem] flex flex-col sm:flex-row gap-10 sm:gap-16 relative overflow-hidden group border border-white/5">
            {/* Success Banner */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 animate-pulse"></div>

            <div className="flex flex-col relative z-10">
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/40 mb-3 flex items-center gap-2">
                <CheckCircle size={10} className="text-green-500" />
                Текущий статус
              </span>
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-2xl font-black text-green-400 flex items-center gap-3 bg-green-400/10 px-4 py-2 rounded-xl border border-green-400/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
              >
                <ShieldCheck size={22} className="fill-green-400 text-black" />
                ДОСТАВЛЕНО
              </motion.span>
            </div>

            <div className="w-px h-16 bg-white/10 hidden sm:block"></div>

            <div className="flex flex-col relative z-10">
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/40 mb-3">Дата завершения</span>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Clock size={24} className="text-green-400" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">
                  06.01.2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
