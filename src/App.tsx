import Auth from "./components/auth/Auth";

function App() {
  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-bold pb-4">The Pawfect Match</h1>
      <p className="Lexend w-2/4 text-center pb-10">
        The Pawfect Match is here to help dog lovers like you search through a
        database of shelter dogs, making it easy to find your furry new best friend!
      </p>
      <Auth />
    </div>
  );
}

export default App;
