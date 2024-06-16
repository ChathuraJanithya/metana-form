import React, { useRef, useEffect } from "react";
import Question from "../Question";

const questions = [
  {
    title: "Before we start, what is your name?",
    subTitle: "",
    fields: [
      { label: "First name", type: "text", placeholder: "Jane" },
      { label: "Last name", type: "text", placeholder: "Smith" },
    ],
  },
];

const Form1 = ({ setStep }) => {
  const buttonRef = useRef(null);

  const nextStep = () => {
    setStep(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === "Return") {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <Question
        question={questions[0]}
        step={1}
        totalSteps={4}
        onNext={nextStep}
        buttonRef={buttonRef}
      />
    </div>
  );
};

export default Form1;
