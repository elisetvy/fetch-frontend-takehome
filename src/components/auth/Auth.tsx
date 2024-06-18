function Auth() {
    return (
        <form className="flex flex-col border-black border">
            <label>Name:</label>
            <input className="bg-blue-200 px-2 py-1"></input>
            <label>Email:</label>
            <input className="bg-blue-200 px-2 py-1"></input>
            <button>Submit</button>
        </form>
    )
}

export default Auth;