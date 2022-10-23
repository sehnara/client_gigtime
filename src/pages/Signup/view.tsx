import Header from "../../components/Header/view";
import SignUpButton from "../../components/Buttons/SignUp/view"

const SignUpPage = () => {
  return (
    <div className="font-sans h-screen">
      <Header title="회원가입" />
      <SignUpButton/>
    </div>
  );
};

export default SignUpPage;
