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
import ApiProvider from './context/Apiprovider';

function App() {

  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='sign-up/' element={<Register />} />
          <Route path='verify-token/' element={<OTP />} />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  )
}

export default App
