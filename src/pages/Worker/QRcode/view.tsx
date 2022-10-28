import QRCode from "react-qr-code";
import Header from "../../../components/Header/view";
import NavBar from "../../../components/Navbar/view";

const WorkerQrCode = () => {
  return (
    <div className="h-screen">
      <NavBar mode={"WORKER"} />
      <Header title="QR출근" />
      <div className="flex justify-center h-full mt-32">
        <QRCode value={`worker_id: ${localStorage.getItem("id")}`} />
      </div>
    </div>
  );
};

export default WorkerQrCode;
