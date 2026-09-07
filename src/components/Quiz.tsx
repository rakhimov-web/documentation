import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { QuizQuestion } from "../data/types";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [finished, setFinished] = useState(false);

  const q = questions[index];
  const isLast = index === questions.length - 1;
  const hasAnswered = selected !== null;

  const choose = (i: number) => {
    if (hasAnswered) return;
    setSelected(i);
    const next = [...answers];
    next[index] = i;
    setAnswers(next);
  };

  const goNext = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setSelected(answers[index + 1] ?? null);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setFinished(false);
  };

  if (finished) {
    const score = answers.reduce<number>(
      (acc, a, i) => acc + (a === questions[i].correctIndex ? 1 : 0),
      0,
    );
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="border border-hairline p-8 flex flex-col items-center text-center gap-4 bg-surface-1">
        <span className="text-5xl font-light text-primary">{pct}%</span>
        <p className="text-[18px] text-ink">
          {questions.length} ta savoldan {score} tasiga to'g'ri javob berdingiz
        </p>
        <p className="text-[14px] text-ink-subtle max-w-md">
          {pct >= 80
            ? "Zo'r natija! Middleware mavzusini yaxshi o'zlashtirgansiz."
            : pct >= 50
              ? "Yaxshi urinish. Yuqoridagi bo'limlarni qayta ko'rib chiqib, testni qaytadan yeching."
              : "Mavzuni yana bir bor sinchiklab o'qib chiqishni tavsiya qilamiz."}
        </p>
        <button
          onClick={restart}
          className="mt-2 flex items-center gap-2 px-4 py-3 bg-ink text-inverse-ink text-sm cursor-pointer hover:bg-[#333333] transition-colors"
        >
          <RotateCcw size={16} />
          Testni qaytadan boshlash
        </button>
      </div>
    );
  }

  return (
    <div className="border border-hairline">
      <div className="flex items-center justify-between px-6 py-3 bg-surface-1 border-b border-hairline">
        <span className="text-xs text-ink-muted font-medium">
          Savol {index + 1} / {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-6 ${
                i === index
                  ? "bg-primary"
                  : answers[i] !== null
                    ? "bg-ink-subtle"
                    : "bg-surface-2"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-5">
        <h3 className="text-[19px] leading-snug text-ink font-normal">
          {q.question}
        </h3>

        <div className="flex flex-col gap-2">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isSelected = i === selected;
            let stateClasses =
              "border-hairline hover:border-ink-subtle cursor-pointer text-ink";
            if (hasAnswered) {
              if (isCorrect) {
                stateClasses = "border-success bg-[#defbe6] text-[#161616]";
              } else if (isSelected && !isCorrect) {
                stateClasses = "border-error bg-[#fff1f1] text-[#161616]";
              } else {
                stateClasses = "border-hairline opacity-60 text-ink";
              }
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={hasAnswered}
                className={`flex items-center justify-between gap-3 text-left px-4 py-3 border text-[15px] transition-colors ${stateClasses}`}
              >
                <span>{opt}</span>
                {hasAnswered && isCorrect && (
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <XCircle size={18} className="text-error shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div className="bg-surface-1 border-l-4 border-l-primary p-4 animate-fade-in">
            <p className="text-sm text-ink-muted m-0">{q.explanation}</p>
          </div>
        )}

        {hasAnswered && (
          <button
            onClick={goNext}
            className="self-start px-5 py-3 bg-primary text-on-primary text-sm cursor-pointer hover:bg-primary-hover transition-colors"
          >
            {isLast ? "Natijani ko'rish" : "Keyingi savol"}
          </button>
        )}
      </div>
    </div>
  );
}
