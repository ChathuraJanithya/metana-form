import React, { useEffect, useRef } from "react";
import { IoPeople } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Content = () => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const startJourney = () => {
    navigate("/form");
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
    <section className="bg-white w-full py-[64px] px-12 lg:px-20 flex justify-center items-center md:py-[96px]  mx-auto ">
      <div className="grid items-center w-full gap-8 px-10 lg:gap-8 lg:grid-cols-2 grid-col-1">
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
          className="lg:order-last max-w-[720px]"
        >
          <img src="./socials.png" alt="" />
        </motion.div>
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
          className="lg:pl-[80px]"
        >
          <h2 className="mt-4 lg:mt-0 text-[30px] max-w-[588px] lg:text-4xl font-bold">
            Launch your Data Career in Weeks, not Years
          </h2>
          <p className="mb-8 text-[20px] mt-4 lg:text-xl text-[#191b33] opacity-[0.7]">
            What to expect:
            <br />- <span className="font-semibold">Short-answer</span>{" "}
            questions & <span className="font-semibold">No</span> cover letter
            <br />- Takes 4 mins on average
          </p>

          <div>
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 text-white text-2xl font-bold transition-all duration-100 ease-in-out bg-[#cc99ff] rounded hover:opacity-[0.8] shadow-md"
                onClick={startJourney}
                ref={buttonRef}
                tabIndex="0"
              >
                Start Your Journey
              </button>
              <div className="text-sm">
                press <strong>Enter ↵</strong>
              </div>
            </div>
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
              className="flex items-center gap-1 mt-4 text-sm"
            >
              <IoPeople />
              <p>31 people have filled this out</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Content;
