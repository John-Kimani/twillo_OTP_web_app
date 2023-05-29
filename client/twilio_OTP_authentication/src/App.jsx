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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='sign-up/' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
