import InputSelectProps, { OptionType } from "./interface";

const InputSelect = (
    {label, _key, _value, setValue, options} : InputSelectProps) => {
    return (
    <div className="mt-2">
        <p className="text-sm mb-2">{label}</p>
        <select
            name="알바유형 선택"
            id="input"
            className="w-full h-10 rounded-lg text-gray-600 border text-xs"
            onChange={(e) => setValue(_key, e.target.value)}
          >
            <option className="text-gray-400">선택해주세요</option>
            {
              options.map((e:OptionType) => {
                return (
                  <option 
                    key={e.id} 
                    value={e.name}
                  >
                    {e.name}
                  </option>
                );
              })
            }
          </select>
    </div>
  )
}

export default InputSelect