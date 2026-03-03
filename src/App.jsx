import { useEffect, useState } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
import css from "./App.module.css";

const STORAGE_KEY = "sip-happens-feedback";

const initialFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return initialFeedback;

    try {
      return JSON.parse(savedData);
    } catch {
      return initialFeedback;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback(initialFeedback);
  };

  const { good, neutral, bad } = feedback;

  const totalFeedback = good + neutral + bad;

  const positiveFeedback = totalFeedback
    ? Math.round((good / totalFeedback) * 100)
    : 0;

  return (
    <div className={css.app}>
      <Description
        title="Sip Happens Café"
        text="Please leave your feedback about our service by selecting one of the options below."
      />

      <Options
        onLeaveFeedback={updateFeedback}
        onReset={resetFeedback}
        total={totalFeedback}
      />

      {totalFeedback > 0 ? (
        <Feedback
          good={good}
          neutral={neutral}
          bad={bad}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}