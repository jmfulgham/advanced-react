import { useState, useEffect } from 'react';

export default function useForm(initialState = {}) {
  // create state obj for our inputs
  const [inputs, setInputs] = useState(initialState);
  const initialValues = Object.values(initialState);

  useEffect(() => {
    setInputs(initialState);
  }, [initialValues]);

  function handleChange(e) {
    let { name, type, value } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      // file uploads
      console.log(e.target.files);
      [value] = e.target.files;
    }

    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initialState);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
