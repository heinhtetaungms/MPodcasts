import React, {useEffect, useState} from 'react';
import authStore from '../zustand/authStore';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {StreamAudio} from '../api/streamAudio';
import '../style/custom-audio-player.css';
import {FaTimes} from "react-icons/fa";

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
            <div className="music-player fixed bottom-0 left-0 right-0 bg-gray-300 shadow-md z-20 p-4">
                <div className="flex items-center">
                    <div className="column-left">
                        <img src={imageUrl} alt="Music Cover" className="w-24 h-24 rounded object-cover" />
                        <div>
                            <div className="title-container">
                                <h1 className="font-semibold slide-title">{title}</h1>
                            </div>
                            <p className="text-md mt-2">{writer}</p>
                        </div>
                    </div>
                    <div className="column-right">
                        <AudioPlayer
                            src={audioUrl}
                            autoPlay={isPlaying}
                            onPlay={handlePlay}
                            onPause={handlePause}
                        />
                    </div>
                </div>
                {/*<button className="close-button top-4 right-4 absolute" onClick={onClose}>
                    <FaTimes size={24} />
                </button>*/}
            </div>
        ) : null
    );
};

export default PodcastAudioPlayer;
