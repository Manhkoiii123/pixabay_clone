import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds } from "../sanity";
import { SET_FEED } from "../context/actions/feedActions";
import { Banner, Filter, MasonryLayout, Spinner } from "../components";

const HomeContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const feeds = useSelector((state) => state.feeds);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!feeds) {
      setIsLoading(true);
      fetchFeeds().then((data) => {
        dispatch(SET_FEED(data));
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
      });
    }
  }, [dispatch, feeds]);
  return (
    <div className="w-full h-[5000px]">
      <Banner></Banner>
      <Filter></Filter>

      {isLoading ? (
        <div className="flex items-center justify-center w-full p-12 ">
          <Spinner></Spinner>{" "}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between w-full gap-3 px-8 py-6">
          <MasonryLayout feeds={feeds}></MasonryLayout>
        </div>
      )}
    </div>
  );
};

export default HomeContainer;
