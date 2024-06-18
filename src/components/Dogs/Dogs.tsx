import { useState, useEffect } from "react";

import Api from "../api";
import { Dog as DogType } from "../interfaces";
import Dog from "../Dog/Dog";

function Dogs() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDogs() {
      try {
        const resp = await Api.searchDogs();
        const ids = await resp.resultIds;
        const gottenDogs = await Api.fetchDogs(ids);
        setDogs(gottenDogs);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getDogs();
  }, []);

  return (
    <div className="mt-10">
      {loading === false && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {dogs.map((d: DogType) => {
            return <Dog dog={d} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Dogs;
