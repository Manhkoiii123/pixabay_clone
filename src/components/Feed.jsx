import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdBookmarks, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { addToCollection, deleteFeed } from "../sanity";
const Feed = ({ data }) => {
  const [alreadySaved, setAlreadySaved] = useState(null);
  const [isHoverred, setIsHoverred] = useState(false);
  const user = useSelector((state) => state.user);
  const feedDelete = () => {
    deleteFeed(data?._id).then(() => {
      window.location.reload();
    });
  };
  const saveToCollections = async (id, uid) => {
    if (!alreadySaved) {
      addToCollection(id, uid).then(() => {
        window.location.reload();
      });
    }
  };
  useEffect(() => {
    setAlreadySaved(
      !!data?.collections?.filter((item) => item._id === user?.uid).length
    );
  }, [data?.collections, user?.uid]);
  return (
    <div
      className="relative m-2 cursor-pointerS"
      onMouseEnter={() => setIsHoverred(true)}
      onMouseLeave={() => setIsHoverred(false)}
    >
      <div className="relative w-auto overflow-hidden rounded-lg shadow-md cursor-pointer">
        {data?.mainImage && (
          <Link to={`/feed-detail/${data?._id}`} className="w-full h-full">
            <img
              src={data.mainImage.asset.url}
              alt=""
              className="object-cover w-full h-full"
            />
          </Link>
        )}
        {data?.otherMedia && (
          <Link to={`/feed-detail/${data?._id}`} className="w-full h-full">
            <video
              src={data.otherMedia.asset.url}
              loop
              autoPlay
              muted
              className="object-cover w-full h-full"
            />
          </Link>
        )}
        {isHoverred && (
          <>
            <div className="absolute inset-x-0 top-0 flex items-center px-3 py-2">
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center border ${
                  alreadySaved ? "border-emerald-400" : "border-gray-100"
                } `}
                onClick={() => saveToCollections(data?._id, user?.uid)}
              >
                <MdBookmarks
                  className={`text-xl ${
                    alreadySaved ? "text-emerald-400" : "text-gray-100"
                  }`}
                />
              </div>
            </div>
            {data?.keywords && (
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 px-3 py-2 bg-gradient-to-bl from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,.8)] backdrop-blur-md flex-wrap">
                {data?.keywords.slice(0, 3).map((tag, i) => (
                  <p className="text-sm font-semibold text-gray-50" key={i}>{`${
                    tag.length > 10 ? `${tag.slice(1, 10)}...` : tag
                  }`}</p>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {user?.uid === data?.users?._id && (
        <div
          onClick={feedDelete}
          className="absolute z-20 w-6 h-6 rounded-full cursor-pointer top-2 right-2 bg-[rgba(256,256,256,0.6)] flex items-center justify-center hover:bg-white"
        >
          <MdDelete className="text-lg text-red-500"></MdDelete>
        </div>
      )}
    </div>
  );
};

export default Feed;
// 5 43 10
