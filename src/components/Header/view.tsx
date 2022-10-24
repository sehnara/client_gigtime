import { AiOutlineArrowLeft } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {HeaderProps} from './interface'

const Header = ({
    title,
    onClickEvent,
  }: HeaderProps): JSX.Element => {

    const navigate = useNavigate()
  
  return (
    <div className="px-4 py-4 flex items-center justify-between bg-white">
        <AiOutlineArrowLeft
            className="text-gray-600 text-xl"
            onClick={()=>navigate(-1)}
        />
        <p className="font-bold text-lg">{title}</p>
        <AiOutlineArrowLeft
            className="text-gray-600 text-xl opacity-0"
        />
    </div>
  );
};

Header.defaultProps = {
    onClickEvent: "NONE",
  };
  

export default Header;
