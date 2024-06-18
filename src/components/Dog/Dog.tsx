import { Dog as DogType } from "../interfaces";

interface DogProps {
  dog: DogType;
}

function Dog({ dog }: DogProps) {
  return (
    <div className="bg-slate-100 rounded-xl overflow-hidden">
      <div className="h-[200px] overflow-hidden">
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
      </div>
    </div>
  );
}

export default Dog;
