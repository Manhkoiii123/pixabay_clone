import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { categoriesList } from "../utils/supports";
import Spinner from "./Spinner";
import { BiCloudUpload } from "react-icons/bi";
import { deleteUploadAsset, savePost, uploadAsset } from "../sanity";
import { FaTrash } from "react-icons/fa";
import { AiFillCloseCircle, AiOutlineClear } from "react-icons/ai";
import { useSelector } from "react-redux";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [asset, setAsset] = useState(null);
  const [alert, setAlert] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.user);
  const handleFileSelect = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    if (file && isAllowed(file)) {
      await uploadAsset(file).then((data) => {
        setAsset(data);
        setInterval(() => {
          setIsLoading(false);
        }, 3000);
      });
    } else {
      setIsLoading(false);
      setAsset(null);
      setAlert("Invalid file type");
      setInterval(() => {
        setAlert(null);
      }, 2000);
    }
  };
  const isAllowed = (file) => {
    const allowTypes = [
      "audio/mp3",
      "audio/wav",
      "video/avi",
      "video/mp4",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];
    return allowTypes.includes(file.type);
  };
  const deleteAsset = async (id) => {
    setIsLoading(true);
    await deleteUploadAsset(id).then((data) => {
      setAsset(null);
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      // nhập tag theo kiểu a,b,c thì sẽ được 3 cái là a b c
      setTags(keywords.split(","));
      setKeywords("");
      // console.log(tags);
    }
  };
  const saveData = async () => {
    if (!title || !asset || !category || !tags) {
      setAlert("Please fill all fields");
      setInterval(() => {
        setAlert(null);
      }, 3000);
    } else {
      // ảnh
      if (asset?.mimeType.split("/")[0] === "image") {
        const doc = {
          // dựa vào vái file post bên pixa sẻver
          _type: "post",
          title: title,
          keywords: tags,
          description,
          filesource:
            asset?.mimeType.split("/")[0] === "image" ? "image" : "others",
          mainImage: {
            _type: "mainImage",
            asset: {
              _type: "reference",
              _ref: asset?._id,
            },
          },
          categories: category,
          users: {
            _type: "reference",
            _ref: user?.uid,
          },
        };
        await savePost(doc).then(() => {
          setTitle("");
          setCategory(null);
          setKeywords("");
          setAsset(null);
          setTags([]);
          setDescription("");
          setAlert("Data Saved");
          setInterval(() => {
            setAlert(null);
          }, 3000);
        });
      } else {
        // video
        const doc = {
          // dựa vào vái file post bên pixa sẻver
          _type: "post",
          title: title,
          keywords: tags,
          description,
          filesource:
            asset?.mimeType.split("/")[0] === "image" ? "image" : "others",
          otherMedia: {
            _type: "otherMedia",
            asset: {
              _type: "reference",
              _ref: asset?._id,
            },
          },
          categories: category,
          users: {
            _type: "reference",
            _ref: user?.uid,
          },
        };
        await savePost(doc).then(() => {
          setTitle("");
          setCategory(null);
          setKeywords("");
          setAsset(null);
          setTags([]);
          setDescription("");
          setAlert("Data Saved");
          setInterval(() => {
            setAlert(null);
          }, 3000);
        });
        window.location.reload();
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-start w-full h-auto gap-4">
      {/* bao loi */}
      {alert && (
        <div className="flex items-center justify-center w-full px-4 py-3 bg-red-100 rounded-md shadow-inner">
          <p className="text-xl font-semibold text-primary">{alert}</p>
        </div>
      )}
      {/* title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Your post title here"
        className="w-full px-4 py-3 text-lg font-semibold border border-gray-200 rounded-md shadow-inner outline-none text-primary focus:border-blue-300 "
      />
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        centeredSlides={false}
        className="mySwiper"
        slidesPerView={8}
      >
        {categoriesList &&
          categoriesList.map((value) => (
            <SwiperSlide key={value.id} className="py-4 ">
              <div
                className={`px-2 py-1 flex items-center justify-center rounded-md border border-gray-200 hover:shadow-md shadow-none ${
                  category === value.name ? "bg-gray-200" : ""
                }`}
                onClick={() => setCategory(value.name)}
              >
                <p className="text-base cursor-pointer text-primary">
                  {value.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex items-center justify-center w-full bg-gray-100 border-2 border-gray-300 border-dotted cursor-pointer h-370 backdrop-blur-md">
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          <>
            {!asset ? (
              <>
                <label className="w-full h-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <p className="text-2xl font-bold">
                        <BiCloudUpload></BiCloudUpload>
                      </p>
                      <p className="text-lg">Click to upload</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="w-0 h-0"
                    accept=".mp3,.wav,.mp4,.jpeg,.png,.gif,.avi,.jpg"
                    onChange={handleFileSelect}
                  />
                </label>
              </>
            ) : (
              <>
                {asset &&
                  [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/gif",
                  ].includes(asset?.mimeType) && (
                    <img
                      src={asset?.url}
                      alt=""
                      className="object-contain w-full h-full"
                    />
                  )}
                {asset &&
                  ["video/mp4", "video/avi", "video/mov", "video/wav"].includes(
                    asset?.mimeType
                  ) && (
                    <video
                      src={asset?.url}
                      controls
                      className="object-cover w-full h-full"
                    />
                  )}
              </>
            )}
          </>
        )}
        {asset && (
          <div
            onClick={() => deleteAsset(asset?._id)}
            className="absolute flex items-center justify-center w-12 h-12 bg-red-400 rounded-full cursor-pointer hover:bg-red-600 top-5 right-5"
          >
            <FaTrash className="text-base text-white" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-4">
        <div className="relative flex flex-col items-center justify-center w-full gap-4">
          <input
            type="text"
            placeholder="Type your Tags here separaterd by comma"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full px-4 py-3 text-lg font-semibold border border-gray-200 rounded-md shadow-inner outline-none text-primary"
            onKeyUp={handleKeyUp}
          />
          <AiOutlineClear
            className="absolute text-xl transition-all duration-150 cursor-pointer right-3 text-primary hover:text-2xl"
            onClick={() => {
              setKeywords("");
              setTags([]);
            }}
          />
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center justify-between w-full h-auto gap-4 px-4 py-4 border border-gray-200 border-dashed rounded-md">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2 px-2 py-1 border border-gray-200 border-dashed rounded-md shadow-inner cursor-pointer hover:bg-gray-200"
              >
                <p>{tag}</p>
                <AiFillCloseCircle
                  onClick={(e) => {
                    setTags(tags.filter((value) => value !== tag));
                  }}
                  className="text-lg cursor-pointer text-primary "
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <textarea
        type="text"
        rows={6}
        cols={1}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-3 text-lg font-semibold border border-gray-200 rounded-md shadow-inner outline-none resize-none text-primary"
      ></textarea>
      <div className="flex items-center w-full">
        <button
          onClick={saveData}
          className="w-full px-4 py-2 ml-auto text-lg bg-blue-300 rounded-md cursor-pointer text-primary hover:bg-blue-600 hover:text-white lg:w-60"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
