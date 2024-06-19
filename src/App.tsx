import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";

import Auth from "./components/auth/Auth";
import Dogs from "./components/Dogs/Dogs";

function App() {
  const [currUser, setCurrUser] = useState(
    sessionStorage.getItem("user") || null
  );

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center my-10 mx-10">
        <Link to="/" className="text-3xl font-bold pb-4">
          The Pawfect Match
        </Link>
        <p className="Lexend min-w-2/4 text-center">
          The Pawfect Match is here to help dog lovers like you search through a
          database of shelter dogs, making it easy to find your furry new best
          friend!
        </p>
        <Routes>
          {currUser === null ? (
            <Route
              path="/"
              element={<Auth setCurrUser={setCurrUser} />}
            ></Route>
          ) : (
            <Route path="/" element={<Dogs />}></Route>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
