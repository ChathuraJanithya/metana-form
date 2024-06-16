import React, { useRef, useEffect } from "react";
import Question from "../Question";

const questions = [
  {
    title: "What's your email address?",
    subTitle: "This is how we'll contact you.",
    fields: [
      {
        label: "",
        type: "email",
        placeholder: "name@example.com",
      },
    ],
  },
];

const Form2 = ({ setStep }) => {
  const buttonRef = useRef(null);

  const nextStep = () => {
    setStep(2);
  };

  const prevStep = () => {
    setStep(0);
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
        step={2}
        totalSteps={4}
        onNext={nextStep}
        onPrev={prevStep}
        buttonRef={buttonRef}
      />
    </div>
  );
};

export default Form2;
