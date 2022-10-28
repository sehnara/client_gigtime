import Header from "../../../components/Header/view";
import SignUpForm from "../../../components/Forms/SignUp/view";
import Button from "../../../components/Buttons/Normal/view";

import { useNavigate } from "react-router-dom";
import { SignUpState } from "../../../context/signUp";
import { checkEmptyForm } from ".";
import { useRecoilValue } from "recoil";
import SignDataType from "../../../context/interfaces/SignUpType";

const SignUpStorePage = () => {
  
  const navigate = useNavigate();
  const signData = useRecoilValue<SignDataType>(SignUpState)
  
  function goNextStep() {
    const isFulfilled = checkEmptyForm(signData)
    if(isFulfilled){
      navigate('/owner/storelocation');
    }
    else{
      alert('아래 정보를 모두 기입해주세요')
    }
  } 

  return (
    <>
      <Header title="회원가입" />
      <div id="search" className="m-8 mt-10">
        <p className="text-sm mb-5">매장 정보를 기입해주세요.</p>

        <SignUpForm 
            title="아이디" 
            placeholder="아이디 입력"
            mode = 'id' 
            state={SignUpState}
        /> 

        <SignUpForm 
            title="비밀번호" 
            placeholder="비밀번호 입력"
            mode = 'password' 
            state={SignUpState}
        /> 

        <SignUpForm 
            title="매장명" 
            placeholder="매장명 입력"
            mode = 'name' 
            state={SignUpState}
        /> 
        
        <SignUpForm 
            title="연락처"  
            placeholder="연락처 입력"
            mode = 'phone' 
            state={SignUpState}
        />

        <Button title="다음" onClickEvent={goNextStep}/>
      </div>
    </>
  );
};

export default SignUpStorePage;
