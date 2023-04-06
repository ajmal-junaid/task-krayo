import "./App.css";
import LoginPage from "./components/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_KEY } from "./constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId={CLIENT_KEY}>
        <Router>
          <Routes>
            <Route exact path="signin" element={<LoginPage />} />
            <Route exact path="home" element={<Home />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
