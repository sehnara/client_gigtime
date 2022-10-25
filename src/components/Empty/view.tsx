import EmptyProps from "./interface";
import { AiOutlineLoading } from "react-icons/ai";

const Empty = ({ text, margin }:EmptyProps) => {
  return (
    <div
      className='w-full bg-red-140 h-full flex flex-col justify-center items-center py-8'
    >
      <AiOutlineLoading className="animate-spin text-5xl"/>
      <h1 className="text-lg mt-4 font-bold animate-pulse">{text}</h1>
    </div>
  );
}
export default Empty;
