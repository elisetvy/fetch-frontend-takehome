import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import LogIn from "./components/LogIn/LogIn";
import NavLink from "./components/NavLink/NavLink";
import Dogs from "./components/Dogs/Dogs";
import Favorites from "./components/Favorites/Favorites";
import LogOut from "./components/LogOut/LogOut";

/** Renders dogs list if user is logged in; otherwise, renders login screen. */

function App() {
  const [currUser, setCurrUser] = useState<string>(
    sessionStorage.getItem("user") || ""
  );
  const [favorites, setFavorites] = useState<string>(
    sessionStorage.getItem("favorites") || ""
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
            <div>
              <div className="max-h-screen mt-4 flex flex-col items-start">
                <NavLink path="/" text="See All Dogs" />
                <NavLink path="/favorites" text="Find Your Pawfect Match" />
                <LogOut setCurrUser={setCurrUser} />
              </div>
            </div>
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
                element={<LogIn setCurrUser={setCurrUser} />}
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
