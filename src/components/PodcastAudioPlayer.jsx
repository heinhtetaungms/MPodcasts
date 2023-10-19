import React, {useEffect, useState} from 'react';
import authStore from '../zustand/authStore';
import {FaTimes} from 'react-icons/fa';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {StreamAudio} from '../api/streamAudio';

const PodcastAudioPlayer = (props) => {
    const {title, writer, fileName, imageUrl, podcastId, isAudioPlaying, onClose} = props;
    const [audioUrl, setAudioUrl] = useState('');
    const [authToken] = authStore((state) => [state.token]);
    const [userId] = authStore((state) => [state.userId]);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        console.log("podcastId........", podcastId)
        // Fetch audio data when fileName, podcastId, or authToken changes
        StreamAudio({fileName, podcastId, userId, authToken})
            .then((response) => {
                if (response.status === 200) {
                    const blobUrl = URL.createObjectURL(response.data);
                    setAudioUrl(blobUrl);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch audio:', error);
            });
    }, [isAudioPlaying, fileName, podcastId, userId, authToken]);

    useEffect(() => {
        // Handle the play/pause state based on the isAudioPlaying prop
        if (isAudioPlaying) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    }, [isAudioPlaying]);

    return (
        isAudioPlaying && audioUrl ? (
            <div
                className="music-player fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-300">
                <div
                    className="w-96 bg-white shadow-lg shadow-gray-500 transition-opacity duration-300 shadow-md rounded-lg flex flex-col relative">
                    <button className="close-button top-4 right-4 absolute" onClick={onClose}>
                        <FaTimes size={24}/>
                    </button>
                    <div className="flex flex-col items-center justify-center">
                        <img src={imageUrl} alt="Music Cover"
                             className="music-cover w-56 h-56 mt-2 mb-3 border-rounded object-cover rounded-full"/>
                        <h1 className="text-xl font-semibold text-black text-center mb-2">{title}</h1>
                        <p className="text-md text-gray-600 text-center mb-4">{writer}</p>
                        <AudioPlayer
                            src={audioUrl}
                            autoPlay={isPlaying}
                            onPlay={handlePlay}
                            onPause={handlePause}
                        />
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default PodcastAudioPlayer;
