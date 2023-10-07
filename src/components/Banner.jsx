import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Banner as Ban } from "../assets";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const [search, setSearch] = useState("");
  const nav = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      nav(`search/${search}`, { replace: true });
    }
  };
  return (
    <div className="relative flex items-center justify-center w-screen h-420">
      <img src={Ban} className="object-cover w-full h-full" alt="" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <h2 className="text-4xl font-extrabold tracking-wider text-white">
          Stunning free images & royalty free stock
        </h2>
        <p className="text-white">
          Over 4.2 million+ high quality stock images, videos and music shared
          by our talented community
        </p>
        <div className="flex items-center justify-between w-1/2 gap-4 px-4 py-3 bg-white rounded-full">
          <FaSearch color="#656f79" size={16}></FaSearch>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="search here"
            className="flex-1 text-lg font-semibold border-none outline-none text-textColor"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
