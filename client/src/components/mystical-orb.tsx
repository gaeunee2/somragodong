import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface MysticalOrbProps {
  isAnimating: boolean;
  onAnimationEnd: () => void;
}

export default function MysticalOrb({ isAnimating, onAnimationEnd }: MysticalOrbProps) {
  const [animationStep, setAnimationStep] = useState<'idle' | 'shake' | 'glow' | 'smoke' | 'explosion'>('idle');

  useEffect(() => {
    if (!isAnimating) {
      setAnimationStep('idle');
      return;
    }

    // Animation sequence
    const sequence = async () => {
      // Step 1: Shake
      setAnimationStep('shake');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Glow
      setAnimationStep('glow');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 3: Smoke
      setAnimationStep('smoke');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 4: Explosion
      setAnimationStep('explosion');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // End animation
      setAnimationStep('idle');
      onAnimationEnd();
    };

    sequence();
  }, [isAnimating, onAnimationEnd]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Smoke Effect */}
      <AnimatePresence>
        {animationStep === 'smoke' && (
          <motion.div
            className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.7, scale: 1.2 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Explosion Effect */}
      <AnimatePresence>
        {animationStep === 'explosion' && (
          <motion.div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, rgba(139, 92, 246, 0.6) 30%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0.8 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Main Orb */}
      <motion.div
        className="mystical-orb relative"
        animate={{
          x: animationStep === 'shake' ? [-10, 10, -10, 10, 0] : 0,
          y: animationStep === 'idle' ? [0, -20, 0] : 0,
          boxShadow: animationStep === 'glow' 
            ? ['0 0 40px rgba(139, 92, 246, 0.5)', '0 0 80px rgba(139, 92, 246, 0.8)', '0 0 40px rgba(139, 92, 246, 0.5)']
            : '0 0 40px rgba(139, 92, 246, 0.5)',
        }}
        transition={{
          x: { duration: 0.5, ease: "easeInOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Inner glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
          }}
          animate={{
            opacity: animationStep === 'glow' ? [0.4, 0.8, 0.4] : 0.4,
          }}
          transition={{
            duration: 2,
            repeat: animationStep === 'glow' ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Reflection */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
}
