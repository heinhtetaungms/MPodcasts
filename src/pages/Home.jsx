import {useCallback, useEffect, useState} from "react";
import authStore from "../zustand/authStore";
import Banner from "../components/Banner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay, faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import HeartReaction from "../components/HeartReaction";
import PodcastAudioPlayer from "../components/PodcastAudioPlayer";
import {PodcastViewData} from "../api/getPodcastViewData";
import {PodcastLikeData} from "../api/getPodcastLikeData";
import {RecentData} from "../api/RecentData";

const Home = () => {
    const [authToken] = authStore((state) => [state.token]);
    const [dataForRecent, setDataForRecent] = useState([]);
    const [podcastViewList, setPodcastViewList] = useState([]);
    const [podcastLikeData, setPodcastLikeData] = useState([]);

    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioData, setAudioData] = useState({
        title: '',
        writer: '',
        fileName: '',
        imageUrl: '',
        podcastId: '',
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const playHandler = useCallback((podcastId, fileUrl, title, writerName, imageUrl) => {
        const delimiter = 'https://storage.googleapis.com/m-podcats.appspot.com/';
        const urlResult = fileUrl.split(delimiter);
        const fileUrlCleaned = urlResult[1].replace(/\s+/g, '');

        setAudioData({
            title,
            writer: writerName,
            fileName: fileUrlCleaned,
            imageUrl,
            podcastId,
        });
        setAudioPlaying(true);
    }, []);

    useEffect(() => {
        RecentData({authToken}).then((response) => {
            if (response.httpResponse === 200) {
                setDataForRecent(response.data);
            } else {
                throw new Error("Failed to fetch candidates");
            }
        });
        PodcastViewData({authToken}).then((response) => {
            if (response.httpResponse === 200) {
                setPodcastViewList(response.data);
            } else {
                throw new Error("Failed to fetch candidates");
            }
        });
        PodcastLikeData({authToken}).then((response) => {
            if (response.httpResponse === 200) {
                setPodcastLikeData(response.data);
            } else {
                throw new Error("Failed to fetch candidates");
            }
        });
    }, [authToken]);

    return (
        <div className="flex flex-col w-full h-screen relative dark:bg-dark">
            <div>
                <div className="px-[30px] dark:bg-dark">
                    <div className="my-5">
                        <Banner/>
                    </div>
                    <div className="my-4 dark:bg-dark">
                        <div className="flex justify-between">
                            <div className="w-50%">
                                <h2 className="py-5 text-2xl font-bold text-darkgray tracking-wide dark:text-fontdark font-mono">
                                    TRENDS
                                </h2>
                                {podcastViewList.slice(0, 3).map((data) => (
                                    <div
                                        key={data.id}
                                        onClick={() =>
                                            playHandler(
                                                data.id,
                                                data.fileUrl,
                                                data.title,
                                                data.writer.name,
                                                data.imageUrl
                                            )
                                        }
                                        className="flex items-center w-full justify-between pr-[30px] py-3 my-1 hover:bg-[#f2f2f2] hover:dark:bg-black"
                                    >
                                        <div
                                            className="flex border-l-3 border-gray-300 dark:border-gray-700 items-center px-3">
                                            <span className="pr-2">
                                                <FontAwesomeIcon icon={faPlayCircle}
                                                                 className="text-[#0080ff] text-xl"/>
                                            </span>
                                            <div className="object-center object-cover w-[80px] h-[80px] p-2">
                                                <img src={data.imageUrl} className="w-full h-full"/>
                                            </div>
                                            <div className="dark:text-fontdark">
                                                <h2 className="font-semibold">{data.title}</h2>
                                                <span className="text-xs text-light">{data.writer.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-1 text-xs text-light text-[#00cc99] py-1 px-2">Premium
                                            </div>
                                            <span
                                                className="text-xs text-light text-[#0080ff] py-1 px-2 rounded-lg border-gray-300 border-1">
                                                Details
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-50%">
                                <h2 className="py-5 text-2xl font-bold text-darkgray tracking-wide font-mono dark:text-fontdark">
                                    MOST POPULAR
                                </h2>
                                {podcastLikeData.slice(0, 3).map((data) => (
                                    <div
                                        key={data.id}
                                        onClick={() =>
                                            playHandler(
                                                data.id,
                                                data.fileUrl,
                                                data.title,
                                                data.writer.name,
                                                data.imageUrl
                                            )
                                        }
                                        className="flex items-center w-full justify-between pr-[30px] py-3 my-1 hover:bg-[#f2f2f2] hover:dark:bg-black"
                                    >
                                        <div
                                            className="flex border-l-3 border-gray-300 dark:border-gray-700 items-center px-3">
                                            <span className="pr-2">
                                                <FontAwesomeIcon icon={faPlayCircle}
                                                                 className="text-[#0080ff] text-xl"/>
                                            </span>
                                            <div className="object-center object-cover w-[80px] h-[80px] p-2">
                                                <img src={data.imageUrl} className="w-full h-full"/>
                                            </div>
                                            <div className="dark:text-fontdark">
                                                <h2 className="font-semibold">{data.title}</h2>
                                                <span className="text-xs text-light">{data.writer.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-1 text-xs text-light text-[#00cc99] py-1 px-2">Premium
                                            </div>
                                            <span
                                                className="text-xs text-light text-[#0080ff] py-1 px-2 rounded-lg border-gray-300 border-1">
                                                Details
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="my-5">
                            <h2 className="py-5 text-2xl font-bold text-center text-[#4d4d4d] tracking-wide font-mono dark:text-fontdark">
                                RECENTLY PLAYED
                            </h2>
                            <Slider {...settings}>
                                {dataForRecent.map((data) => (
                                    <div className="p-2 my-3 flex flex-wrap flex-col" key={data.id}>
                                        <div className="object-center object-cover h-[200px] relative">
                                            <img src={data.imageUrl} alt="my image"
                                                 className="h-full rounded-lg opacity-100"/>
                                            <div className="absolute bottom-2 left-3 z-20">
                                                <span>
                                                    <HeartReaction initialLikeCount={data.likeCount} podcastId={data.id}
                                                                   initialLikeStatus={data.liked}/>
                                                </span>
                                            </div>
                                            <div className="absolute bottom-0 right-0">
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faCirclePlay}
                                                        className="text-baseblue text-2xl"
                                                        onClick={() =>
                                                            playHandler(
                                                                data.id,
                                                                data.fileUrl,
                                                                data.title,
                                                                data.writer.name,
                                                                data.imageUrl
                                                            )
                                                        }
                                                        style={{
                                                            position: "relative",
                                                            animation: "mymove 500ms forwards",
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="dark:text-fontdark">
                                            <div className="font-semibold text-lg mb-2">{data.title}</div>
                                            <div className="font-light text-sm">{data.writer.name}</div>
                                            <div className="font-light text-xs">
                                                <span style={{fontSize: "12px"}}>{data.ago}</span>
                                                <span style={{
                                                    fontSize: "12px",
                                                    marginLeft: "5px"
                                                }}>{data.viewCount} views</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <div className="my-5">
                            <h2 className="py-5 pt-9 text-2xl font-bold text-center text-[#4d4d4d] tracking-wide font-mono dark:text-fontdark">
                                NEW RELEASE
                            </h2>
                            <div className="flex flex-wrap">
                                {dataForRecent.map((data) => {
                                    return (
                                        <div className="p-2 my-3 flex flex-wrap flex-col" key={data.id}>
                                            <div className="object-center object-cover h-[200px] relative">
                                                <img src={data.imageUrl} alt="my image"
                                                     className="h-full rounded-lg opacity-100"/>
                                                <div className="absolute bottom-2 left-3 z-15">
                                                    <span>
                                                        <HeartReaction initialLikeCount={data.likeCount}
                                                                       podcastId={data.id}
                                                                       initialLikeStatus={data.liked}/>
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-0 right-0">
                                                    <span>
                                                        <FontAwesomeIcon
                                                            icon={faCirclePlay}
                                                            className="text-baseblue text-2xl"
                                                            onClick={() =>
                                                                playHandler(
                                                                    data.id,
                                                                    data.fileUrl,
                                                                    data.title,
                                                                    data.writer.name,
                                                                    data.imageUrl
                                                                )
                                                            }
                                                            style={{
                                                                position: "relative",
                                                                animation: "mymove 500ms forwards",
                                                            }}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="dark:text-fontdark">
                                                <div className="font-semibold text-lg mb-2">{data.title}</div>
                                                <div className="font-light text-sm">{data.writer.name}</div>
                                                <div className="font-light text-xs">
                                                    <span style={{fontSize: "12px"}}>{data.ago}</span>
                                                    <span style={{
                                                        fontSize: "12px",
                                                        marginLeft: "5px"
                                                    }}>{data.viewCount} views</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {audioPlaying && (
                                    <PodcastAudioPlayer
                                        {...audioData}
                                        isAudioPlaying={audioPlaying}
                                        onClose={() => setAudioPlaying(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
