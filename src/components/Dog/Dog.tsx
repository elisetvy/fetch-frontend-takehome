import { Dog as DogType } from "../interfaces";

interface DogProps {
  dog: DogType;
  favorites: (id: string) => void;
}

function Dog({ dog, setFavorites }: DogProps) {
  function favoriteDog(e) {
    let favorites = sessionStorage.getItem("favorites");
    console.log("ID ", e.target.value);
    console.log("favorites ", favorites);

    if (favorites === null) {
      favorites = [e.target.value];
      sessionStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      const updatedFavorites = [...JSON.parse(favorites)];
      updatedFavorites.push(e.target.value);
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  }

  return (
    <div className="bg-slate-100 rounded-xl overflow-hidden">
      <div className="h-[250px] overflow-hidden">
        <img
          className="aspect-square object-cover h-full w-full"
          src={dog.img}
        ></img>
      </div>
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold">{dog.name}</p>
          <p className="Lexend text-xs uppercase bg-white px-2 py-1 rounded-xl">
            {dog.breed}
          </p>
        </div>
        <p className="Lexend mt-2">Age: {dog.age} </p>
        <p className="Lexend">Location: {dog.zip_code}</p>
        <div className="flex justify-center">
          <button
            value={dog.id}
            onClick={favoriteDog}
            className="Lexend w-full mt-4 bg-rose-500 px-4 py-2 rounded-xl hover:bg-rose-600 text-white"
          >
            Favorite {dog.name}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dog;
