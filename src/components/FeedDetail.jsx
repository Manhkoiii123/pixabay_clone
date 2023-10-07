import React, { useEffect, useState } from "react";
import { Banner } from "../assets";
import { useParams } from "react-router-dom";
import { addToCollection, fetchFeedDetail } from "../sanity";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdBookmark } from "react-icons/md";
import MasonryLayout from "./MasonryLayout";
import Comment from "./Comment";
import Filter from "./Filter";
const FeedDetail = () => {
  const [feed, setFeed] = useState(null);
  const [alreadySaved, setAlreadySaved] = useState(null);
  const user = useSelector((state) => state.user);
  const feeds = useSelector((state) => state.feeds);
  const { _id } = useParams();
  useEffect(() => {
    fetchFeedDetail(_id).then((data) => {
      setFeed(data[0]);
    });
  }, [_id, feeds, feed]);
  useEffect(() => {
    setAlreadySaved(
      !!feed?.collections?.filter((item) => item.id === user?.uid)?.length
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alreadySaved, _id]);
  const saveToCollections = async (id, uid) => {
    if (!alreadySaved) {
      addToCollection(id, uid).then(() => {
        window.location.reload();
      });
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-auto">
      <div className="relative w-full h-[240px]">
        <img src={Banner} className="object-cover w-full h-full" alt="" />
        <div className="absolute inset-0 bg-overlay-4"></div>
      </div>

      <Filter />

      <div className="grid w-full grid-cols-1 gap-4 px-8 py-6 lg:grid-cols-2 lg:px-12 xl:px-32">
        <div className="flex flex-col items-center justify-start gap-4 ">
          <div className="flex h-auto lg:h-600 xl:h-[800px] items-center justify-center flex-col overflow-hidden rounded-md shadow-md">
            {feed?.mainImage && (
              <img
                src={feed?.mainImage.asset.url}
                alt=""
                className="object-cover w-full h-full"
              />
            )}
            {feed?.otherMedia && (
              <video
                src={feed?.otherMedia.asset.url}
                loop
                autoPlay
                muted
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="flex flex-col items-start justify-start w-full py-4">
            <Comment feed={feed} user={user} setFeed={setFeed} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-6">
          <div className="flex items-center justify-center gap-3">
            <img
              src={
                feed?.users?.photoUrl ||
                "https://th.bing.com/th/id/R.fe9edd4a5d6e4797b29d00e42726f5b6?rik=XEvEIR%2fgn4ritw&pid=ImgRaw&r=0"
              }
              className="object-cover w-12 h-12 rounded-full shadow-sm"
              alt=""
            />
            <p className="text-xl font-semibold text-primary">
              {feed?.users?.displayName}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-2 px-2 py-1 border border-red-200 rounded-md">
              <FaHeart className="text-lg text-red-500" />
              {feed?.collections?.length > 0 ? (
                <p className="text-base font-semibold text-primary">
                  {feed?.collections?.length}
                </p>
              ) : (
                <p className="text-base font-semibold text-primary">0</p>
              )}
            </div>
            <div
              className={`w-8 h-8 rounded-md flex items-center justify-center border cursor-pointer ${
                alreadySaved
                  ? "border-emerald-400"
                  : "border-gray-100 bg-gray-300"
              }`}
              onClick={() => saveToCollections(feed?._id, user?.uid)}
            >
              {alreadySaved ? (
                <MdBookmark className="text-xl text-emerald-400" />
              ) : (
                <MdBookmark className="text-xl text-white" />
              )}
            </div>
          </div>
          {feed?.keywords?.length > 0 && (
            <p className="text-base font-semibold text-primary">
              Tags :{" "}
              {feed?.keywords?.map((tag, index) => (
                <span
                  className="px-1 py-[2px] mx-1 rounded-md border border-gray-200 text-center"
                  key={index}
                >
                  {tag}
                </span>
              ))}
            </p>
          )}
          {user && (
            <>
              {feed?.mainImage && (
                <a
                  href={`${feed?.mainImage?.asset.url}?dl`}
                  className="w-auto px-16 py-2 text-lg font-semibold rounded-full text-gray-50 bg-emerald-500 hover:shadow-md"
                >
                  Free DownLoad
                </a>
              )}
              {feed?.otherMedia && (
                <a
                  href={`${feed?.otherMedia?.asset.url}?dl`}
                  className="w-auto px-16 py-2 text-lg font-semibold rounded-full text-gray-50 bg-emerald-500 hover:shadow-md"
                >
                  Free DownLoad
                </a>
              )}
            </>
          )}
          <div className="w-full h-[1px] rounded-md bg-gray-200"></div>
          <p className="text-base text-primary">{feed?.description}</p>
          <p className="text-lg font-semibold text-primary">Suggested Post</p>
          <div className="flex-wrap items-center justify-center w-full gap-3">
            <MasonryLayout
              isSuggestions={true}
              feeds={
                feed?.otherMedia
                  ? feeds?.filter((item) => item.otherMedia)
                  : feeds?.slice(0, 6).filter((item) => item.mainImage)
              }
            ></MasonryLayout>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full px-12 xl:px-32">
        <p className="text-lg font-semibold text-primary">Related Post</p>
        <div className="flex-wrap items-center justify-center w-full gap-3">
          <MasonryLayout
            feeds={
              feed?.otherMedia
                ? feeds?.filter((item) => item.otherMedia)
                : feeds?.filter((item) => item.mainImage)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
