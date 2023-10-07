/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds } from "../sanity";
import { SET_FEED } from "../context/actions/feedActions";
import Spinner from "./Spinner";
import MasonryLayout from "./MasonryLayout";

const Collections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const feeds = useSelector((state) => state.feeds);
  const user = useSelector((state) => state.user);
  const [saved, setSaved] = useState([]);
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
  }, []);
  useEffect(() => {
    if (feeds && saved.length === 0) {
      feeds?.map((feed) => {
        feed?.collections?.map((colc) => {
          if (colc._id === user?.uid) {
            setSaved((prev) => [...prev, feed]);
          }
        });
      });
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-start w-full h-auto">
      {isLoading ? <Spinner /> : <MasonryLayout feeds={saved} />}
    </div>
  );
};

export default Collections;
