import { useState } from "react";

export default function useHandleChange(initialValue) {
  const [data, setData] = useState(initialValue);

  const handleChange = (event) => {
    console.log(event.target.name);
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return { data, handleChange };
}
