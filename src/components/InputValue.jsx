import React from "react";

function InputValue({ title, value, setValue }) {
  return (
    <div className="w-full rounded-lg border">
      <input
        className="w-full rounded-lg h-11 outline-gray-300 indent-2"
        placeholder={title}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default InputValue;
