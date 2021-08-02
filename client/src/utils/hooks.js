import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (onChangeEvent) => {
    console.log("It works");
    switch (onChangeEvent.target.type) {
      case "file": {
        const [file] = onChangeEvent.target.files;

        if (!file) return;

        const fileReader = new FileReader();

        fileReader.onload = (readerEvent) => {
          setValues({
            ...values,
            [onChangeEvent.target.name]: readerEvent.target.result,
          });
        };

        fileReader.readAsDataURL(file);
        break;
      }

      case "checkbox": {
        setValues({
          ...values,
          [onChangeEvent.target.name]: onChangeEvent.target.checked,
        });
        break;
      }

      default: {
        console.log(onChangeEvent.target.name);
        setValues({
          ...values,
          [onChangeEvent.target.name]: onChangeEvent.target.value,
        });
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
