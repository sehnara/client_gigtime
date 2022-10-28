import InputTextProps from "./interface"

const InputText = ({label, _key ,_value, setValue} : InputTextProps) => {
    return (
        <div className="mt-2">
            <p className="text-sm mb-2">{label}</p>
            <input
                id="input"
                className={`w-full rounded-md h-10 outline-gray-200 indent-2 border border-gray-200 text-xs`}
                value={_value === 0 ? '' : _value}
                onChange={(e) => setValue(_key, e.target.value)}
            />
      </div>
    )
}

export default InputText