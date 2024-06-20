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
      <div className="h-screen grid grid-cols-3">
        <div className="col-span-1 flex flex-col justify-center bg-orange text-purple px-10 py-10">
          <p className="mt-4 text-3xl font-bold">The Pawfect Match</p>
          <p className="Lexend mt-4">
            The Pawfect Match is here to help dog lovers like you search through
            a database of shelter dogs, making it easy to find a lucky dog a new
            home!
          </p>
          {currUser && (
            <>
              <div className="max-h-screen mt-4 flex flex-col items-start">
                <Link to="/">
                  <button className="Lexend mt-4 bg-purple px-4 py-2 rounded-xl hover:bg-[#300D38] text-white">
                    See All Dogs
                  </button>
                </Link>{" "}
                <Match />
                <LogOut setCurrUser={setCurrUser} />
              </div>
            </>
          )}
        </div>
        <div className="max-h-screen col-span-2 px-10 py-10">
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
    </BrowserRouter>
  );
}

export default App;
