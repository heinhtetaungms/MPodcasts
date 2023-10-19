import { React, useEffect } from "react";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import bgthree from "../assets/img/bgthree.jpg";
import TypeWriter from "../components/TypeWriter"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authStore from "../zustand/authStore";
import ForgetPassword from "../pages/ForgetPassword";
import Profile from "../pages/Profile"
import MainLayout from "../layout/MainLayout";
import PodcastCreate from "../pages/PodcastCreate";
import UserDetail from "../pages/UserDetail"
import NotFound from "../pages/NotFound";
import VipPage from "../pages/BuyVIPpacketpage";
import BookWriter from "../pages/BookWriter";
import Playlist from "../pages/Playlist";
import PaymentPage from "../pages/PaymentPage";

const MainRoutes = () => {
  const [authToken] = authStore((state)=>[state.token]);

  return (
    <>
      <ToastContainer
          position="top-center"
          autoClose={500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
      />
      {
        authToken !=null ? 
        <Router>
        <MainLayout>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/postcreate" element={<PodcastCreate/>} />
          <Route path="/userdetail" element={<UserDetail/>} />
          <Route path="/buyvip" element={<VipPage/>} />
          <Route path="/originalwriter" element={<BookWriter/>} />
          <Route path="/playlist" element={<Playlist/>} />
          <Route path="/buyvip" element={<VipPage/>}/>
          <Route path="/payment" element={<PaymentPage/>}/>
          {/* <Route Path="/" element={<WriterList/>} /> */}
        </Routes>
      </MainLayout>
      </Router>
         :
        <div className='wrapper' style={{
          backgroundImage: `url(${bgthree})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
          {/* <div className='text-center pt-12'>
            <TypeWriter/> 
          </div> */}
          <div className='flex justify-center items-center h-screen'> 
        <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="register" index element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        </div>
      </div>
      }
    </>
  );
};

export default MainRoutes;
