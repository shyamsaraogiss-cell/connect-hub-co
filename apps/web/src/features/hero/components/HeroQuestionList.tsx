import type { AssistantPrompt } from "../types/hero.types";
import styles from "../HeroCarousel.module.css";

export function HeroQuestionList({ prompts, onSelect }: { prompts: readonly AssistantPrompt[]; onSelect: (prompt: AssistantPrompt) => void }) {
  return (
    <div className={`${styles.promptList} ai-questions-scroll-area`} role="group" aria-label="Approved guidance questions">
      {prompts.map((prompt, index) => (
        <button type="button" key={prompt.id} onClick={() => onSelect(prompt)}>
          <span aria-hidden="true">{index + 1}</span>
          <span>{prompt.label}</span>
          <b aria-hidden="true">›</b>
        </button>
      ))}
    </div>
  );
}
