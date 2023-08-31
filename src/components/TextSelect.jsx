import React from "react";
import Select from "react-select";

export default function TextSelect(props) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "2px",
      border: "2px solid black",
      opacity: 1,
      borderRadius: "6px",
    }),
  };
  return <Select styles={customStyles} {...props} placeholder="- เลือก -" />;
}
