import { useState } from "react";

export const useField = () => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue("");
  };
  return {
    value,
    onChange,
    onReset,
  };
};
