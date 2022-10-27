import { Routes, Route } from 'react-router-dom'
import { Login } from './screens/Login/Login';
import { homePath } from './utlis/routes';

function App() {
  return (
    <Routes>
      <Route path={homePath} element={<Login />} />
    </Routes>
  );
}

export default App;
