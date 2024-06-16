import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown, IoMdCheckmark } from "react-icons/io";
import { motion } from "framer-motion";
import axios from "axios";

const defaultFlag =
  "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg";

const Question = ({
  question,
  step,
  totalSteps,
  onNext,
  onPrev,
  handleCountrySelect,
  selectedCountry,
}) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isPhoneCodeDropdownOpen, setIsPhoneCodeDropdownOpen] = useState(false);
  const [direction, setDirection] = useState("next");
  const [countryData, setCountryData] = useState([]);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState("");
  const [selectedPhoneFlag, setSelectedPhoneFlag] = useState(defaultFlag);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.map((country) => ({
          name: country.name.common,
          code: country.idd.root
            ? `${country.idd.root}${country.idd.suffixes[0]}`
            : "",
          flag: country.flags.png,
        }));
        setCountryData(countries);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountries();
  }, []);

  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const togglePhoneCodeDropdown = () => {
    setIsPhoneCodeDropdownOpen(!isPhoneCodeDropdownOpen);
  };

  const handleNext = () => {
    setDirection("next");
    onNext();
  };

  const handlePrev = () => {
    setDirection("prev");
    onPrev();
  };

  const handlePhoneCodeSelect = (code, flag) => {
    setSelectedPhoneCode(code);
    setSelectedPhoneFlag(flag);
    setIsPhoneCodeDropdownOpen(false);
  };

  const handleCountrySelectWithFlag = (country) => {
    const selectedCountryData = countryData.find((c) => c.name === country);
    if (selectedCountryData) {
      handleCountrySelect(country);
    }
    setIsCountryDropdownOpen(false);
  };

  const handleCheckboxChange = (index) => {
    const option = String.fromCharCode(65 + index);
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((o) => o !== option)
        : [...prevSelectedOptions, option]
    );
  };

  return (
    <div className="container relative max-w-4xl mx-auto py-36 font-lexendDeca">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          transition: {
            duration: 2,
            type: "tween",
            ease: "backOut",
          },
          y: 0,
        }}
        viewport={{ once: true }}
      >
        <div className="flex items-center">
          <span className="text-sm text-[#cc99ff]">{step}</span>
          <span className="ml-2 mr-4 text-[#cc99ff] text-sm">
            <FaArrowRightLong />
          </span>
          <h2 className="text-2xl">{question.title}</h2>
        </div>
        {question.fields.map((field, index) => (
          <div key={index} className="relative py-2 px-11">
            <label className="block pt-6 text-sm text-left text-[#cc99ff]">
              {field.label}
            </label>
            {field.type === "select" && field.name === "country" ? (
              <div className="relative">
                <div
                  className="w-full py-2 pr-10 text-2xl border-b-2 border-[#cc99ff] cursor-pointer text-[#cc99ff] flex items-center"
                  onClick={toggleCountryDropdown}
                >
                  {selectedCountry || field.placeholder}
                </div>
                {selectedCountry && (
                  <FaTimes
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer text-[#cc99ff] active:border-2 active:border-[#cc99ff] active:rounded"
                    onClick={() => {
                      handleCountrySelect("");
                      setIsCountryDropdownOpen(false);
                    }}
                  />
                )}
                {!selectedCountry && (
                  <FaChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer text-[#cc99ff] active:border-2 active:border-[#cc99ff] active:rounded"
                    onClick={toggleCountryDropdown}
                  />
                )}
                {isCountryDropdownOpen && (
                  <ul className="absolute z-10 w-full max-h-80 overflow-auto text-[#cc99ff] bg-white mt-1">
                    {countryData.map((country, idx) => (
                      <li
                        key={idx}
                        className="py-2 px-4 cursor-pointer border mb-1 rounded border-[#cc99ff] hover:bg-[#f3e5ff] bg-purple-50 text-lg"
                        onClick={() =>
                          handleCountrySelectWithFlag(country.name)
                        }
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="inline-block w-6 h-4 mr-2"
                        />
                        {country.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : field.type === "phone" ? (
              <div className="flex gap-2">
                <div className="relative">
                  <div
                    className="w-12 py-2 mt-4 text-2xl border-b-2 border-[#cc99ff] cursor-pointer text-[#cc99ff] flex items-center"
                    onClick={togglePhoneCodeDropdown}
                  >
                    <img
                      src={selectedPhoneFlag}
                      alt="Selected Phone Flag"
                      className="inline-block w-6 h-4 mr-2"
                    />
                    <FaChevronDown />
                  </div>
                  {isPhoneCodeDropdownOpen && (
                    <ul className="absolute z-10 w-[400px] max-h-80 overflow-auto text-[#cc99ff] bg-white mt-1">
                      {countryData.map((country, idx) => (
                        <li
                          key={idx}
                          className="py-2 px-4 cursor-pointer border flex items-center justify-between mb-1 rounded border-[#cc99ff] hover:bg-[#f3e5ff] bg-purple-50 text-lg"
                          onClick={() =>
                            handlePhoneCodeSelect(country.code, country.flag)
                          }
                        >
                          <div>
                            <img
                              src={country.flag}
                              alt={country.name}
                              className="inline-block w-6 h-4 mr-2"
                            />
                            {country.name}
                          </div>
                          {country.code}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  type="tel"
                  placeholder="041 2345678"
                  className="w-full py-2 border-b-2 placeholder-[#cc99ff] opacity-40 border-[#cc99ff] active:outline-none text-2xl focus:outline-none focus:opacity-100 focus:placeholder-opacity-40 caret-[#cc99ff]"
                />
              </div>
            ) : field.type === "checkbox" ? (
              <div className="flex flex-wrap">
                {field.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`flex justify-between items-center mt-2 mr-4 w-[250px] py-2 px-2 rounded border-2 cursor-pointer hover:bg-purple-200 focus:border-purple-400 ${
                      selectedOptions.includes(String.fromCharCode(65 + idx))
                        ? "bg-purple-50 text-[#cc99ff] border-purple-400"
                        : "bg-purple-50 border-purple-300 text-[#cc99ff]"
                    }`}
                    onClick={() => handleCheckboxChange(idx)}
                  >
                    <div className="flex">
                      <span
                        className={`font-semibold py-[1px] px-[8px] rounded text-md mr-2 border ${
                          selectedOptions.includes(
                            String.fromCharCode(65 + idx)
                          )
                            ? "bg-purple-400 text-white border-purple-400"
                            : "bg-white text-[#cc99ff] border-purple-300"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div
                        className={`${
                          selectedOptions.includes(
                            String.fromCharCode(65 + idx)
                          )
                            ? "text-[#cc99ff]"
                            : "text-[#cc99ff]"
                        }`}
                      >
                        {option}
                      </div>
                    </div>
                    {selectedOptions.includes(
                      String.fromCharCode(65 + idx)
                    ) && <IoMdCheckmark className="text-2xl text-purple-400" />}
                  </label>
                ))}
              </div>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full py-2 border-b-2 placeholder-[#cc99ff] opacity-40 border-[#cc99ff] active:outline-none text-2xl focus:outline-none focus:opacity-100 focus:placeholder-opacity-40 caret-[#cc99ff]"
              />
            )}
          </div>
        ))}
        <div className="flex items-center gap-4 mt-10 px-11">
          <button
            className="px-4 py-2 text-white text-xl font-semibold transition-all duration-100 ease-in-out bg-[#cc99ff] rounded hover:opacity-[0.8] shadow-md"
            onClick={handleNext}
          >
            OK
          </button>
          <div className="text-xs">
            press <strong>Enter ↵</strong>
          </div>
        </div>
      </motion.div>
      <div className="fixed flex items-center gap-2 bottom-8 right-8">
        <div className="flex items-center gap-[1px] bg-purple-500 rounded">
          <IoIosArrowUp
            className="text-3xl w-[36px] text-white rounded-tl rounded-bl cursor-pointer bg-[#cc99ff] hover:bg-purple-300 shadow-md"
            onClick={handlePrev}
          />
          <IoIosArrowDown
            className="text-3xl w-[36px] text-white cursor-pointer rounded-tr rounded-br bg-[#cc99ff] hover:bg-purple-300 shadow-md"
            onClick={handleNext}
          />
        </div>
        <button className="bg-[#cc99ff] hover:bg-purple-300 text-sm font-light rounded text-white px-2 py-[5px] shadow-md">
          Powered by <strong>Typeform</strong>
        </button>
      </div>
    </div>
  );
};

export default Question;
