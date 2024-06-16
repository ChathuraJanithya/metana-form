import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Question from "../Question";

const questions = [
  {
    title: "Which country you are from? 🏡🏡🏡",
    subTitle: "",
    fields: [
      {
        label: "",
        type: "select",
        placeholder: "Type or select an option",
        name: "country",
      },
    ],
  },
];

const Form3 = ({ setStep }) => {
  const buttonRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data
          .map((country) => country.name.common)
          .sort();
        setCountries(countryNames);
        questions[0].fields[0].options = countryNames;
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const nextStep = () => {
    setStep(3);
  };

  const prevStep = () => {
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

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="container mx-auto">
      <Question
        question={questions[0]}
        step={3}
        totalSteps={4}
        onNext={nextStep}
        onPrev={prevStep}
        handleCountrySelect={handleCountrySelect}
        selectedCountry={selectedCountry}
        buttonRef={buttonRef}
      />
    </div>
  );
};

export default Form3;
