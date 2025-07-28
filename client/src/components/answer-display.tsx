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

      // 배경: 노란 단색
      ctx.fillStyle = "#FACC15";
      ctx.fillRect(0, 0, 400, 600);

      // 테두리 설정
      const canvasWidth = 400;
      const canvasHeight = 600;
      const borderWidth = 10; // 외곽 테두리 두께
      const squareSize = 10;

      // 🎴 테두리 그리기
      ctx.fillStyle = "#B91C1C";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight); // 바깥 테두리
      ctx.fillStyle = "#FACC15";
      ctx.fillRect(borderWidth, borderWidth, canvasWidth - 2 * borderWidth, canvasHeight - 2 * borderWidth);

      // 내부 장식 선
      ctx.strokeStyle = "#B91C1C";
      ctx.lineWidth = 3;
      ctx.strokeRect(
        borderWidth + 4,
        borderWidth + 4,
        canvasWidth - (borderWidth + 4) * 2,
        canvasHeight - (borderWidth + 4) * 2
      );

      // 🧧 코너 문양: 작은 사각형 그리기
      const drawCornerSquare = (x: number, y: number) => {
        ctx.fillStyle = "#B91C1C";
        ctx.fillRect(x, y, squareSize, squareSize);
      };

      // 네 모서리에 사각형
      drawCornerSquare(borderWidth, borderWidth); // 좌상단
      drawCornerSquare(canvasWidth - borderWidth - squareSize, borderWidth); // 우상단
      drawCornerSquare(borderWidth, canvasHeight - borderWidth - squareSize); // 좌하단
      drawCornerSquare(canvasWidth - borderWidth - squareSize, canvasHeight - borderWidth - squareSize); // 우하단

      // 캐릭터 그리기 함수
      const drawRedCharacter = (ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) => {
        const pixelSize = 4;
        ctx.fillStyle = "#B91C1C"; // 빨간색

        // 캐릭터 픽셀 좌표 (x, y)
        const characterPixels = [
          // 머리 윗부분 (귀?)
          [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0],
          [12, 0], [13, 0], [14, 0],
          
          // 머리 두 번째 줄
          [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], 
          [11, 1], [12, 1], [13, 1], [14, 1], [15, 1],
          
          // 머리 세 번째 줄 (더 넓어짐)
          [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], 
          [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2], [16, 2],
          
          // 머리 네 번째 줄
          [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], 
          [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], 
          [15, 3], [16, 3], [17, 3],
          
          // 얼굴 부분 시작
          [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], 
          [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], 
          [14, 4], [15, 4], [16, 4], [17, 4], [18, 4],
          
          // 얼굴 (눈 부분 제외)
          [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], 
          [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], 
          [17, 5], [18, 5],
          // 눈은 8,5 9,5 10,5 위치에 비워둠
          
          // 얼굴 계속
          [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], 
          [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], 
          [14, 6], [15, 6], [16, 6], [17, 6], [18, 6],
          
          // 코/입 부분
          [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], 
          [8, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], 
          [15, 7], [16, 7], [17, 7], [18, 7],
          // 코는 9,7 위치에 비워둠
          
          // 얼굴 아래쪽
          [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], 
          [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], 
          [14, 8], [15, 8], [16, 8], [17, 8], [18, 8],
          
          [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], 
          [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], 
          [15, 9], [16, 9], [17, 9],
          
          [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], 
          [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [16, 10],
          
          // 목/몸 연결 부분
          [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
          
          // 몸통 (드레스 윗부분)
          [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], 
          [12, 12], [13, 12], [14, 12],
          
          [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], 
          [11, 13], [12, 13], [13, 13], [14, 13], [15, 13],
          
          [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], 
          [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14],
          
          // 드레스 중간 부분
          [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], 
          [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], 
          [15, 15], [16, 15], [17, 15],
          
          [2, 16], [3, 16], [4, 16], [5, 16], [6, 16], [7, 16], 
          [8, 16], [9, 16], [10, 16], [11, 16], [12, 16], [13, 16], 
          [14, 16], [15, 16], [16, 16], [17, 16], [18, 16],
          
          [1, 17], [2, 17], [3, 17], [4, 17], [5, 17], [6, 17], 
          [7, 17], [8, 17], [9, 17], [10, 17], [11, 17], [12, 17], 
          [13, 17], [14, 17], [15, 17], [16, 17], [17, 17], [18, 17], [19, 17],
          
          // 드레스 아래쪽 (더 넓어짐)
          [0, 18], [1, 18], [2, 18], [3, 18], [4, 18], [5, 18], 
          [6, 18], [7, 18], [8, 18], [9, 18], [10, 18], [11, 18], 
          [12, 18], [13, 18], [14, 18], [15, 18], [16, 18], [17, 18], 
          [18, 18], [19, 18], [20, 18],
          
          [0, 19], [1, 19], [2, 19], [3, 19], [4, 19], [5, 19], [6, 19],
          [14, 19], [15, 19], [16, 19], [17, 19], [18, 19], [19, 19], [20, 19],
          // 발 부분은 7-13 사이에 비워둠
          
          // 발
          [7, 20], [8, 20], [9, 20], [11, 20], [12, 20], [13, 20]
        ];

        // 픽셀 그리기
        characterPixels.forEach(([x, y]) => {
          ctx.fillRect(
            offsetX + x * pixelSize, 
            offsetY + y * pixelSize, 
            pixelSize, 
            pixelSize
          );
        });
      };

      // 캐릭터 그리기
      drawRedCharacter(ctx, 130, 80);

      // 💬 질문 텍스트
      ctx.font = 'bold 20px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#B91C1C";
      ctx.textAlign = "center";

      const questionLines = wrapText(ctx, answer.question, 300);
      let y = 300;
      questionLines.forEach((line) => {
        ctx.fillText(line, 200, y);
        y += 28;
      });

      // 📜 답변 텍스트
      ctx.font = '18px "Noto Sans KR", sans-serif';
      const answerLines = wrapText(ctx, answer.answer, 300);
      y += 20;
      answerLines.forEach((line) => {
        ctx.fillText(line, 200, y);
        y += 24;
      });

      // ⛩ 하단 서명
      ctx.font = 'bold 16px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#991B1B";
      ctx.fillText("ⓒ 럭키솜", 200, 550);

      // 다운로드
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
        description: "잠시 후 다시 시도해주세요",
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