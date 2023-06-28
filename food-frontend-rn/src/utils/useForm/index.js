import { useState } from 'react';

const useForm = (initialValue) => {
  const [form, setform] = useState(initialValue);
  return [
    form,
    (formType, formValue) => {
      if (formType === 'reset') {
        return setform(initialValue);
      }
      return setform({ ...form, [formType]: formValue });
    },
  ];
};

export default useForm;
