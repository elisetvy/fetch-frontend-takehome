import Auth from "./components/auth/Auth";

function App() {
  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-bold pb-10">The Pawfect Match</h1>
      <Auth />
    </div>
  );
}

export default App;
