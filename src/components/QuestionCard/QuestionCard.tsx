import { createSignal } from 'solid-js';
import * as styles from './QuestionCard.css';
import { dateDiffInDays } from '~/helpers';
import { isLocal, loadAllReminders, setCurrentView } from '~/App';
import { setReminderToSearchFor } from '../SaveReminderForm/SaveReminderForm';

export interface ReminderInterface {
  categories?: string[];
  daysBeforeReminder: string;
  name: string;
  notes?: string;
  timeStamp: string;
  url: string;
}

// middle screen https://dribbble.com/shots/18181992-Streak
export default function QuestionCard(props: ReminderInterface) {
  const [isHovered, setIsHovered] = createSignal(false);

  let leetCodeLink: HTMLAnchorElement | undefined = undefined;
  function handleCardClick() {
    leetCodeLink?.click();
  }

  function handleDeleteClick(
    event: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) {
    event.stopPropagation();
    if (isLocal) {
      loadAllReminders(props.name);
    } else {
      chrome.storage.local.remove(props.name, () => {
        // TODO: we should do an optimistic delete that doesnt require refetching the entire storage
        loadAllReminders();
      });
    }
  }

  return (
    <div
      class={styles.questionCardWrapper}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div class={styles.daysRemainingBubble}>
        {Number(props.daysBeforeReminder) - dateDiffInDays(new Date(props.timeStamp), new Date())}
      </div>
      <p class={styles.questionName}>{props.name}</p>
      <button class={styles.removeReminderBtn} onClick={handleDeleteClick}>
        Remove reminder
      </button>
      <a
        class={styles.arrow}
        // href="/save-reminder" // TODO: why does this href break things?
        onClick={(event) => {
          event.preventDefault();
          setReminderToSearchFor(props.name);
          setCurrentView('saveReminderForm');
        }}
        ref={leetCodeLink}
      >
        Edit Reminder
      </a>
      {/* <a
        class={styles.arrow}
        href={props.url}
        target="_blank"
        referrerPolicy="no-referrer"
        ref={leetCodeLink}
      >
        <span class={rootStyles.visuallyHidden}>{props.url}</span>
        <svg
          class={`bi bi-chevron-right ${isHovered() ? styles.arrowHovered : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#fff"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </a> */}
    </div>
  );
}
