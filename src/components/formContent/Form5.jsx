import React, { useRef, useEffect, useState } from "react";
import Question from "../Question";

const questions = [
  {
    title: "What languages and frameworks are you familiar with?",
    subTitle: "Select all the languages you know.",
    fields: [
      {
        label: "Languages and Frameworks",
        type: "checkbox",
        options: [
          "Solidity",
          "Rust",
          "Node.js",
          "Typescript",
          "Javascript",
          "C",
          "C++",
          "C#",
          "SQL",
          "Python",
          "Assembly Language",
          "Haskell",
          "R",
          ".NET",
          "Other",
        ],
      },
    ],
  },
];

const Form5 = ({ setStep }) => {
  const buttonRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const nextStep = () => {
    setStep(5); // Update to next step
  };

  const prevStep = () => {
    setStep(3); // Go back to the previous step
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === "Return") {
      buttonRef.current.click();
    }
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
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
        step={5}
        totalSteps={5} // Update the total steps
        onNext={nextStep}
        onPrev={prevStep}
        selectedOptions={selectedOptions}
        handleCheckboxChange={handleCheckboxChange}
        buttonRef={buttonRef}
      />
    </div>
  );
};

export default Form5;
