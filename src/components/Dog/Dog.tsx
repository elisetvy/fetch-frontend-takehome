import { useState } from "react";

import { DogProps } from "../interfaces";

/** Renders dog card. */

function Dog({ dog, setFavorites }: DogProps) {
  const [faves, setFaves] = useState<string[]>(() => {
    const sessionFaves = sessionStorage.getItem("favorites");
    return sessionFaves ? JSON.parse(sessionFaves) : [];
  });

  /** Adds dog ID to favorites array in sessionStorage. */
  function favoriteDog(e: React.MouseEvent<HTMLButtonElement>) {
    const id = e.currentTarget.value;

    setFaves((prev: string[]) => {
      const updatedFaves = [...prev, id];

      setFavorites(JSON.stringify(updatedFaves));
      sessionStorage.setItem("favorites", JSON.stringify(updatedFaves));

      return updatedFaves;
    });
  }

  const isFavorite = faves.includes(dog.id);

  return (
    <div className="bg-slate-100 drop-shadow-md rounded-xl flex flex-col">
      <div className="flex-grow">
        <img
          className="aspect-square object-cover h-full w-full rounded-t-xl"
          src={dog.img}
        ></img>
      </div>
      <div className="flex-shrink-0 px-4 py-4">
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-purple">{dog.name}</p>
          <p className="Lexend text-[10px] uppercase bg-purple text-white px-2 py-1 rounded-xl">
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
              !isFavorite ? `bg-purple hover:bg-[#300d38]` : `bg-orange`
            }`}
            disabled={isFavorite}
          >
            {!isFavorite ? `Favorite ${dog.name}` : `Favorited`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dog;
