import { useState } from 'react'
import './App.css'
import HomePage from './pages/home'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'
function App() {
  const [count, setCount] = useState(0)
    return <div id="Parent">
    <SignInPage/>
    </div>
  }


export default App
