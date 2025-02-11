import './App.css'
import { Route, Routes } from 'react-router-dom'
import PanelPage from './pages/PanelPage'
import Ticket from './pages/ModifyTicketPage'
import ModifyTicketPage from './pages/ModifyTicketPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CommentsPage from './pages/CommentsPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/panel" element={<PanelPage/>} />


        <Route path="/ticket" element={<Ticket/>} />
        <Route path="/comments" element={<CommentsPage/>} />
        <Route path="/adminUsers" element={<ModifyTicketPage/>} />
        <Route path="*" element={<h1>Esta página no existe</h1>} />
      </Routes>
    </>
  )
}

export default App
