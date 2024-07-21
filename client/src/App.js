import React, { lazy, Suspense } from "react";
// import Layout from "./Layout/Layout";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MyBlogs from "./Components/MyBlogs/MyBlogs";
import { UserProvider } from "./Components/Context/UserContext";
import AuthHandler from "./utils/AuthHandler";
import UserProfilePage from "./Components/UserProfile/UserProfilePage";
import Loading from "./utils/Loading";
import AdminPanelPage from "./Components/AdminPanel/AdminPanelPage";

// Lazy load components
const Login = lazy(() => import("./Components/LoginPage/Login"));
const SignUp = lazy(() => import("./Components/SignUpPage/SignUp"));
const Header = lazy(() => import("./Components/Header/Header"));
const Home = lazy(() => import("./Components/Home/Home"));
const CreatePost = lazy(() => import("./Components/CreatePost/CreatePost"));
const ImageUpload = lazy(() => import("./Components/ImageUpload"));
const SingleBlog = lazy(() => import("./Components/SingleBlog/SingleBlog"));
const Update = lazy(() => import("./Components/UpdateBlog/Update"));
const Contact = lazy(() => import("./Components/Contact/Contact"));

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("crsftoken");
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
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(51,65,85)",
            color: "white",
          },
        }}
      />

      <UserProvider>
        <div>
          <Routes>
            {/* <Route path="/" element={<Layout />} /> */}
            <Route
              path="/login"
              element={
                <Suspense
                  fallback={
                    <Loading />
                  }
                >
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/signUp"
              element={
                <Suspense
                  fallback={
                    <Loading />
                  }
                >
                  <SignUp />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRoute />
                </Suspense>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/singleBlog/:id" element={<SingleBlog />} />
            </Route>
            <Route
              path="/upload"
              element={
                <Suspense fallback={<Loading />}>
                  <ImageUpload />
                </Suspense>
              }
            />
            <Route
              path="/Contact"
              element={
                <Suspense fallback={<Loading />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/createPost"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRoute />
                </Suspense>
              }
            >
              <Route path="/createPost" element={<CreatePost />} />
            </Route>
            <Route
              path="/MyBlogs/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRoute />
                </Suspense>
              }
            >
              <Route path="/MyBlogs/:id" element={<MyBlogs />} />
            </Route>
            <Route
              path="/updatePost/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <Update />
                  <PrivateRoute />
                </Suspense>
              }
            />
            <Route path="/auth-handler" element={<AuthHandler />} />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loading />}>
                  <UserProfilePage />
                  <PrivateRoute />
                </Suspense>
              }
            />
            <Route
              path="/admin-panel"
              element={
                <Suspense fallback={<Loading />}>
                  <AdminPanelPage />
                  <PrivateRoute />
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
