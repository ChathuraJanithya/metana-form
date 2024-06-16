import React from "react";
import FromState from "../utils/FormState";
import FormInt from "./FormInt";
const Form = () => {
  return (
    <div className="container mx-auto">
      <FromState>
        <FormInt />
      </FromState>
    </div>
  );
};

export default Form;
