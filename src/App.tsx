import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./components/auth/Auth";
import Dogs from "./components/Dogs/Dogs";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center my-10 mx-10">
        <h1 className="text-3xl font-bold pb-4">The Pawfect Match</h1>
        <p className="Lexend min-w-2/4 text-center">
          The Pawfect Match is here to help dog lovers like you search through a
          database of shelter dogs, making it easy to find your furry new best
          friend!
        </p>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/dogs" element={<Dogs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
