// 알바유형 jobs
// 상세설명 description
// 시작날짜 start
// 종료날짜 end
// 근무시간 duration
// 시급설정 wage

import RecruitFormsProps from "./interface"

const RecruitForm = (
    {label, placeholder, mode,value, setValue}:RecruitFormsProps) => {
    return (
        <div className="m-4">
            {label&&<label className="text-sm">{label}</label>}  
            <input
            id="input"
            className={`w-full rounded-md h-10 outline-gray-200 indent-2 ${
                value && " border-gray-200 "
            }`}
            value={value === '0' ? "" : value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />
        </div>
    )
}

export default RecruitForm