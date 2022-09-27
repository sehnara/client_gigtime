import React from "react";

type MODE = "NORMAL" | "SELECT" | "DATE" | "TIME";

type InputValue2Props = {
  title: string;
  label?: string;
  dict_key?: string;
  dict_value: string | number;
  margin_bottom?: Number;
  mode: MODE;
  setValue: (key?: string, value?: string | number) => void;
  options?: string[];
  options2?: string[];
};

const InputValue2 = ({
  title,
  setValue,
  label,
  dict_key,
  dict_value,
  margin_bottom,
  mode,
  options,
  options2,
}: InputValue2Props) => {
  return (
    <div className={`mb-${margin_bottom}`}>
      {label && <label className="text-sm font-bold ">{label}</label>}
      <div
        className={`w-full rounded-lg border ${
          mode === "TIME" ? "border-white" : "border-gray-300"
        } mt-2`}
      >
        {mode === "NORMAL" ? (
          <input
            id="input"
            className={`w-full rounded-md h-10 outline-gray-200 indent-2 ${
              dict_value && " border-gray-200 "
            }`}
            value={dict_value === 0 ? "" : dict_value}
            onChange={(e) => setValue(dict_key, e.target.value)}
            placeholder={title}
          />
        ) : mode === "SELECT" ? (
          <select
            name="알바유형 선택"
            id="input"
            className="w-full h-10 rounded-lg text-gray-600"
            onChange={(e) => setValue(dict_key, e.target.value)}
          >
            <option className="text-gray-400">기입 해주세요</option>
            {options &&
              options.map((e) => {
                return (
                  <option key={e} value={e === "알바유형 선택" ? "" : e}>
                    {e}
                  </option>
                );
              })}
          </select>
        ) : mode === "DATE" ? (
          <input
            type="date"
            className={`w-full rounded-lg h-10 outline-gray-300 px-2`}
            onChange={(e) => setValue(dict_key, e.target.value)}
          />
        ) : (
          <div className="flex justify-between space-x-2">
            <select
              name="알바유형 선택"
              className="w-full h-10 rounded-lg text-gray-600 border border-gray-300 p-1"
              onChange={(e) => setValue("start_time", e.target.value)}
            >
              <option className="text-gray-400">기입 해주세요</option>
              {options &&
                options.map((e) => {
                  return (
                    <option key={e} value={e === "알바유형 선택" ? "" : e}>
                      {e}
                    </option>
                  );
                })}
            </select>
            <select
              name="알바유형 선택"
              className="w-full h-10 rounded-lg text-gray-600 border border-gray-300 p-1 "
              onChange={(e) => setValue("end_time", e.target.value)}
            >
              <option className="text-gray-400">기입 해주세요</option>
              {options2 &&
                options2.map((e) => {
                  return (
                    <option key={e} value={e === "알바유형 선택" ? "" : e}>
                      {e}
                    </option>
                  );
                })}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

InputValue2.defaultProps = {
  title: "",
  margin_bottom: 4,
  mode: "NORMAL",
};

export default InputValue2;
