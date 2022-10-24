import SignUpProps from "./interface";
import { useRecoilState } from "recoil";

const SignUpForm = ( 
    {title, placeholder, mode, state} : SignUpProps )  => {
    const [sign, setSign] = useRecoilState(state)
    
    return(
        <>
            <p className="text-xs font-bold text-slate-500 ml-1 mb-2">{title}</p>
            <div className="w-full rounded-lg border mb-4 text-sm">
                <input 
                    className="w-full rounded-lg h-10 outline-gray-300 indent-2 text-sm" 
                    placeholder={placeholder}
                    value={sign[mode]}
                    onChange={e => setSign({...sign, [mode] : e.target.value})}
                />
            </div>
        </>
    );
}

export default SignUpForm;
