import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={"login"} />
        <Route path="/register" element={<h1>Registro</h1>} />
        <Route path="/panel" element={<h1>Panel</h1>} />


        <Route path="/panel" element={<h1>Comentaris</h1>} />
        <Route path="/ticket" element={<h1>NouTicker/editar</h1>} />
        <Route path="/adminUsers" element={<h1>adminUsuaris</h1>} />
      </Routes>
    </>
  )
}

export default App
