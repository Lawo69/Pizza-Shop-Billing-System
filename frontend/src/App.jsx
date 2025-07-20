import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";

function App() {
  const toastStyle = {
    fontSize: '0.8rem'
  };

  return (
    <>
      <ToastContainer style={toastStyle} />
      <Routes />
    </>
  );
}

export default App;
