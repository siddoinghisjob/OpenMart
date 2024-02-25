import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  const handleClick = () => {
    navigate("/search/" + q);
  };
  return (
    <div className="bg-slate-900 border-b text-white w-full shadow-md">
      <div className="flex md:flex-row flex-col gap-4 items-center h-full px-5 py-2 w-full">
        <div className="flex gap-1 items-center h-full w-full">
          <span className="h-10 bg-white w-10 rounded-full p-2">
            <Link to="/">
              <img src="/store.svg" />
            </Link>
          </span>
          <span className="font-sans hidden md:block font-semibold">
            <Link to="/">OpenMart</Link>
          </span>
          <div className="flex-1 mx-4">
            <form onSubmit={handleClick}>
              <div className="relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg"
                  className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500"
                />
                <input
                  className="w-full px-2 bg-white h-10 shadow-none rounded-lg appearance-none pl-8 text-gray-900"
                  placeholder="Search items..."
                  type="search"
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
            </form>
          </div>
          {!isLoading && isAuthenticated && (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="md:hidden rounded-full p-2 w-10 grid place-items-center h-10 bg-blue-600 hover:bg-white hover:text-black transition-all text-center text-white"
            >
              <img src="/logout.svg" className="w-5" />
            </button>
          )}
        </div>
        <div className="gap-2 p-1 w-full md:w-fit hidden md:flex">
          {!isLoading && isAuthenticated && (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="bg-blue-600 w-full p-5 py-1 hover:bg-white hover:text-black transition-all text-center text-white = rounded-md"
            >
              Logout
            </button>
          )}
          {!isLoading && !isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-600 hover:bg-white hover:text-black transition-all w-full text-center text-white p-5 py-2 rounded-md"
            >
              Login
            </button>
          )}
          {!isLoading && !isAuthenticated && (
            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: "signup",
                  },
                })
              }
              className="bg-emerald-600 hover:bg-white hover:text-black transition-all w-full text-center text-white p-5 py-2 rounded-md"
            >
              Register
            </button>
          )}
          {!isLoading && isAuthenticated && (
            <Link
              to="/post/ad"
              className="bg-purple-600 hover:bg-white hover:text-black transition-all w-full justify-center items-center flex text-center text-white p-5 py-2 rounded-md"
            >
              Post&nbsp;Ad
            </Link>
          )}
          {!isLoading && isAuthenticated && (
            <Link
              to="/post/request"
              className="bg-purple-600 hover:bg-white hover:text-black transition-all w-full flex items-center justify-center text-center text-white p-5 py-2 rounded-md"
            >
              Request&nbsp;Item
            </Link>
          )}
        </div>
        <div className="gap-2 w-full md:w-fit md:hidden flex">
          {!isLoading && !isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-600 hover:bg-white hover:text-black transition-all w-full text-center text-white p-5 py-2 rounded-md"
            >
              Login
            </button>
          )}
          {!isLoading && !isAuthenticated && (
            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: "signup",
                  },
                })
              }
              className="bg-emerald-600 hover:bg-white hover:text-black transition-all w-full text-center text-white p-5 py-2 rounded-md"
            >
              Register
            </button>
          )}
          {!isLoading && isAuthenticated && (
            <>
              <Link
                to="/post/ad"
                className="bg-purple-600 hover:bg-white hover:text-black transition-all w-full text-center text-white p-5 py-2 rounded-md"
              >
                Post Ad
              </Link>
              <Link
                to="/post/request"
                className="bg-purple-600 hover:bg-white hover:text-black transition-all w-full text-center text-white p-5 py-2 rounded-md"
              >
                Request Item
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
