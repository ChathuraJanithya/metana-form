import React, { useState } from "react";

import { motion } from "framer-motion";

import Form1 from "../components/formContent/Form1";
import Form2 from "../components/formContent/Form2";
import Form3 from "../components/formContent/Form3";
import Form4 from "../components/formContent/Form4";
import Form5 from "../components/formContent/Form5";

function ContactForm() {
  const [step, setStep] = useState(0);

  return (
    <motion.div
      id="quote"
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
      {step === 0 ? (
        <>
          <Form1 setStep={setStep} />
        </>
      ) : step === 1 ? (
        <>
          <Form2 setStep={setStep} />
        </>
      ) : step === 2 ? (
        <>
          <Form3 setStep={setStep} />
        </>
      ) : step === 3 ? (
        <>
          <Form4 setStep={setStep} />
        </>
      ) : step === 4 ? (
        <>
          <Form5 setStep={setStep} />
        </>
      ) : null}
    </motion.div>
  );
}

export default ContactForm;
