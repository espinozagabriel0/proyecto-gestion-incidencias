import "./App.css";
import { Route, Routes } from "react-router-dom";
import PanelPage from "./pages/PanelPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CommentsPage from "./pages/CommentsPage";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NouTicket from "./pages/NouTicket";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/panel" element={<PanelPage />} />

        <Route path="/ticket" element={<NouTicket />} />
        <Route path="/comments/:id" element={<CommentsPage />} />
        <Route path="/adminUsers" element={<AdminUsers />} />
        <Route path="*" element={<h1>Esta página no existe</h1>} />
      </Routes>
    </>
  );
}

export default App;
