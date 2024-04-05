// import React, { useState } from "react";
// import Layout from "./Layout/Layout";
// import Login from "./Components/LoginPage/Login";
// import { Navigate, Outlet, Route, Routes } from "react-router-dom";
// import SignUp from "./Components/SignUpPage/SignUp";
// import Header from "./Components/Header/Header";
// import Home from "./Components/Home/Home";
// import CreatePost from "./Components/CreatePost/CreatePost";
// import DataProvider from "./Components/Context/DataProvider";
// import ImageUpload from "./Components/ImageUpload";
// import SingleBlog from "./Components/SingleBlog/SingleBlog";
// import { Toaster } from 'react-hot-toast';
// import Update from "./Components/UpdateBlog/Update";

// const PrivateRoute = ({ isAuthenticated, ...props }) => {
//   return isAuthenticated ? (
//     <>
//       <Header />
//       <Outlet />
//     </>
//   ) : (
//     <Navigate replace to="/login" />
//   );
// };

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <>
//       <Toaster
//         toastOptions={{
//           style: {
//             background: 'rgb(51,65,85)',
//             color: 'white'
//           }
//         }} />
//       <DataProvider>

//         <div>
//           <Routes>
//             <Route path="/" element={<Layout />} />
//             <Route
//               path="/login"
//               element={<Login setIsAuthenticated={setIsAuthenticated} />}
//             />
//             <Route path="/signUp" element={<SignUp />} />

//             <Route
//               path="/"
//               element={<PrivateRoute isAuthenticated={isAuthenticated} />}
//             >
//               <Route path="/home" element={<Home />} />
//               <Route path="/singleBlog/:id" element={<SingleBlog />} />
//             </Route>
//             <Route path="/upload" element={<ImageUpload />} />

//             <Route
//               path="/createPost"
//               element={<PrivateRoute isAuthenticated={isAuthenticated} />}
//             >
//               <Route path="/createPost" element={<CreatePost />} />
//             </Route>

//             <Route path="/updatePost/:id" element={<Update />} />
//           </Routes>
//         </div>
//       </DataProvider>
//     </>
//   );
// }

// export default App;
import React, { useState, lazy, Suspense } from "react";
import Layout from "./Layout/Layout";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import MyBlogs from "./Components/MyBlogs/MyBlogs";
import { UserProvider } from "./Components/Context/UserContext";


// Lazy load components
const Login = lazy(() => import("./Components/LoginPage/Login"));
const SignUp = lazy(() => import("./Components/SignUpPage/SignUp"));
const Header = lazy(() => import("./Components/Header/Header"));
const Home = lazy(() => import("./Components/Home/Home"));
const CreatePost = lazy(() => import("./Components/CreatePost/CreatePost"));
const ImageUpload = lazy(() => import("./Components/ImageUpload"));
const SingleBlog = lazy(() => import("./Components/SingleBlog/SingleBlog"));
const Update = lazy(() => import("./Components/UpdateBlog/Update"));
const Contact = lazy(() => import("./Components/Contact/Contact"))

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: 'rgb(51,65,85)',
            color: 'white'
          }
        }} />
      <UserProvider>
        <div>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route
              path="/login"
              element={
                <Suspense fallback={<div className="text-xl font-bold text-center mt-4">Loading...</div>}>
                  <Login setIsAuthenticated={setIsAuthenticated} />
                </Suspense>
              }
            />
            <Route
              path="/signUp"
              element={
                <Suspense fallback={<div className="text-xl font-bold text-center mt-4">Loading...</div>}>
                  <SignUp />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={<div className="text-xl font-bold text-center mt-4">Loading...</div>}>
                  <PrivateRoute isAuthenticated={isAuthenticated} />
                </Suspense>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/singleBlog/:id" element={<SingleBlog />} />
            </Route>
            <Route
              path="/upload"
              element={
                <Suspense fallback={<div className="text-xl font-bold text-center mt-4">Loading...</div>}>
                  <ImageUpload />
                </Suspense>
              }
            />
            <Route
              path="/Contact"
              element={
                <Suspense fallback={<div className="text-xl font-bold text-center mt-4">Loading...</div>}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/createPost"
              element={
                <Suspense fallback={<div className="text-xl font-bold text-center mt-4">Loading...</div>}>
                  <PrivateRoute isAuthenticated={isAuthenticated} />
                </Suspense>
              }
            >
              <Route path="/createPost" element={<CreatePost />} />
            </Route>
            <Route
              path="/MyBlogs/:id"
              element={
                <Suspense fallback={<div className="text-xl font-bold text-center mt-4">Loading...</div>}>
                  <PrivateRoute isAuthenticated={isAuthenticated} />
                </Suspense>
              }
            >
              <Route path="/MyBlogs/:id" element={<MyBlogs />} />
            </Route>
            <Route
              path="/updatePost/:id"
              element={
                <Suspense fallback={<div className="text-xl font-bold text-center  mt-4">Loading...</div>}>
                  <Update />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
