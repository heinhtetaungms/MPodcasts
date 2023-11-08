import {useCallback, useEffect, useState} from 'react'
import {PlayListRequest} from '../api/playListRequest';
import authStore from '../zustand/authStore';
import {FaPlay} from 'react-icons/fa';
import PodcastAudioPlayer from '../components/PodcastAudioPlayer'
import {toast} from "react-toastify";

const Playlist = () => {
    const [authToken] = authStore((state) => [state.token]);
    const [storedUserID] = authStore((state) => [state.userId]);
    const [playlistData, setPlaylistData] = useState([]);

    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioData, setAudioData] = useState({
        title: '',
        writer: '',
        fileName: '',
        imageUrl: '',
        podcastId: '',
    });

    useEffect(() => {
        PlayListRequest({authToken, userId: storedUserID})
            .then((response) => {
                if (response.data.httpResponse === 200) {
                    setPlaylistData(response.data.data);
                    console.log("playListData................",playlistData)
                }
            }).catch((error) => {
                console.log("error........", error)
            if (error.response.data.httpResponse === 500) {
                console.log(error.response.data.message);
                toast.error(error.response.data.message);
            }
        });
    }, [authToken]);

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

    return (
        <div>
            <div className='w-full h-full relative py-20 px-40 dark:bg-dark bg-gray'>
                <h1 className='text-3xl mb-[40px] dark:text-white'>My Playlist</h1>
                {
                    playlistData.map((item) => {
                            return (
                                <div key={item.id} className='flex items-center px-5 py-6 mb-3 w-full playlistcard bg-white
                            dark:bg-cardDark transition duration-300 ease-in-out hover:z-20 hover:shadow-lg 
                            hover:dark:shadow-3xl'>
                            <span className='top-no w-[10%] dark:text-white text-sm flex items-center'>
                                <FaPlay className='text-sm mr-3 cursor-pointer' onClick={() =>
                                    playHandler(
                                        item.id,
                                        item.fileUrl,
                                        item.title,
                                        item.writer.name,
                                        item.imageUrl
                                    )
                                }/>
                                <span className='top-no dark:text-white '>{item.id}</span>
                            </span>
                                    <span className='top-no w-[40%] dark:text-white'>{item.title}</span>
                                    <span className='top-no w-[25%] dark:text-white'>{item.viewCount}&nbsp;views</span>
                                    <span className='top-no w-[25%] dark:text-white '>{item.writer.name}</span>
                                </div>
                            )
                        }
                    )
                }
                {audioPlaying && (
                    <PodcastAudioPlayer
                        {...audioData}
                        isAudioPlaying={audioPlaying}
                        onClose={() => setAudioPlaying(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default Playlist