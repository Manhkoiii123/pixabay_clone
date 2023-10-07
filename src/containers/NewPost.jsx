import React from "react";
import { Banner } from "../assets";
import { subMenu } from "../utils/supports";
import { NavLink, Route, Routes } from "react-router-dom";
import { Collections, CreatePost, MyMedia } from "../components";
import { useSelector } from "react-redux";

const NewPost = () => {
  const feeds = useSelector((state) => state.feeds);
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-auto">
      <div className="relative w-full h-340">
        <img src={Banner} className="object-cover w-full h-full" alt="" />
        <div className="absolute inset-0 bg-overlay-4"></div>
      </div>

      {/* filter */}
      <section className="flex flex-col items-center justify-start w-full h-auto px-6 py-12 xl:px-16">
        <div className="flex items-center justify-start w-full h-auto overflow-x-scroll sm:overflow-auto">
          <ul className="flex items-center justify-center gap-6">
            {subMenu &&
              subMenu.map((menu) => (
                <NavLink
                  key={menu.id}
                  className={({ isActive }) =>
                    isActive
                      ? "text-lg text-blue-400 hover:text-blue-400 cursor-pointer"
                      : "text-lg text-primary hover:text-blue-400 cursor-pointer"
                  }
                  to={menu.slug}
                >
                  {menu.name}
                </NavLink>
              ))}
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start w-full h-auto py-4">
          <Routes>
            <Route path="/upload" element={<CreatePost />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/my-media" element={<MyMedia feeds={feeds} />} />
          </Routes>
        </div>
      </section>
    </div>
  );
};

export default NewPost;
