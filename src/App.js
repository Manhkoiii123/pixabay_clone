import { Route, Routes } from "react-router-dom";
import { HomeContainer, NewPost, SearchContainer } from "./containers";
import Header from "./components/Header";
import { useEffect } from "react";
import { firebaseAuth } from "./config/firebase.config";
import { createNewUser } from "./sanity";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import { useState } from "react";
import { FeedDetail, MainLoader } from "./components";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((res) => {
      if (res) {
        // console.log("user : ", res?.providerData[0]);
        createNewUser(res?.providerData[0]).then(() => {
          dispatch(SET_USER(res?.providerData[0]));
          setInterval(() => {
            setIsLoading(false);
          }, 2000);
        });
      }
    });
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center justify-start w-screen min-h-screen">
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          {/* header */}
          <Header></Header>
          {/* mai content section */}
          <main className="flex items-center justify-center w-full h-full">
            <Routes>
              <Route path="/*" element={<HomeContainer />}></Route>
              <Route path="/newPost/*" element={<NewPost />}></Route>
              <Route path="/feed-detail/:_id" element={<FeedDetail />}></Route>
              <Route
                path="/search/:searchTerm"
                element={<SearchContainer />}
              ></Route>
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;

//2:35:53
