import "./App.css";
import Room from "./Pages/room";
import LoginPage from "./Pages/LoginPage";
import PrivateRoutes from "./components/PrivateRoutes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
