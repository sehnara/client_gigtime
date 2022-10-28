import { useNavigate } from "react-router-dom";
import Button from "../../../components/Buttons/Normal/view";

function SignUpComplete() {
  const navigate = useNavigate();

  return (
    <div className="h-screen pt-40">
      <div className="m-8">
        <h2 className="text-3xl font-bold"><span className="text-cyan-500">바로알바</span>의</h2>
        <h2 className="text-3xl font-bold">가족이 되신것을</h2>
        <h2 className="text-3xl font-bold">환영합니다!</h2>
      </div>
      <div className="ml-8 mr-8 pt-1">
        <Button
          title="로그인하기"
          onClickEvent={()=>{navigate('/*')}}
        />
      </div>
    </div>
  );
}

export default SignUpComplete;
