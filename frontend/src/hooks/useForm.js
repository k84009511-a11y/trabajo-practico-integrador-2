import { useState } from "react";

export const useForm = (initialValues) => {
  const [formState, setFormState] = useState(initialValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((previousValues) => ({ ...previousValues, [name]: value }));
  };

  const handleReset = () => setFormState(initialValues);

  return { formState, handleInputChange, handleReset };
};
