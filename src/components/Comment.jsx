import React, { useState } from "react";
import Spinner from "./Spinner";
import moment from "moment";
import { addToComments, fetchFeedDetail, fetchFeeds } from "../sanity";
import { useDispatch } from "react-redux";
import { SET_FEED } from "../context/actions/feedActions";
const Comment = ({ feed, user, setFeed }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(5);
  const dispatch = useDispatch();
  const saveComment = async (e) => {
    if (e.key === "Enter") {
      if (comment) {
        setIsLoading(true);
        setComment("");
        addToComments(feed?._id, user?.uid, comment).then(() => {
          fetchFeedDetail(feed?._id).then((newData) => {
            setFeed(newData);
            console.log(newData);
            fetchFeeds().then((data) => {
              dispatch(SET_FEED(data));
            });
            setInterval(() => {
              setIsLoading(false);
            }, 2000);
          });
        });
      }
    }
  };
  return (
    <div className="flex flex-col items-start justify-start w-full gap-2">
      <p className="text-lg font-semibold text-primary">Comments</p>
      <div className="flex items-center justify-center w-full gap-3">
        <img
          src={
            "https://th.bing.com/th/id/R.fe9edd4a5d6e4797b29d00e42726f5b6?rik=XEvEIR%2fgn4ritw&pid=ImgRaw&r=0"
          }
          alt=""
          className="object-cover w-16 h-16 rounded-full shadow-md"
        />
        <input
          type="text"
          placeholder="Add your comment"
          value={comment}
          onKeyDown={saveComment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-20 px-2 py-2 text-base border-gray-100 rounded-md shadow-inner outline-none text-primary boder"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-2">
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          <>
            {feed?.comments ? (
              feed.comments.slice(0, index).map((msg) => {
                // console.log(msg);
                return (
                  <div
                    key={msg._id}
                    className="flex items-start justify-start w-full gap-3"
                  >
                    <img
                      src={
                        msg?.users?.photoUrl ||
                        "https://th.bing.com/th/id/R.fe9edd4a5d6e4797b29d00e42726f5b6?rik=XEvEIR%2fgn4ritw&pid=ImgRaw&r=0"
                      }
                      className="object-cover w-16 h-16 rounded-full shadow-md"
                      alt=""
                    />
                    <div className="flex flex-col items-start justify-start w-full gap-2">
                      <div className="flex items-center justify-between w-full">
                        <p className="text-lg font-semibold text-primary">
                          {msg?.users?.displayName}
                        </p>
                        <p>
                          {moment(
                            `${new Date(
                              msg?._createdAt
                            ).toLocaleDateString()} ${new Date(
                              msg?._createdAt
                            ).toLocaleTimeString()}`,
                            "DDMMYYYY h:mm:ss A"
                          ).fromNow()}
                        </p>
                      </div>
                      <p className="text-base text-primary">{msg?.comment}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>Ko có comments</>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
