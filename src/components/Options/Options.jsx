import css from "./Options.module.css";

export default function Options({ onLeaveFeedback, onReset, total }) {
  return (
    <div className={css.wrapper}>
      <button
        className={css.button}
        type="button"
        onClick={() => onLeaveFeedback("good")}
      >
        Good
      </button>

      <button
        className={css.button}
        type="button"
        onClick={() => onLeaveFeedback("neutral")}
      >
        Neutral
      </button>

      <button
        className={css.button}
        type="button"
        onClick={() => onLeaveFeedback("bad")}
      >
        Bad
      </button>

      {total > 0 && (
        <button className={css.reset} type="button" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}