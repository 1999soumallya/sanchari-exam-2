import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './view/auth/Login';
import Registration from './view/auth/Registraction';
import { AfterLogin, BeforeLogin } from './guard/AuthGuard';
import HomeView from './view/dashboard/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<BeforeLogin />}>
        <Route index element={<Login />} />
        <Route path='registration' element={<Registration />} />
      </Route>

      <Route path='/dashboard' element={<AfterLogin />}>
        <Route index element={<HomeView />} />
      </Route>

    </Routes>
  );
}

export default App;
