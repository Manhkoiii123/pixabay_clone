import React, { useEffect, useState } from "react";
import { Bad, Banner } from "../assets";
import { Filter, MasonryLayout, Spinner } from "../components";
import { useParams } from "react-router-dom";
import { fetchSearchQuery } from "../sanity";

const SearchContainer = () => {
  const { searchTerm } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [searchFeeds, setSearchFeeds] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchSearchQuery(searchTerm).then((data) => {
      console.log(data);
      setSearchFeeds(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [searchTerm]);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-auto">
      <div className="relative w-full h-340">
        <img src={Banner} alt="" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-overlay-4"></div>
      </div>
      <Filter />

      <section className="flex flex-wrap items-center justify-center w-full gap-3 px-8 py-6 ">
        {isLoading ? (
          <div className="flex items-center justify-center w-full py-12">
            <Spinner></Spinner>
          </div>
        ) : (
          <>
            {searchFeeds?.length > 0 ? (
              <>
                <MasonryLayout feeds={searchFeeds}></MasonryLayout>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full gap-3 py-24">
                <img src={Bad} alt="" className="object-contain w-32" />
                <p className="text-xl font-bold lg:text-3xl text-primary">
                  Sorry! No result found
                </p>
                <p className="text-lg lg:text-lg text-primary">
                  We're sorry what you were looking for. Please try another term
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default SearchContainer;
