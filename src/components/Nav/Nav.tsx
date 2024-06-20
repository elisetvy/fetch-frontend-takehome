import Match from "../Match/Match";
import LogOut from "../LogOut/LogOut";

function Nav({ setCurrUser }) {
  return (
    <div className="flex justify-end gap-2 w-full">
      <Match></Match>
      <LogOut setCurrUser={setCurrUser}></LogOut>
    </div>
  );
}

export default Nav;
