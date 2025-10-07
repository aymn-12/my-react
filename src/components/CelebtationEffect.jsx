import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Star, Trophy } from 'lucide-react';

const CelebrationEffect = ({ show, onComplete, type = 'task' }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      // إنشاء جسيمات الاحتفال
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 0.5,
      }));
      setParticles(newParticles);

      // إخفاء التأثير بعد انتهاء الرسوم المتحركة
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const getIcon = () => {
    switch (type) {
      case 'level':
        return Trophy;
      case 'badge':
        return Star;
      default:
        return Sparkles;
    }
  };

  const Icon = getIcon();

  return (
    <AnimatePresence>
      {show && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
          {/* الأيقونة المركزية */}
          <Motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.6, 1],
              ease: "easeOut"
            }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 shadow-2xl">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </Motion.div>

          {/* الجسيمات المتطايرة */}
          {particles.map((particle) => (
            <Motion.div
              key={particle.id}
              initial={{ 
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1
              }}
              animate={{ 
                scale: [0, 1, 0],
                x: (particle.x - 50) * 4,
                y: (particle.y - 50) * 4,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut"
              }}
              className="absolute"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            </Motion.div>
          ))}

          {/* موجات الطاقة */}
          {[1, 2, 3].map((wave) => (
            <Motion.div
              key={wave}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{
                duration: 1.5,
                delay: wave * 0.2,
                ease: "easeOut"
              }}
              className="absolute w-20 h-20 border-2 border-yellow-400 rounded-full"
            />
          ))}

          {/* نص التهنئة */}
          <Motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-1/3 text-center"
          >
            <div className="bg-white/90 backdrop-blur rounded-lg px-6 py-3 shadow-lg">
              <p className="text-lg font-bold text-purple-600">
                {type === 'level' ? 'مستوى جديد!' : 
                 type === 'badge' ? 'شارة جديدة!' : 
                 'أحسنت! +10 نقاط'}
              </p>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationEffect;