import { useState, useEffect } from "react";

import Dog from "../Dog/Dog";
import Search from "../Search/Search";

import { Dog as DogType } from "../interfaces";
import Api from "../api";

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
      <Search />
      {loading === false && (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
          {dogs.map((d: DogType) => {
            return <Dog dog={d} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Dogs;
