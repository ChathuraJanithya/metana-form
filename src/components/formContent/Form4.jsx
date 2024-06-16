import React, { useRef, useEffect } from "react";
import Question from "../Question";

const questions = [
  {
    title: "What is your phone number?",
    subTitle: "",
    fields: [
      {
        label: "",
        type: "phone",
        placeholder: "",
        name: "phone",
      },
    ],
  },
];

const Form4 = ({ setStep }) => {
  const buttonRef = useRef(null);

  const nextStep = () => {
    setStep(4);
  };

  const prevStep = () => {
    setStep(2);
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
        step={4}
        totalSteps={4}
        onNext={nextStep}
        onPrev={prevStep}
        buttonRef={buttonRef}
      />
    </div>
  );
};

export default Form4;
