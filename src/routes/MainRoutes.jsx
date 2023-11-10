import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authStore from "../zustand/authStore";
import Profile from "../pages/Profile"
import MainLayout from "../layout/MainLayout";
import PodcastCreate from "../pages/PodcastCreate";
import UserDetail from "../pages/UserDetail"
import NotFound from "../pages/NotFound";
import VipPage from "../pages/BuyVIPpacketpage";
import BookWriter from "../pages/BookWriter";
import Playlist from "../pages/Playlist";
import PaymentPage from "../pages/PaymentPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import GetToken from "../pages/GetToken";

const MainRoutes = () => {
    const [authToken] = authStore((state) => [state.token]);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
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
                authToken != null ?
                    <BrowserRouter>
                        <MainLayout>
                            <Routes>
                                <Route path="/" index element={<Home/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/postcreate" element={<PodcastCreate/>}/>
                                <Route path="/userdetail" element={<UserDetail/>}/>
                                <Route path="/buyvip" element={<VipPage/>}/>
                                <Route path="/originalwriter" element={<BookWriter/>}/>
                                <Route path="/playlist" element={<Playlist/>}/>
                                <Route path="/buyvip" element={<VipPage/>}/>
                                <Route path="/payment" element={<PaymentPage/>}/>
                            </Routes>
                        </MainLayout>
                    </BrowserRouter>
                    :
                    <div className="min-h-full h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-4 mb-10">
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<SignupPage/>}/>
                                    <Route path="/signup" element={<SignupPage/>}/>
                                    <Route path="/login" element={<LoginPage/>}/>
                                    <Route path="/oauth2" element={<GetToken />} />
                                    <Route path="*" element={<NotFound/>}/>
                                </Routes>
                            </BrowserRouter>
                        </div>
                    </div>
            }
        </>
    );
};

export default MainRoutes;
