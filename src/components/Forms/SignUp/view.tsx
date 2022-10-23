import SignUpProps from "./interface";

const SignUpForm = ( 
    {title, placeholder, value, setValue} : SignUpProps )  => {
    return(
        <>
            <p className="text-xs font-bold text-slate-500 ml-1 mb-2">{title}</p>
            <div className="w-full rounded-lg border mb-4 text-sm">
                <input 
                    className="w-full rounded-lg h-10 outline-gray-300 indent-2 text-sm" 
                    placeholder={placeholder}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </>
    );
}

export default SignUpForm;
