import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Answer {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface QuestionFormProps {
  onAnswerReceived: (answer: Answer) => void;
  onAnimationStart: () => void;
  onAnimationEnd: () => void;
  disabled: boolean;
  onSubmitReady?: (submitFn: () => void) => void;
  onQuestionChange?: (text: string) => void;
}

export default function QuestionForm({
  onAnswerReceived,
  onAnimationStart,
  onAnimationEnd,
  disabled,
  onSubmitReady,
  onQuestionChange,
}: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const { toast } = useToast();

  const askMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest("POST", "/api/ask", { question });
      return response.json();
    },
    onSuccess: async (data: Answer) => {
      // Start animation sequence
      onAnimationStart();

      // Wait for animation to complete before showing answer
      setTimeout(() => {
        onAnswerReceived(data);
        onAnimationEnd();
      }, 3800); // Total animation duration

      // Clear input
      setQuestion("");
      onQuestionChange?.("");
    },
    onError: (error) => {
      toast({
        title: "오류가 발생했습니다",
        description:
          error instanceof Error
            ? error.message
            : "질문 처리 중 문제가 발생했습니다",
        variant: "destructive",
      });
      onAnimationEnd();
    },
  });

  const handleSubmit = useCallback(async () => {
    if (!question.trim()) {
      toast({
        title: "질문을 입력해주세요",
        description: "마음속 깊은 질문을 들려주세요",
        variant: "destructive",
      });
      return;
    }

    if (question.length > 500) {
      toast({
        title: "질문이 너무 깁니다",
        description: "500자 이내로 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    askMutation.mutate(question);
  }, [question, toast, askMutation.mutate]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!question.trim()) {
        toast({
          title: "질문을 입력해주세요",
          description: "마음속 깊은 질문을 들려주세요",
          variant: "destructive",
        });
        return;
      }
      handleSubmit();
    }
  };

  // 외부에서 호출 가능하게 - useEffect로 이동
  useEffect(() => {
    if (onSubmitReady) {
      onSubmitReady(handleSubmit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSubmitReady]);

  return (
    <motion.form
      onSubmit={handleFormSubmit}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Textarea
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
          onQuestionChange?.(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder="질문을 입력하고 구슬을 클릭하시오."
        className="question-input w-full h-32 px-6 py-4 rounded-2xl text-white placeholder-mystical-300 resize-none text-lg focus:outline-none transition-all duration-300 border-none"
        disabled={disabled || askMutation.isPending}
        maxLength={500}
      />

      <div className="flex justify-between items-center mt-2 mb-6">
        <span className="text-mystical-300 text-sm">{question.length}/500</span>
      </div>
    </motion.form>
  );
}
