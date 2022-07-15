import React from "react";

type InputValue2Props = {
  title: string;
  label?: string;
  dict_key?: string;
  dict_value: string;
  margin_bottom?: Number;
  setValue: (key?: string, value?: string) => void;
};

const InputValue2 = ({
  title,
  setValue,
  label,
  dict_key,
  dict_value,
  margin_bottom,
}: InputValue2Props) => {
  return (
    <div className={`mb-${margin_bottom}`}>
      {label && (
        <label className="text-sm font-bold" htmlFor="input">
          {label}
        </label>
      )}
      <div className="w-full rounded-lg border border-gray-400">
        <input
          id="input"
          className={`w-full rounded-lg h-10 outline-gray-300 indent-2 ${
            dict_value && "bg-gray-200 border-gray-500"
          }`}
          value={dict_value}
          onChange={(e) => setValue(dict_key, e.target.value)}
          placeholder={title}
        />
      </div>
    </div>
  );
};

InputValue2.defaultProps = {
  title: "",
  margin_bottom: 4,
};

export default InputValue2;
