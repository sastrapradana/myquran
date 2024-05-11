import { useState } from "react";

export default function useHandleChange(initialValue) {
  const [data, setData] = useState(initialValue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return { data, handleChange };
}
