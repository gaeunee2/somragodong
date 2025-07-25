import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Moon, BookOpen, Calendar, Star } from "lucide-react";

export default function AdditionalFeatures() {
  const { toast } = useToast();

  const { data: dailyFortune, refetch: refetchFortune } = useQuery({
    queryKey: ["/api/daily-fortune"],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const handleGetDailyFortune = () => {
    refetchFortune();
  };

  const handleViewSavedAnswers = () => {
    try {
      const savedAnswers = JSON.parse(localStorage.getItem('savedAnswers') || '[]');
      
      if (savedAnswers.length === 0) {
        toast({
          title: "저장된 답변이 없습니다",
          description: "질문을 하고 답변을 저장해보세요",
        });
        return;
      }

      // For now, show a simple list in toast
      // In a real app, this would open a modal or navigate to a new page
      const recentAnswers = savedAnswers.slice(0, 3);
      const answerList = recentAnswers.map((answer: any, index: number) => 
        `${index + 1}. "${answer.answer}"`
      ).join('\n');

      toast({
        title: `저장된 답변 (${savedAnswers.length}개)`,
        description: `최근 답변:\n${answerList}${savedAnswers.length > 3 ? '\n...' : ''}`,
      });
    } catch (error) {
      toast({
        title: "답변을 불러올 수 없습니다",
        description: "저장된 답변을 읽는 중 오류가 발생했습니다",
        variant: "destructive",
      });
    }
  };

  const handleRandomFortune = () => {
    const randomFortunes = [
      "오늘은 새로운 기회가 찾아올 날입니다",
      "용기를 내어 한 걸음 더 나아가세요",
      "직감을 믿고 따라가는 하루가 되길",
      "작은 변화가 큰 행운을 부를 것입니다",
      "주변 사람들의 조언에 귀 기울여보세요",
      "오늘의 도전이 내일의 성장이 됩니다",
      "감사하는 마음이 더 많은 복을 부릅니다",
      "차분한 마음으로 하루를 시작하세요"
    ];

    const randomFortune = randomFortunes[Math.floor(Math.random() * randomFortunes.length)];
    
    toast({
      title: "🌟 오늘의 특별 운세",
      description: randomFortune,
    });
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, staggerChildren: 0.2 }}
    >
      {/* Daily Fortune */}
      <motion.div 
        className="glass-card rounded-2xl p-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <motion.div 
          className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-cosmic-500 to-mystical-500 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Moon className="w-6 h-6 text-white" />
        </motion.div>
        <h4 className="text-xl font-semibold text-white mb-3">오늘의 운세</h4>
        <p className="text-mystical-200 mb-4 min-h-[48px]">
          {(dailyFortune as { fortune?: string })?.fortune || "오늘은 새로운 시작을 위한 완벽한 날입니다"}
        </p>
        <Button
          onClick={handleGetDailyFortune}
          variant="ghost"
          className="text-mystical-300 hover:text-white transition-colors duration-300"
        >
          운세 새로고침 →
        </Button>
      </motion.div>

      {/* Saved Answers */}
      <motion.div 
        className="glass-card rounded-2xl p-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <motion.div 
          className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-ethereal-500 to-mystical-500 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <BookOpen className="w-6 h-6 text-white" />
        </motion.div>
        <h4 className="text-xl font-semibold text-white mb-3">저장된 답변</h4>
        <p className="text-mystical-200 mb-4">지혜로운 답변들을 다시 읽어보세요</p>
        <Button
          onClick={handleViewSavedAnswers}
          variant="ghost"
          className="text-mystical-300 hover:text-white transition-colors duration-300"
        >
          답변 보기 →
        </Button>
      </motion.div>

      {/* Random Fortune */}
      <motion.div 
        className="glass-card rounded-2xl p-6 text-center md:col-span-2 lg:col-span-1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <motion.div 
          className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-mystical-600 to-cosmic-500 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Star className="w-6 h-6 text-white" />
        </motion.div>
        <h4 className="text-xl font-semibold text-white mb-3">즉석 운세</h4>
        <p className="text-mystical-200 mb-4">지금 이 순간의 특별한 메시지</p>
        <Button
          onClick={handleRandomFortune}
          variant="ghost"
          className="text-mystical-300 hover:text-white transition-colors duration-300"
        >
          운세 뽑기 →
        </Button>
      </motion.div>
    </motion.div>
  );
}
