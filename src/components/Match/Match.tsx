import { Link } from "react-router-dom";

function Match() {

  return (
    <div className="flex flex-col items-center">
      <Link to="/favorites">
        <button className="Lexend mt-4 bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 text-white">
          Find Your Pawfect Match!
        </button>
      </Link>
    </div>
  );
}

export default Match;
