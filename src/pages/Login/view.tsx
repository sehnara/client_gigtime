import InputLogin from "../../components/Forms/Login/view";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="font-jua text-6xl text-cyan-500">바로알바</h1>
      <InputLogin />
    </div>
  );
};

export default LoginPage;
