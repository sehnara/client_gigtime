import InputDateProps from "./interface"

const InputDate = ({label, _key, setValue}:InputDateProps) => {
    return (
        <div className="mt-2">
            <p className="text-sm mb-2">{label}</p>
            <input
                type="date"
                className={`w-full rounded-lg h-10 outline-gray-300 px-2 border text-xs`}
                onChange={(e) => setValue(_key, e.target.value)}
            />
        </div>
    )
}

export default InputDate