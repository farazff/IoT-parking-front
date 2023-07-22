import { useContext } from "react";
import { GenerateRoutes } from "./utils/routes";
import { RenderRoutes } from "./utils/routes/RenderRoutes";
import Sidebar from "./components/Sidebar";
import UserBar from "./components/useBar";
import { GeneralDataContext } from "./store/GeneralContext";

function App() {
  const routes = GenerateRoutes();
  const [states] = useContext(GeneralDataContext);

  return (
    <div className="d-flex w-100 h-100 wrapper">
      {states && <Sidebar routes={routes} />}
      {states && <UserBar />}
      <RenderRoutes routes={routes} />
    </div>
  );
}

export default App;
