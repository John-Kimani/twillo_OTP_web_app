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
import FlashProvider from './context/Flashprovider';
import Dashboard from './screens/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <FlashProvider>
        <ApiProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='sign-up/' element={<Register />} />
            <Route path='verify-token/:uuid' element={<OTP />} />
            <Route path='dashboard/' element={<Dashboard />}/>
          </Routes>
        </ApiProvider>
      </FlashProvider>
    </BrowserRouter>
  )
}

export default App
