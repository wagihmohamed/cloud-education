import { Routes, Route } from "react-router-dom";
import { Login } from "./screens/Login/Login";
import { SignUp } from "./screens/Registration/Registration";
import { homePath  ,registerPath} from "./utlis/routes";

function App() {
    return (
        <Routes>
          <Route path={homePath} element={<Login />} />
          <Route path={registerPath} element={<SignUp />} />
        </Routes>
    );
}

export default App;
