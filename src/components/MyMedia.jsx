import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import MasonryLayout from "./MasonryLayout";
const MyMedia = ({ feeds }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [filteredFeed, setFilterFeed] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    setFilterFeed(feeds?.filter((data) => data.users._id === user?.uid));
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col items-start justify-start w-full h-auto">
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <div className="flex-wrap items-center justify-between w-full gap-3">
            <MasonryLayout feeds={filteredFeed}></MasonryLayout>
          </div>
        </>
      )}
    </div>
  );
};

export default MyMedia;
