import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import AdmitsExtraLanding from "./AdmitsExtraLanding";


function App() {
  const [count, setCount] = useState(0)

  return <AdmitsExtraLanding />;
}

export default App
