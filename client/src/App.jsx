import "./App.css";
import LoginPage from "./components/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_KEY } from "./constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";
import PrivateUser from "./components/PrivateUser";

function App() {
  const [user, setUser] = useState("");
  const [provider, setProvider] = useState("");
  return (
    <div>
      <GoogleOAuthProvider clientId={CLIENT_KEY}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <LoginPage setUser={setUser} setProvider={setProvider} />
              }
            />
            <Route element={<PrivateUser/>}>
              <Route
                exact
                path="home"
                element={<Home user={user} provider={provider} />}
              />
            </Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
