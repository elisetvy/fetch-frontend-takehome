import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";

import Auth from "./components/Auth/Auth";
import Nav from "./components/Nav/Nav";
import Dogs from "./components/Dogs/Dogs";
import Favorites from "./components/Favorites/Favorite";

function App() {
  const [currUser, setCurrUser] = useState(
    sessionStorage.getItem("user") || null
  );
  const [favorites, setFavorites] = useState(
    sessionStorage.getItem("favorites") || null
  );

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center my-4 mx-10">
        {currUser && <Nav setCurrUser={setCurrUser} />}
        <Link to="/" className="mt-4 text-3xl font-bold">
          The Pawfect Match
        </Link>
        <p className="Lexend mt-4 min-w-2/4 text-center">
          The Pawfect Match is here to help dog lovers like you search through a
          database of shelter dogs, making it easy to find your furry new best
          friend!
        </p>
        <Routes>
          {currUser ? (
            <>
              <Route
                path="/"
                element={<Dogs setFavorites={setFavorites} />}
              ></Route>
              <Route
                path="/favorites"
                element={<Favorites favorites={favorites} setFavorites={setFavorites} />}
              />
            </>
          ) : (
            <Route
              path="/"
              element={<Auth setCurrUser={setCurrUser} />}
            ></Route>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
