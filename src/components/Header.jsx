import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../assets";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { firebaseAuth } from "../config/firebase.config";
import { createNewUser } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import { mainMenu } from "../utils/supports";
import { SET_USER_NULL } from "../context/actions/userActions";
const Header = () => {
  const dispatch = useDispatch();
  const [isMenu, setIsMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const [color, setColor] = useState(false);
  const nav = useNavigate();
  const provider = new GoogleAuthProvider();
  const changeColor = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 1) {
        setColor(true);
      } else {
        setColor(false);
      }
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeColor);
  }
  const signWithEmail = async () => {
    await signInWithRedirect(firebaseAuth, provider).then((result) => {
      createNewUser(result?.user?.providerData[0]).then(() => {});
    });
  };
  const logout = async () => {
    await firebaseAuth.signOut().then(() => {
      dispatch(SET_USER_NULL());
      nav("/", { replace: true });
    });
  };
  return (
    <header
      className={`fixed inset-x-0 sm:px-12 lg:px-32 xl:px-44 py-4 flex items-center justify-between z-50 transition-all duration-300 ${
        color ? "bg-white" : "bg-transparent"
      }`}
    >
      <Link to="/">
        <Logo></Logo>
      </Link>
      <div className="flex items-center justify-center gap-2">
        {user ? (
          <>
            <div className="relative cursor-pointer">
              <img
                src={user?.photoURL}
                className="rounded-full w-10 h-10 object-cover"
                alt=""
                referrerPolicy="no-referrer"
                onClick={() => setIsMenu(!isMenu)}
              />
              {isMenu && (
                <div className="absolute right-0 top-12 rounded-md shadow-md w-64 px-4 py-3 bg-[#191826] flex flex-col items-start gap-3">
                  <h2
                    className="text-gray-50 font-semibold"
                    onMouseLeave={() => setIsMenu(false)}
                  >
                    {user?.displayName}
                  </h2>
                  {mainMenu &&
                    mainMenu.map((menu) => (
                      <Link
                        key={menu?.id}
                        to={`/newPost/${menu?.slug}`}
                        className="text-gray-50 font-semibold "
                      >
                        {menu?.name}
                      </Link>
                    ))}
                  <div className="w-full h-[1px] bg-gray-700"></div>
                  <p
                    className="text-xl text-gray-300 bg-blue-400 px-4 py-2 rounded-lg"
                    onClick={logout}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div
              onClick={signWithEmail}
              className={`flex items-center justify-center gap-2 border border-e-gray-300 px-2 py-1 rounded-md backdrop-blur-md cursor-pointer hover:shadow-md active:scale-95 transition-all ease-in-out duration-150`}
            >
              <FcGoogle></FcGoogle>
              <p
                className={`text-base ${
                  color ? "text-primary" : "text-gray-200"
                } `}
              >
                login
              </p>
            </div>
          </>
        )}
        {user && (
          <Link
            to={"/newPost/upload"}
            className="px-4 py-2 rounded-full font-semibold text-base cursor-pointer text-primary bg-emerald-200 hover:bg-emerald-300"
          >
            Upload
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
