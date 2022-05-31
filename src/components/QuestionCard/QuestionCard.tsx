import Badge from '../Badge';
import * as styles from './QuestionCard.css';
import * as rootStyles from '~/styles/index.css';

export interface IQuestionCardProps {
  name: string;
  daysBeforeReminder: string;
  // lastAttempted: Date; // will be '3 day
  // color in the last atetempted if its past the next practice day
  lcDifficultyLevel: 'easy' | 'medium' | 'hard';
  // userDefinedDifficulty: number; // TODO: make this only accept 1-10
  // timesSolved: number;
  // timesAttempted: number;
  url: string;
}

// middle screen https://dribbble.com/shots/18181992-Streak
export default function QuestionCard(props: IQuestionCardProps) {
  let leetCodeLink: HTMLAnchorElement | undefined = undefined;

  function handleCardClick() {
    leetCodeLink?.click();
  }

  // console.log(props);

  return (
    <div class={styles.questionCardWrapper} onClick={handleCardClick}>
      <div class={styles.daysRemainingBubble}>{props.daysBeforeReminder}</div>
      <p class={styles.questionName}>{props.name}</p>
      <Badge
        class={styles.leetCodeDifficulty}
        lcDifficultyLevel={props.lcDifficultyLevel ?? 'easy'}
      >
        {props.lcDifficultyLevel ?? 'easy'}
      </Badge>
      {/* serves as the right hand arrow */}
      <a
        class={styles.arrow}
        href={props.url}
        target="_blank"
        referrerPolicy="no-referrer"
        ref={leetCodeLink}
      >
        <span class={rootStyles.visuallyHidden}>{props.url}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#fff"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
          // TODO: improve the a11y of this link stuff. Ideally, the card itself functions as a link
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </a>
    </div>
  );
}
