import { useState, useEffect } from "react";

import Api from "../api";
import { Dog } from "../interfaces";

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
        <>
          <p className="mt-10 text-3xl">here some dogs</p>
          <ul>
            {dogs.map((dog: Dog) => {
              return <li>{dog.name}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default Dogs;
