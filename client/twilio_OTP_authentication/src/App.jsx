import reactLogo from './assets/react.svg'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import './App.css';
import Login from './screens/Login';
import Register from './screens/Register';
import OTP from './screens/OTP';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='sign-up/' element={<Register />} />
        <Route path='verify-token/' element={<OTP />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
