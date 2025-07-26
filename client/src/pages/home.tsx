import { useState } from "react";
import { motion } from "framer-motion";
import MysticalOrb from "../components/mystical-orb";
import QuestionForm from "../components/question-form";
import AnswerDisplay from "../components/answer-display";
import FloatingParticles from "../components/floating-particles";
import AdditionalFeatures from "../components/additional-features";

interface Answer {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export default function Home() {
  const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswerReceived = (answer: Answer) => {
    setCurrentAnswer(answer);
  };

  const handleAnimationStart = () => {
    setIsAnimating(true);
    setCurrentAnswer(null);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className="mystical-bg relative overflow-hidden">
        {/* ⭐ 반짝이는 별 효과 추가 시작 */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-80 animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        {/* ⭐ 반짝이는 별 효과 추가 끝 */}
      <FloatingParticles />

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center relative z-10">
        {/* Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl"
            style={{ fontFamily: "'Crimson Text', serif" }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            솜라고동
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-mystical-200 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            마법의 솜라고동이 해답을 줄 것이다...
          </motion.p>
        </motion.header>

        {/* Question Form */}
        <motion.div
          className="w-full max-w-2xl mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <QuestionForm
            onAnswerReceived={handleAnswerReceived}
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
            disabled={isAnimating}
          />
        </motion.div>

        {/* Mystical Orb */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        >
          <MysticalOrb
            isAnimating={isAnimating}
            onAnimationEnd={handleAnimationEnd}
          />
        </motion.div>

        {/* Answer Display */}
        {currentAnswer && (
          <motion.div
            className="w-full max-w-2xl mb-16"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <AnswerDisplay answer={currentAnswer} />
          </motion.div>
        )}

        {/* Additional Features */}
        <motion.div
          className="w-full max-w-4xl mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <AdditionalFeatures />
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-mystical-300 text-sm">
            © 2025 솜라고동, 김가은 노윤선 제작 ⭐
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
