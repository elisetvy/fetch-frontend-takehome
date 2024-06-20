import { useState } from "react";

import { DogProps } from "../interfaces";

function Dog({ dog, setFavorites }: DogProps) {
  const [faves, setFaves] = useState(() => {
    const sessionFaves = sessionStorage.getItem("favorites");
    return sessionFaves ? JSON.parse(sessionFaves) : [];
  });

  function favoriteDog(e) {
    const id = e.target.value;

    setFaves((prev) => {
      let updatedFaves;
      if (prev.includes(id)) {
        updatedFaves = prev.filter((p) => p !== id);
      } else {
        updatedFaves = [...prev, id];
      }

      sessionStorage.setItem("favorites", JSON.stringify(updatedFaves));
      return updatedFaves;
    });
  }

  const isFavorite = faves.includes(dog.id);

  return (
    <div className="bg-slate-100 drop-shadow-md rounded-xl overflow-hidden">
      <div className="h-[250px] overflow-hidden">
        <img
          className="aspect-square object-cover h-full w-full"
          src={dog.img}
        ></img>
      </div>
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-purple">{dog.name}</p>
          <p className="Lexend text-xs uppercase bg-purple text-white px-2 py-1 rounded-xl">
            {dog.breed}
          </p>
        </div>
        <p className="Lexend mt-2 text-purple">Age: {dog.age} </p>
        <p className="Lexend text-purple">Location: {dog.zip_code}</p>
        <div className="flex justify-center">
          <button
            value={dog.id}
            onClick={favoriteDog}
            className={`Lexend w-full mt-4 px-4 py-2 rounded-xl text-white ${
              !isFavorite ? `bg-purple hover:bg-rose-600` : `bg-orange`
            }`}
          >
            {!isFavorite ? `Favorite ${dog.name}` : `Unfavorite ${dog.name}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dog;
