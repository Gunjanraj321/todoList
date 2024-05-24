import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Header from "./components/Header";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Home from "./components/Body/Home";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/signup" element={<PublicRoute element={Signup} />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          {<Route path="/" element={<PrivateRoute element={Home} />} />}
        </Routes>
      </main>
    </div>
  );
}

export default App;
