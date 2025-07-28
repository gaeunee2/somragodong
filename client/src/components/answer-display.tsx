import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2, Download, Image as ImageIcon } from "lucide-react";

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

  // 갤러리에 이미지로 저장하기
  const handleSaveAsImage = async () => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // 배경: 남보라 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, "#1a1333");  // 어두운 보라
    gradient.addColorStop(1, "#3b0764");  // 짙은 자주
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // 별빛 효과
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 600;
      const radius = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
      ctx.fill();
    }

    // 제목 텍스트
    ctx.font = 'bold 32px "Crimson Text", serif';
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.shadowColor = "#f3e8ff";
    ctx.shadowBlur = 8;
    ctx.fillText("솜라고동의 답변", 400, 90);
    ctx.shadowBlur = 0; // 그림자 해제

    // 답변 텍스트
    ctx.font = 'italic 24px "Noto Sans KR", sans-serif';
    ctx.fillStyle = "#fef3c7"; // 연한 금색
    ctx.textAlign = "center";
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 10;

    const answerText = `"${answer.answer}"`; // 따옴표 감싸기
    const words = answerText.split(" ");
    let line = "";
    let y = 200;

    words.forEach((word) => {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 550 && line !== "") {
        ctx.fillText(line, 400, y);
        line = word + " ";
        y += 36;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, 400, y);

    ctx.shadowBlur = 0; // 그림자 해제

    // 장식 아이콘 (중앙 하단)
    ctx.font = '40px serif';
    ctx.fillText("✨🌙⭐", 400, 480);

    // 하단 서명
    ctx.font = '20px serif';
    ctx.fillStyle = "#c4b5fd"; // 연보라
    ctx.fillText("ⓒ 2025 솜라고동", 400, 540);

    // 저장 처리
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `솜라고동_응답_${new Date().getTime()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
          title: "이미지가 저장되었습니다",
          description: "이제 SNS에 공유해보세요 ✨",
        });
      }
    }, "image/png");
  } catch (error) {
    toast({
      title: "이미지 저장 중 오류가 발생했습니다",
      description: "잠시 후 다시 시도해주세요",
      variant: "destructive",
    });
  }
};

  const handleShareAnswer = async () => {
    const shareText = `"${answer.answer}"\n\n- 솜라고동에서 ⭐`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "솜라고동의 답변",
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          fallbackShare(shareText);
        }
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "답변이 복사되었습니다",
          description: "SNS에 붙여넣기하여 공유하세요",
        });
      })
      .catch(() => {
        toast({
          title: "공유 기능을 사용할 수 없습니다",
          description: "브라우저에서 지원하지 않는 기능입니다",
          variant: "destructive",
        });
      });
  };

  // ✅ 텍스트 줄바꿈 유틸 함수 (상단으로 이동)
  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";

    for (let word of words) {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    return lines;
  }

  // 부적 이미지 만들기
  const handleCreateTalisman = async () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 400;
      canvas.height = 600;

      const image = new Image();
      image.src = "/som.png";
      image.crossOrigin = "anonymous";

      image.onload = () => {
        try {
          // 1. 배경
          ctx.fillStyle = "#FACC15";
          ctx.fillRect(0, 0, 400, 600);

          // 2. 테두리
          const canvasWidth = 400;
          const canvasHeight = 600;
          const borderWidth = 10;
          const squareSize = 10;

          ctx.fillStyle = "#B91C1C";
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          ctx.fillStyle = "#FACC15";
          ctx.fillRect(borderWidth, borderWidth, canvasWidth - 2 * borderWidth, canvasHeight - 2 * borderWidth);

          ctx.strokeStyle = "#B91C1C";
          ctx.lineWidth = 3;
          ctx.strokeRect(
            borderWidth + 4,
            borderWidth + 4,
            canvasWidth - (borderWidth + 4) * 2,
            canvasHeight - (borderWidth + 4) * 2
          );

          const drawCornerSquare = (x: number, y: number) => {
            ctx.fillStyle = "#B91C1C";
            ctx.fillRect(x, y, squareSize, squareSize);
          };

          drawCornerSquare(borderWidth, borderWidth);
          drawCornerSquare(canvasWidth - borderWidth - squareSize, borderWidth);
          drawCornerSquare(borderWidth, canvasHeight - borderWidth - squareSize);
          drawCornerSquare(canvasWidth - borderWidth - squareSize, canvasHeight - borderWidth - squareSize);

          // 3. 캐릭터
          const scale = 0.26;
          const drawWidth = image.width * scale;
          const drawHeight = image.height * scale;
          const offsetX = 200 - drawWidth / 2;
          const offsetY = 40;
          ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

          // 4. 질문
          ctx.font = 'bold 20px "Noto Sans KR", sans-serif';
          ctx.fillStyle = "#B91C1C";
          ctx.textAlign = "center";
          let y = 300;
          wrapText(ctx, answer.question, 300).forEach(line => {
            ctx.fillText(line, 200, y);
            y += 28;
          });

          // 5. 답변
          ctx.font = '18px "Noto Sans KR", sans-serif';
          y += 20;
          wrapText(ctx, answer.answer, 300).forEach(line => {
            ctx.fillText(line, 200, y);
            y += 24;
          });

          // 6. 서명
          ctx.font = 'bold 16px "Noto Sans KR", sans-serif';
          ctx.fillStyle = "#991B1B";
          ctx.fillText("ⓒ 럭키솜", 200, 550);

          // 7. 저장
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `럭키솜_부적_${new Date().getTime()}.png`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);

              toast({
                title: "부적이 만들어졌습니다",
                description: "갤러리에서 확인하세요 ✨",
              });
            }
          }, "image/png");
        } catch (error) {
          toast({
            title: "부적 만들기 중 오류가 발생했습니다",
            description: "이미지 처리 중 오류가 발생했어요",
            variant: "destructive",
          });
        }
      };
    } catch (error) {
      toast({
        title: "부적 만들기 중 오류가 발생했습니다",
        description: "이미지 처리 중 오류가 발생했어요",
        variant: "destructive",
      });
    }
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
        <h3
          className="text-2xl font-semibold text-white mb-2"
          style={{ fontFamily: "'Crimson Text', serif" }}
        >
          솜라고동의 답변
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
          onClick={handleSaveAsImage}
          className="mystical-button px-6 py-3 rounded-xl text-white font-medium border-none"
          variant="default"
        >
          <Download className="w-4 h-4 mr-2" />
          이미지로 저장
        </Button>

        <Button
          onClick={handleShareAnswer}
          className="mystical-button px-6 py-3 rounded-xl text-white font-medium border-none"
          variant="default"
        >
          <Share2 className="w-4 h-4 mr-2" />
          SNS 공유하기
        </Button>

        <Button
          onClick={handleCreateTalisman}
          className="px-6 py-3 rounded-xl text-white font-medium border-none bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md"
          variant="default">
          <ImageIcon className="w-4 h-4 mr-2" />
          부적 만들기
        </Button>
      </motion.div>
    </motion.div>
  );
}