import { BrowserRouter } from "react-router-dom";
import ConfigTypingLoader from "./components/ConfigTypingLoader";
import AppRoutes from "./routes/AppRoutes";

const App = () => (
  <BrowserRouter>
    {/* <ConfigTypingLoader /> */}
    <AppRoutes />
  </BrowserRouter>
);

export default App;
