import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./view/Dashboard";
import Login from "./view/auth/Login";
import { AfterLogin, BeforeLogin } from "./guard/AuthGuard";
import Registration from "./view/auth/Registration";
import NotFoundError from "./view/404";

function App() {
  return (
    <Routes>
      <Route path='/' element={<BeforeLogin />}>
        <Route index element={<Login />} />
        <Route path='registration' element={<Registration />} />
      </Route>

      <Route path='/dashboard' element={<AfterLogin />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundError />} />
    </Routes>
  );
}

export default App;
