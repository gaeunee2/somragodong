import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2, Save, Bookmark } from "lucide-react";

interface Answer {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface AnswerDisplayProps {
  answer: Answer;
}

export default function AnswerDisplay({ answer }: AnswerDisplayProps) {
  const { toast } = useToast();

  const handleSaveAnswer = () => {
    try {
      const savedAnswers = JSON.parse(localStorage.getItem('savedAnswers') || '[]');
      const newAnswer = { ...answer, savedAt: new Date().toISOString() };
      
      // Check if already saved
      const exists = savedAnswers.find((saved: Answer) => saved.id === answer.id);
      if (exists) {
        toast({
          title: "이미 저장된 답변입니다",
          description: "답변이 이미 저장되어 있습니다",
        });
        return;
      }
      
      savedAnswers.unshift(newAnswer);
      
      // Keep only last 50 answers
      if (savedAnswers.length > 50) {
        savedAnswers.splice(50);
      }
      
      localStorage.setItem('savedAnswers', JSON.stringify(savedAnswers));
      
      toast({
        title: "답변이 저장되었습니다",
        description: "저장된 답변에서 다시 확인할 수 있습니다",
      });
    } catch (error) {
      toast({
        title: "저장 중 오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요",
        variant: "destructive",
      });
    }
  };

  const handleShareAnswer = async () => {
    const shareText = `"${answer.answer}"\n\n- 솜라고동에서`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '솜라고동의 답변',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          fallbackShare(shareText);
        }
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "답변이 복사되었습니다",
        description: "클립보드에 답변이 복사되었습니다",
      });
    }).catch(() => {
      toast({
        title: "공유 기능을 사용할 수 없습니다",
        description: "브라우저에서 지원하지 않는 기능입니다",
        variant: "destructive",
      });
    });
  };

  const handleCreateTalisman = () => {
    // This would open a modal or navigate to talisman creation page
    toast({
      title: "부적 만들기 기능 준비중",
      description: "곧 만나실 수 있습니다 ✨",
    });
  };

  return (
    <motion.div
      className="glass-card rounded-3xl p-8 text-center"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div 
        className="mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-ethereal-400 to-ethereal-500 flex items-center justify-center">
          <motion.span 
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: "'Crimson Text', serif" }}>
          소라고동의 답변
        </h3>
      </motion.div>
      
      <motion.p 
        className="text-xl md:text-2xl text-mystical-100 leading-relaxed mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        "{answer.answer}"
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Button 
          onClick={handleSaveAnswer}
          className="mystical-button px-6 py-3 rounded-xl text-white font-medium border-none"
          variant="default"
        >
          <Save className="w-4 h-4 mr-2" />
          답변 저장하기
        </Button>
        
        <Button 
          onClick={handleShareAnswer}
          className="mystical-button px-6 py-3 rounded-xl text-white font-medium border-none"
          variant="default"
        >
          <Share2 className="w-4 h-4 mr-2" />
          공유하기
        </Button>
        
        <Button 
          onClick={handleCreateTalisman}
          className="mystical-button px-6 py-3 rounded-xl text-white font-medium border-none"
          variant="default"
        >
          <Bookmark className="w-4 h-4 mr-2" />
          부적 만들기
        </Button>
      </motion.div>
    </motion.div>
  );
}
