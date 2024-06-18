import { Dog as DogType } from "../interfaces";

interface DogProps {
  dog: DogType;
}

function Dog({ dog }: DogProps) {
  return (
    <div>
      <p>{dog.name}</p>
      <img src={dog.img}></img>
    </div>
  );
}

export default Dog;
