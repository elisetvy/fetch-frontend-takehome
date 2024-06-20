import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";

import Auth from "./components/Auth/Auth";
import Match from "./components/Match/Match";
import Dogs from "./components/Dogs/Dogs";
import Favorites from "./components/Favorites/Favorites";
import LogOut from "./components/LogOut/LogOut";

function App() {
  const [currUser, setCurrUser] = useState(
    sessionStorage.getItem("user") || null
  );
  const [favorites, setFavorites] = useState(
    sessionStorage.getItem("favorites") || null
  );

  return (
    <BrowserRouter>
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex flex-col justify-center bg-rose-100 min-h-screen px-10 py-10">
          <p className="mt-4 text-3xl font-bold">The Pawfect Match</p>
          <p className="Lexend mt-4">
            The Pawfect Match is here to help dog lovers like you search through
            a database of shelter dogs, making it easy to find your furry new
            best friend!
          </p>
          {currUser && (
            <>
              <div className="mt-4 flex flex-col items-start">
                <Match />
                <LogOut setCurrUser={setCurrUser} />
              </div>
            </>
          )}
        </div>
        <div className="col-span-2 bg-blue-100 min-h-screen px-10 py-10">
          <Routes>
            {currUser ? (
              <>
                <Route
                  path="/"
                  element={<Dogs setFavorites={setFavorites} />}
                ></Route>
                <Route
                  path="/favorites"
                  element={
                    <Favorites
                      favorites={favorites}
                      setFavorites={setFavorites}
                    />
                  }
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
      </div>
      {/* <div className="flex flex-col items-center mx-10 my-10">
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
                element={
                  <Favorites
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                }
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
      </div> */}
    </BrowserRouter>
  );
}

export default App;
